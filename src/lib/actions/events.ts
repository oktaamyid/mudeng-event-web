"use server";

import { db } from "../db";
import { events, registrations } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "../auth/session";

import { coursesList } from "../../data/courses";

const fallbackEvents = coursesList.map((c, idx) => ({
    id: String(idx + 1),
    slug: c.slug,
    title: c.title,
    subtitle: c.description,
    category: c.tag,
    description: c.description,
    imageUrl: c.image,
    timeline: "4 Minggu",
    service: c.title,
    kickoffDate: "Juli 2025",
    instructor: "Tim MUDENG",
    duration: "4 Minggu",
    status: "PUBLISHED",
    isFeatured: c.slug === "ui-craft",
    overview: {
        title: "Project overview",
        description: c.overview,
    },
    process: {
        title: "Project process",
        description: "Peserta akan melalui proses pembelajaran komprehensif mulai dari pemahaman dasar hingga eksekusi proyek akhir.",
    },
    result: {
        title: "Final result",
        description: "Hasil akhir berupa karya dan portofolio profesional yang siap digunakan untuk dunia kerja atau pameran.",
    },
    gallery: c.heroImages || [],
    focus: "Penguasaan " + c.title,
    output: "Karya & Portofolio",
    faqs: c.faqs || [],
    formFields: [],
    confirmationMessage: "",
    googleSheetId: null as string | null,
    createdAt: new Date(),
}));

export async function getEvents() {
    try {
        const allEvents = await db.select().from(events);
        return { success: true, data: allEvents };
    } catch (error: any) {
        console.warn(`[Fallback Activated] Failed to fetch events from DB: ${error?.message || "ETIMEDOUT"}`);
        return { success: true, data: fallbackEvents };
    }
}

export async function getActiveEvent() {
    try {
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
        console.warn(`[Fallback Activated] Failed to fetch active event from DB: ${error?.message || "ETIMEDOUT"}`);
        return { success: true, data: fallbackEvents.find((e) => e.isFeatured) || fallbackEvents[0] };
    }
}

export async function getEventBySlug(slug: string) {
    try {
        const event = await db
            .select()
            .from(events)
            .where(eq(events.slug, slug))
            .limit(1);
        if (event.length === 0) {
            const fallback = fallbackEvents.find((e) => e.slug === slug);
            if (fallback) return { success: true, data: fallback };
            return { success: false, error: "Event not found" };
        }
        return { success: true, data: event[0] };
    } catch (error: any) {
        console.warn(`[Fallback Activated] Failed to fetch event by slug from DB: ${error?.message || "ETIMEDOUT"}`);
        const fallback = fallbackEvents.find((e) => e.slug === slug);
        if (fallback) return { success: true, data: fallback };
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
            overview: data.overview,
            process: data.process,
            result: data.result,
            gallery: data.gallery,
            faqs: data.faqs,
            formFields: data.formFields,
            confirmationMessage: data.confirmationMessage || "",
            googleSheetId: data.googleSheetId || "",
            isFeatured: data.isFeatured || false,
            status: "PUBLISHED",
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to create event:", error);
        return { success: false, error: "Failed to create event" };
    }
}

export async function getEventRegistrants(slug: string) {
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
            console.log(
                "[DEBUG getEventRegistrants] Event not found for slug:",
                slug,
            );
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

        // Populate event titles for recent registrations
        const enrichedRecent = recentRegistrations.map((reg) => {
            const evt = allEvents.find((e) => e.id === reg.eventId);
            return { ...reg, eventTitle: evt?.title || "Unknown Event" };
        });

        return {
            success: true,
            data: {
                totalEvents: allEvents.length,
                totalRegistrations: allRegistrations.length,
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
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await db
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
                overview: data.overview,
                process: data.process,
                result: data.result,
                gallery: data.gallery,
                faqs: data.faqs,
                formFields: data.formFields,
                confirmationMessage: data.confirmationMessage || "",
                googleSheetId: data.googleSheetId || "",
                isFeatured:
                    data.isFeatured !== undefined ? data.isFeatured : false,
                status: data.status,
            })
            .where(eq(events.id, id));

        return { success: true };
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

        // First delete all registrations for this event
        await db.delete(registrations).where(eq(registrations.eventId, id));

        // Then delete the event
        await db.delete(events).where(eq(events.id, id));

        return { success: true };
    } catch (error) {
        console.error("Failed to delete event:", error);
        return { success: false, error: "Failed to delete event" };
    }
}

import { revalidatePath } from "next/cache";

export async function updateRegistrationStatus(id: string, status: string) {
    try {
        const session = await getSession();
        const role = session?.role;

        if (!session?.userId || role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await db
            .update(registrations)
            .set({ status })
            .where(eq(registrations.id, id));

        revalidatePath("/admin/events/[slug]/registrants", "page");

        return { success: true };
    } catch (error) {
        console.error("Failed to update registration status:", error);
        return {
            success: false,
            error: "Failed to update registration status",
        };
    }
}
