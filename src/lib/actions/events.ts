"use server";

import { db, ensureSchema } from "../db";
import { events, registrations } from "../../db/schema";
import { eq, and, sql } from "drizzle-orm";
import { getSession } from "../auth/session";
import { revalidatePath } from "next/cache";
import { deleteUploadThingFiles } from "./upload";

// Fallback data removed as part of course legacy cleanup

export async function getEvents() {
    try {
        await ensureSchema();
        const allEvents = await db.select().from(events);
        return { success: true, data: allEvents };
    } catch (error: any) {
        console.warn(`Failed to fetch events from DB: ${error?.message || "ETIMEDOUT"}`);
        return { success: true, data: [] };
    }
}

export async function getActiveEvent() {
    try {
        await ensureSchema();
        const event = await db
            .select()
            .from(events)
            .where(
                and(
                    eq(events.isFeatured, true),
                    eq(events.status, "PUBLISHED")
                )
            )
            .limit(1);
        if (event.length === 0) {
            return { success: true, data: null };
        }
        return { success: true, data: event[0] };
    } catch (error: any) {
        console.warn(`Failed to fetch active event from DB: ${error?.message || "ETIMEDOUT"}`);
        return { success: true, data: null };
    }
}

export async function getEventBySlug(slug: string) {
    try {
        await ensureSchema();
        const event = await db
            .select()
            .from(events)
            .where(eq(events.slug, slug))
            .limit(1);
        if (event.length === 0) {
            return { success: false, error: "Event not found" };
        }
        return { success: true, data: event[0] };
    } catch (error: any) {
        console.warn(`Failed to fetch event by slug from DB: ${error?.message || "ETIMEDOUT"}`);
        return { success: false, error: "Failed to fetch event" };
    }
}

