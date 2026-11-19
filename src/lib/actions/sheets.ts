"use server";

import { db } from "@/lib/db";
import { events, registrations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { google, type sheets_v4 } from "googleapis";

interface FormFieldItem {
    id: string;
    label?: string;
    type?: string;
}

export async function syncEventToGoogleSheets(eventId: string) {
    try {
        // 1. Ambil Kredensial dari ENV
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY;
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        if (!clientEmail || !privateKey || !folderId) {
            return {
                success: false,
                error: "Konfigurasi Google API di .env belum lengkap.",
            };
        }

        // 2. Setup Auth Client
        const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: formattedPrivateKey,
            },
            scopes: [
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/drive",
            ],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // 3. Ambil data Event
        const eventData = await db.query.events.findFirst({
            where: eq(events.id, eventId),
        });

        if (!eventData) {
            return { success: false, error: "Event tidak ditemukan." };
        }

        const spreadsheetId = eventData.googleSheetId;

        if (!spreadsheetId) {
            return {
                success: false,
                error: "Google Sheet ID belum diatur. Silakan atur di pengaturan Event (Edit Event).",
            };
        }

        // 4. Ambil metadata tab pertama pada Spreadsheet
        const spreadsheetMeta = await sheets.spreadsheets.get({
            spreadsheetId,
            fields: "sheets(properties(sheetId,title))",
        });

        const firstSheet = spreadsheetMeta.data.sheets?.[0]?.properties;
        const numericSheetId = firstSheet?.sheetId ?? 0;
        const sheetTitle = firstSheet?.title || "Sheet1";

        // 5. Ambil data Pendaftar
        const registrants = await db.query.registrations.findMany({
            where: eq(registrations.eventId, eventId),
            orderBy: [desc(registrations.registeredAt)],
        });

        // 6. Siapkan Data Tabel (Headers + Rows)
        const formFields = Array.isArray(eventData.formFields)
            ? (eventData.formFields as FormFieldItem[])
            : [];

        const customFields = formFields.filter(
            (f) =>
                f.type !== "step_break" &&
                f.id !== "email" &&
                f.id !== "fullName",
        );
        const customHeaders = customFields.map((f) => f.label || f.id);

        const headers = [
            "No",
            "Tanggal Daftar",
            "Nama Lengkap",
            "Email",
            "Status",
            ...customHeaders,
        ];
        const rows: (string | number)[][] = [headers];

        registrants.forEach((reg, idx) => {
            const dateStr = reg.registeredAt.toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
            });
            const baseData: (string | number)[] = [
                idx + 1,
                dateStr,
                reg.fullName,
                reg.email,
                reg.status,
            ];

            const answers = (reg.answers || {}) as Record<string, unknown>;
            const customData = customFields.map((field) => {
                const header = field.label || field.id;
                const key = Object.keys(answers).find((k) => {
                    const ans = answers[k];
                    if (
                        typeof ans === "object" &&
                        ans !== null &&
                        "label" in ans
                    ) {
                        return (
                            (ans as { label?: string }).label === header ||
                            k === field.id ||
                            k === header
                        );
                    }
                    return k === field.id || k === header;
                });

                if (key) {
                    const item = answers[key];
                    const isComplex =
                        typeof item === "object" &&
                        item !== null &&
                        !Array.isArray(item) &&
                        "value" in item;
                    const val = isComplex
                        ? (item as { value: unknown }).value
                        : item;

                    if (Array.isArray(val)) {
                        const singleChars = val
                            .filter((v) => typeof v === "string" && v.length === 1)
                            .join("");
                        const normalStrings = val.filter(
                            (v) => typeof v !== "string" || v.length > 1,
                        );
                        if (singleChars.length > 3 && val.length > 5) {
                            return [singleChars, ...normalStrings]
                                .filter(Boolean)
                                .join(", ");
                        }
                        return val.join(", ");
                    }
                    return val?.toString() || "";
                }
                return "";
            });

            rows.push([...baseData, ...customData]);
        });

        const totalRows = rows.length;
        const totalCols = headers.length;

        // 7. Bersihkan & tulis ulang data ke Spreadsheet
        await sheets.spreadsheets.values.clear({
            spreadsheetId,
            range: sheetTitle,
        });

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetTitle}!A1`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: rows,
            },
        });

        // 8. Terapkan Auto Table Formatting (Header, Zebra, Border, Filter, Freeze, Auto-Resize)
        const requests: sheets_v4.Schema$Request[] = [
            // Reset formatting lama di sheet agar bersih
            {
                repeatCell: {
                    range: { sheetId: numericSheetId },
                    cell: {
                        userEnteredFormat: {
                            backgroundColor: { red: 1, green: 1, blue: 1 },
                            textFormat: {
                                bold: false,
                                foregroundColor: { red: 0.1, green: 0.1, blue: 0.1 },
                                fontSize: 10,
                            },
                            verticalAlignment: "MIDDLE",
                            wrapStrategy: "WRAP",
                        },
                    },
                    fields: "userEnteredFormat(backgroundColor,textFormat,verticalAlignment,wrapStrategy)",
                },
            },
            // Freeze baris header (Row 1)
            {
                updateSheetProperties: {
                    properties: {
                        sheetId: numericSheetId,
                        gridProperties: {
                            frozenRowCount: 1,
                        },
                    },
                    fields: "gridProperties.frozenRowCount",
                },
            },
            // Aktifkan Basic Filter pada seluruh tabel
            {
                setBasicFilter: {
                    filter: {
                        range: {
                            sheetId: numericSheetId,
                            startRowIndex: 0,
                            endRowIndex: totalRows,
                            startColumnIndex: 0,
                            endColumnIndex: totalCols,
                        },
                    },
                },
            },
            // Styling Header Row (Mudeng Brand Purple #6849E1, Bold White)
            {
                repeatCell: {
                    range: {
                        sheetId: numericSheetId,
                        startRowIndex: 0,
                        endRowIndex: 1,
                        startColumnIndex: 0,
                        endColumnIndex: totalCols,
                    },
                    cell: {
                        userEnteredFormat: {
                            backgroundColor: {
                                red: 0.408,
                                green: 0.286,
                                blue: 0.882,
                            },
                            textFormat: {
                                foregroundColor: { red: 1, green: 1, blue: 1 },
                                bold: true,
                                fontSize: 10,
                            },
                            horizontalAlignment: "LEFT",
                            verticalAlignment: "MIDDLE",
                            wrapStrategy: "WRAP",
                        },
                    },
                    fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy)",
                },
            },
            // Tinggi baris header (36px)
            {
                updateDimensionProperties: {
                    range: {
                        sheetId: numericSheetId,
                        dimension: "ROWS",
                        startIndex: 0,
                        endIndex: 1,
                    },
                    properties: { pixelSize: 38 },
                    fields: "pixelSize",
                },
            },
            // Border tabel rapi (#E2E8F0)
            {
                updateBorders: {
                    range: {
                        sheetId: numericSheetId,
                        startRowIndex: 0,
                        endRowIndex: totalRows,
                        startColumnIndex: 0,
                        endColumnIndex: totalCols,
                    },
                    top: {
                        style: "SOLID",
                        width: 1,
                        color: { red: 0.8, green: 0.83, blue: 0.88 },
                    },
                    bottom: {
                        style: "SOLID",
                        width: 1,
                        color: { red: 0.8, green: 0.83, blue: 0.88 },
                    },
                    left: {
                        style: "SOLID",
                        width: 1,
                        color: { red: 0.8, green: 0.83, blue: 0.88 },
                    },
                    right: {
                        style: "SOLID",
                        width: 1,
                        color: { red: 0.8, green: 0.83, blue: 0.88 },
                    },
                    innerHorizontal: {
                        style: "SOLID",
                        width: 1,
                        color: { red: 0.89, green: 0.91, blue: 0.94 },
                    },
                    innerVertical: {
                        style: "SOLID",
                        width: 1,
                        color: { red: 0.89, green: 0.91, blue: 0.94 },
                    },
                },
            },
        ];

        // Zebra striping + warna badge Status per baris data
        for (let r = 1; r < totalRows; r++) {
            const isEven = r % 2 === 0;
            if (isEven) {
                requests.push({
                    repeatCell: {
                        range: {
                            sheetId: numericSheetId,
                            startRowIndex: r,
                            endRowIndex: r + 1,
                            startColumnIndex: 0,
                            endColumnIndex: totalCols,
                        },
                        cell: {
                            userEnteredFormat: {
                                backgroundColor: {
                                    red: 0.973,
                                    green: 0.976,
                                    blue: 0.992,
                                },
                            },
                        },
                        fields: "userEnteredFormat.backgroundColor",
                    },
                });
            }

            // Highlight kolom Status (index 4)
            const statusVal = String(rows[r][4] || "");
            const isApproved = statusVal === "APPROVED";
            requests.push({
                repeatCell: {
                    range: {
                        sheetId: numericSheetId,
                        startRowIndex: r,
                        endRowIndex: r + 1,
                        startColumnIndex: 4,
                        endColumnIndex: 5,
                    },
                    cell: {
                        userEnteredFormat: {
                            backgroundColor: isApproved
                                ? { red: 0.863, green: 0.988, blue: 0.906 }
                                : { red: 0.996, green: 0.953, blue: 0.78 },
                            textFormat: {
                                bold: true,
                                foregroundColor: isApproved
                                    ? { red: 0.086, green: 0.396, blue: 0.204 }
                                    : { red: 0.573, green: 0.251, blue: 0.055 },
                            },
                            horizontalAlignment: "CENTER",
                        },
                    },
                    fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
                },
            });
        }

        // Center-align kolom "No" (index 0)
        if (totalRows > 1) {
            requests.push({
                repeatCell: {
                    range: {
                        sheetId: numericSheetId,
                        startRowIndex: 0,
                        endRowIndex: totalRows,
                        startColumnIndex: 0,
                        endColumnIndex: 1,
                    },
                    cell: {
                        userEnteredFormat: {
                            horizontalAlignment: "CENTER",
                        },
                    },
                    fields: "userEnteredFormat.horizontalAlignment",
                },
            });
        }

        // Auto-resize seluruh kolom agar teks langsung terbaca rapi
        requests.push({
            autoResizeDimensions: {
                dimensions: {
                    sheetId: numericSheetId,
                    dimension: "COLUMNS",
                    startIndex: 0,
                    endIndex: totalCols,
                },
            },
        });

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: { requests },
        });

        return { success: true, sheetId: spreadsheetId };
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Terjadi kesalahan internal";
        console.error("Sync Sheets Error:", error);
        return { success: false, error: message };
    }
}
