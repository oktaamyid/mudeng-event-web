"use server";

import { db } from "@/lib/db";
import { events, registrations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { google } from "googleapis";

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
        // Format ulang private key jika mengandung \n literal (stringified)
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

        const drive = google.drive({ version: "v3", auth });
        const sheets = google.sheets({ version: "v4", auth });

        // 3. Ambil data Event
        const eventData = await db.query.events.findFirst({
            where: eq(events.id, eventId),
        });

        if (!eventData) {
            return { success: false, error: "Event tidak ditemukan." };
        }

        let sheetId = eventData.googleSheetId;

        // 4. Pastikan Spreadsheet ID sudah diisi
        if (!sheetId) {
            return {
                success: false,
                error: "Google Sheet ID belum diatur. Silakan atur di pengaturan Event (Edit Event).",
            };
        }

        // 5. Ambil data Pendaftar
        const registrants = await db.query.registrations.findMany({
            where: eq(registrations.eventId, eventId),
            orderBy: [desc(registrations.registeredAt)],
        });

        // 6. Siapkan Data Tabel (Headers + Rows)
        let customHeaders: string[] = [];
        if (eventData.formFields && Array.isArray(eventData.formFields)) {
            customHeaders = eventData.formFields.map((f: any) => f.label || f.id);
        }

        const headers = ["Tanggal Daftar", "Nama Lengkap", "Email", "Status", ...customHeaders];
        const rows: any[][] = [headers];

        for (const reg of registrants) {
            const dateStr = reg.registeredAt.toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
            });
            const baseData = [dateStr, reg.fullName, reg.email, reg.status];
            
            const answers = reg.answers as Record<string, any>;
            const customData = customHeaders.map((header) => {
                // Find matching key either by label or id
                const key = Object.keys(answers).find((k) => {
                    const ans = answers[k];
                    if (typeof ans === "object" && ans !== null && "label" in ans) {
                        return ans.label === header || k === header;
                    }
                    return k === header;
                });

                if (key) {
                    const item = answers[key];
                    const isComplex = typeof item === "object" && item !== null && !Array.isArray(item) && "value" in item;
                    const val = isComplex ? item.value : item;
                    
                    if (Array.isArray(val)) {
                        // Fix corrupted array if necessary
                        const singleChars = val.filter(v => typeof v === 'string' && v.length === 1).join("");
                        const normalStrings = val.filter(v => typeof v !== 'string' || v.length > 1);
                        if (singleChars.length > 3 && val.length > 5) {
                            return [singleChars, ...normalStrings].filter(Boolean).join(", ");
                        }
                        return val.join(", ");
                    }
                    return val?.toString() || "";
                }
                return "";
            });

            rows.push([...baseData, ...customData]);
        }

        // 7. Update data ke Spreadsheet (Timpa semua dari A1)
        // Hapus data lama terlebih dahulu agar jika ada penghapusan kolom tidak sisa
        await sheets.spreadsheets.values.clear({
            spreadsheetId: sheetId,
            range: "Sheet1",
        });

        await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: "Sheet1!A1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: rows,
            },
        });

        return { success: true, sheetId };
    } catch (error: any) {
        console.error("Sync Sheets Error:", error);
        return { success: false, error: error.message || "Terjadi kesalahan internal" };
    }
}