export async function registerEvent(
    eventId: string,
    data: Record<string, any>,
) {
    try {
        const email = data.email as string;
        const fullName = data.fullName as string;

        if (!email || !fullName) {
            return {
                success: false,
                error: "Email and Full Name are required",
            };
        }

        // Check for duplicate registration
        const existing = await db
            .select()
            .from(registrations)
            .where(
                and(
                    eq(registrations.eventId, eventId),
                    eq(registrations.email, email)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            return {
                success: false,
                error: "Email ini sudah terdaftar untuk acara ini.",
            };
        }

        await db.insert(registrations).values({
            eventId,
            userId: null, // Public registration
            email,
            fullName,
            answers: data,
            status: "PENDING",
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to register for event:", error);
        return { success: false, error: "Failed to register" };
    }
}

export async function getUserRegistrations() {
    try {
        const session = await getSession();
        const userId = session?.userId;
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        const userRegistrations = await db
            .select({
                id: registrations.id,
                status: registrations.status,
                registeredAt: registrations.registeredAt,
                event: {
                    id: events.id,
                    title: events.title,
                    slug: events.slug,
                    imageUrl: events.imageUrl,
                    kickoffDate: events.kickoffDate,
                },
            })
            .from(registrations)
            .innerJoin(events, eq(registrations.eventId, events.id))
            .where(eq(registrations.userId, userId));

        return { success: true, data: userRegistrations };
    } catch (error) {
        console.error("Failed to fetch user registrations:", error);
        return { success: false, error: "Failed to fetch registrations" };
    }
}

export async function createEvent(data: any) {
    try {
        await ensureSchema();
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await db.insert(events).values({
            slug: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            category: data.category,
            description: data.description,
            imageUrl: data.imageUrl,
            kickoffDate: data.kickoffDate,
            instructor: data.instructor,
            duration: data.duration,
            timeline: data.duration,
            service: data.category,
            overview: data.overview,
            process: data.process,
            result: data.result,
            gallery: data.gallery,
            faqs: data.faqs,
            formFields: data.formFields,
            confirmationMessage: data.confirmationMessage || "",
            googleSheetId: data.googleSheetId || "",
            isRegistrationOpen: data.isRegistrationOpen ?? true,
            formDescription: data.formDescription || "",
            isFeatured: data.isFeatured || false,
            status: "PUBLISHED",
        });

        revalidatePath("/");
        revalidatePath("/[slug]", "page");

        return { success: true };
    } catch (error) {
        console.error("Failed to create event:", error);
        return { success: false, error: "Failed to create event" };
    }
}

export async function getEventRegistrants(slug: string) {
    try {
        await ensureSchema();
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const event = await db
            .select()
            .from(events)
            .where(eq(events.slug, slug))
            .limit(1);

        if (event.length === 0) {
            return { success: false, error: "Event not found" };
        }

        const eventRegistrations = await db
            .select()
            .from(registrations)
            .where(eq(registrations.eventId, event[0].id));

        return {
            success: true,
            data: { event: event[0], registrants: eventRegistrations },
        };
    } catch (error) {
        console.error("Failed to fetch registrants:", error);
        return { success: false, error: "Failed to fetch registrants" };
    }
}

export async function exportRegistrantsCSV(slug: string) {
    try {
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const event = await db
            .select()
            .from(events)
            .where(eq(events.slug, slug))
            .limit(1);

        if (event.length === 0) {
            return { success: false, error: "Event not found" };
        }

        const eventRegistrations = await db
            .select()
            .from(registrations)
            .where(eq(registrations.eventId, event[0].id));

        // Build CSV
        // Step 1: Collect all possible headers
        const headers = new Set<string>();
        headers.add("Name");
        headers.add("Email");
        headers.add("Status");
        headers.add("Registration Date");

        const rowsData: Record<string, string>[] = [];

        for (const reg of eventRegistrations) {
            const row: Record<string, string> = {
                "Name": reg.fullName,
                "Email": reg.email,
                "Status": reg.status,
                "Registration Date": new Date(reg.registeredAt).toISOString(),
            };

            if (reg.answers && typeof reg.answers === "object") {
                const answersObj = reg.answers as Record<string, any>;
                for (const [key, item] of Object.entries(answersObj)) {
                    const isComplex = typeof item === "object" && item !== null && !Array.isArray(item) && "value" in item;
                    const value = isComplex ? item.value : item;
                    const savedLabel = isComplex ? item.label : null;

                    const fieldDef = (event[0].formFields as any[])?.find((f: any) => f.id === key);
                    const label = savedLabel || (fieldDef ? fieldDef.label : key);
                    
                    const displayValue = Array.isArray(value) ? value.join(", ") : (value?.toString() || "");

                    headers.add(label);
                    row[label] = displayValue;
                }
            }
            rowsData.push(row);
        }

        const headersArray = Array.from(headers);
        
        // Escape CSV values
        const escapeCSV = (val: string) => {
            if (!val) return "";
            const str = String(val);
            if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const csvRows = [];
        // Header row
        csvRows.push(headersArray.map(escapeCSV).join(","));

        // Data rows
        for (const row of rowsData) {
            csvRows.push(headersArray.map(h => escapeCSV(row[h] || "")).join(","));
        }

        const csvContent = csvRows.join("\n");

        return { success: true, data: csvContent, filename: `registrants-${slug}.csv` };
    } catch (error) {
        console.error("Failed to export registrants:", error);
        return { success: false, error: "Failed to export registrants" };
    }
}

export async function getAdminDashboardStats() {
    try {
        await ensureSchema();
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const allEvents = await db.select().from(events);
        const allRegistrations = await db.select().from(registrations);

        // Sort registrations by date desc for recent registrations
        const recentRegistrations = [...allRegistrations]
            .sort(
                (a, b) =>
                    new Date(b.registeredAt).getTime() -
                    new Date(a.registeredAt).getTime(),
            )
            .slice(0, 5);

        // Populate event titles and slugs for recent registrations
        const enrichedRecent = recentRegistrations.map((reg) => {
            const evt = allEvents.find((e) => e.id === reg.eventId);
            return {
                ...reg,
                eventTitle: evt?.title || "Unknown Event",
                eventSlug: evt?.slug || "",
            };
        });

        const publishedEvents = allEvents.filter(
            (e) => e.status === "PUBLISHED",
        ).length;
        const pendingRegistrations = allRegistrations.filter(
            (r) => r.status === "PENDING",
        ).length;

        return {
            success: true,
            data: {
                totalEvents: allEvents.length,
                publishedEvents,
                totalRegistrations: allRegistrations.length,
                pendingRegistrations,
                recentRegistrations: enrichedRecent,
            },
        };
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return { success: false, error: "Failed to fetch admin stats" };
    }
}

export async function updateEvent(id: string, data: any) {
    try {
        await ensureSchema();
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const expectedVersion =
            typeof data.expectedVersion === "number"
                ? data.expectedVersion
                : undefined;
        const forceOverwrite = Boolean(data.forceOverwrite);

        const whereClause =
            expectedVersion !== undefined && !forceOverwrite
                ? and(eq(events.id, id), eq(events.version, expectedVersion))
                : eq(events.id, id);

        const updated = await db
            .update(events)
            .set({
                title: data.title,
                slug: data.slug,
                subtitle: data.subtitle,
                category: data.category,
                description: data.description,
                imageUrl: data.imageUrl,
                kickoffDate: data.kickoffDate,
                instructor: data.instructor,
                duration: data.duration,
                timeline: data.duration,
                service: data.category,
                overview: data.overview,
                process: data.process,
                result: data.result,
                gallery: data.gallery,
                faqs: data.faqs,
                formFields: data.formFields,
                confirmationMessage: data.confirmationMessage || "",
                googleSheetId: data.googleSheetId || "",
                isRegistrationOpen: data.isRegistrationOpen ?? true,
                formDescription: data.formDescription || "",
                isFeatured:
                    data.isFeatured !== undefined ? data.isFeatured : false,
                status: data.status,
                version: sql`${events.version} + 1`,
                updatedAt: new Date(),
            })
            .where(whereClause)
            .returning({ id: events.id, version: events.version });

        if (updated.length === 0) {
            const existing = await db
                .select({ id: events.id, version: events.version })
                .from(events)
                .where(eq(events.id, id))
                .limit(1);

            if (existing.length === 0) {
                return {
                    success: false,
                    error: "Event tidak ditemukan atau sudah dihapus di sesi lain.",
                };
            }

            return {
                success: false,
                conflict: true,
                latestVersion: existing[0].version,
                error: "Event ini sudah diubah di tab atau sesi lain. Muat ulang data terbaru atau timpa dengan perubahan Anda.",
            };
        }

        revalidatePath("/");
        revalidatePath(`/${data.slug || id}`, "page");
        revalidatePath("/[slug]", "page");

        return { success: true, version: updated[0].version };
    } catch (error) {
        console.error("Failed to update event:", error);
        return { success: false, error: "Failed to update event" };
    }
}

export async function deleteEvent(id: string) {
    try {
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        // Collect UploadThing URLs from event & registrations before deleting
        const [evtRows, regRows] = await Promise.all([
            db
                .select({ imageUrl: events.imageUrl, gallery: events.gallery })
                .from(events)
                .where(eq(events.id, id))
                .limit(1),
            db
                .select({ answers: registrations.answers })
                .from(registrations)
                .where(eq(registrations.eventId, id)),
        ]);

        const urlsToDelete: string[] = [];
        if (evtRows[0]?.imageUrl) urlsToDelete.push(evtRows[0].imageUrl);
        if (Array.isArray(evtRows[0]?.gallery)) {
            for (const g of evtRows[0].gallery) {
                if (typeof g === "string") urlsToDelete.push(g);
            }
        }
        for (const r of regRows) {
            if (r.answers && typeof r.answers === "object") {
                for (const item of Object.values(r.answers as Record<string, unknown>)) {
                    const val =
                        typeof item === "object" &&
                        item !== null &&
                        !Array.isArray(item) &&
                        "value" in item
                            ? (item as { value: unknown }).value
                            : item;
                    if (typeof val === "string" && val.startsWith("http")) {
                        urlsToDelete.push(val);
                    }
                }
            }
        }

        // First delete all registrations for this event
        await db.delete(registrations).where(eq(registrations.eventId, id));

        // Then delete the event
        await db.delete(events).where(eq(events.id, id));

        if (urlsToDelete.length > 0) {
            await deleteUploadThingFiles(urlsToDelete);
        }

        revalidatePath("/");
        revalidatePath("/[slug]", "page");

        return { success: true };
    } catch (error) {
        console.error("Failed to delete event:", error);
        return { success: false, error: "Failed to delete event" };
    }
}


export async function updateRegistrationStatus(id: string, status: string) {
    try {
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const updated = await db
            .update(registrations)
            .set({
                status,
                version: sql`${registrations.version} + 1`,
            })
            .where(eq(registrations.id, id))
            .returning({ id: registrations.id });

        if (updated.length === 0) {
            return {
                success: false,
                error: "Data pendaftar sudah dihapus di sesi lain.",
            };
        }

        revalidatePath("/admin/events/[slug]/registrants", "page");
        revalidatePath("/admin", "page");

        return { success: true };
    } catch (error) {
        console.error("Failed to update registration status:", error);
        return {
            success: false,
            error: "Failed to update registration status",
        };
    }
}

/**
 * Update a registrant's core details, status, and form answers (Admin only).
 */
export async function updateRegistration(
    id: string,
    payload: {
        fullName: string;
        email: string;
        status: string;
        answers: Record<string, unknown>;
    },
) {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const trimmedName = payload.fullName.trim();
        const trimmedEmail = payload.email.trim();
        if (!trimmedName || !trimmedEmail) {
            return {
                success: false,
                error: "Nama lengkap dan email wajib diisi.",
            };
        }

        const updated = await db
            .update(registrations)
            .set({
                fullName: trimmedName,
                email: trimmedEmail,
                status: payload.status,
                answers: payload.answers,
                version: sql`${registrations.version} + 1`,
            })
            .where(eq(registrations.id, id))
            .returning({ id: registrations.id });

        if (updated.length === 0) {
            return {
                success: false,
                error: "Data pendaftar tidak ditemukan atau sudah dihapus di sesi lain.",
            };
        }

        revalidatePath("/admin/events/[slug]/registrants", "page");
        revalidatePath("/admin", "page");

        return { success: true };
    } catch (error) {
        console.error("Failed to update registration:", error);
        return {
            success: false,
            error: "Failed to update registration",
        };
    }
}

/**
 * Delete a registration record permanently (Admin only).
 */
export async function deleteRegistration(id: string) {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const deleted = await db
            .delete(registrations)
            .where(eq(registrations.id, id))
            .returning({ answers: registrations.answers });

        const regAnswers = deleted[0]?.answers;
        if (regAnswers && typeof regAnswers === "object") {
            const urlsToDelete: string[] = [];
            for (const item of Object.values(regAnswers as Record<string, unknown>)) {
                const val =
                    typeof item === "object" &&
                    item !== null &&
                    !Array.isArray(item) &&
                    "value" in item
                        ? (item as { value: unknown }).value
                        : item;
                if (typeof val === "string" && val.startsWith("http")) {
                    urlsToDelete.push(val);
                }
            }
            if (urlsToDelete.length > 0) {
                await deleteUploadThingFiles(urlsToDelete);
            }
        }

        revalidatePath("/admin/events/[slug]/registrants", "page");
        revalidatePath("/admin", "page");

        return { success: true };
    } catch (error) {
        console.error("Failed to delete registration:", error);
        return {
            success: false,
            error: "Failed to delete registration",
        };
    }
}
