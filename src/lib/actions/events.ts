"use server";

import { db } from "../db";
import { events, registrations } from "../../db/schema";
import { eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getEvents() {
    try {
        const allEvents = await db.select().from(events);
        return { success: true, data: allEvents };
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return { success: false, error: "Failed to fetch events" };
    }
}

export async function getActiveEvent() {
    try {
        const event = await db
            .select()
            .from(events)
            .where(eq(events.isFeatured, true))
            .limit(1);
        if (event.length === 0) {
            return { success: false, error: "No active event found" };
        }
        return { success: true, data: event[0] };
    } catch (error) {
        console.error("Failed to fetch active event:", error);
        return { success: false, error: "Failed to fetch active event" };
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
            return { success: false, error: "Event not found" };
        }
        return { success: true, data: event[0] };
    } catch (error) {
        console.error("Failed to fetch event by slug:", error);
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
        const { userId } = await auth();
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
        const user = await currentUser();
        const role = user?.publicMetadata?.role;

        if (!user?.id || role !== "admin") {
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
        const user = await currentUser();
        const role = user?.publicMetadata?.role;

        if (!user?.id || role !== "admin") {
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

export async function getAdminDashboardStats() {
    try {
        const user = await currentUser();
        const role = user?.publicMetadata?.role;

        if (!user?.id || role !== "admin") {
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
        const user = await currentUser();
        const role = user?.publicMetadata?.role;

        if (!user?.id || role !== "admin") {
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
        const user = await currentUser();
        const role = user?.publicMetadata?.role;

        if (!user?.id || role !== "admin") {
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
        const user = await currentUser();
        const role = user?.publicMetadata?.role;

        if (!user?.id || role !== "admin") {
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
