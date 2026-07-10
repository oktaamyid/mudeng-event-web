"use server";

import { db } from "../db";
import { events, registrations } from "../../db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getEvents() {
  try {
    const allEvents = await db.select().from(events);
    return { success: true, data: allEvents };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const event = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
    if (event.length === 0) {
      return { success: false, error: "Event not found" };
    }
    return { success: true, data: event[0] };
  } catch (error) {
    console.error("Failed to fetch event by slug:", error);
    return { success: false, error: "Failed to fetch event" };
  }
}

export async function registerEvent(eventId: string, formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;
    const institution = formData.get("institution") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const source = formData.get("source") as string;
    const experience = formData.get("experience") as string;
    const tools = formData.get("tools") as string;
    const expectations = formData.get("expectations") as string;
    const commitment = formData.get("commitment") as string;
    const description = formData.get("description") as string;

    if (!email || !fullName || !institution || !whatsapp || !source || !experience || !tools || !expectations || !commitment) {
      return { success: false, error: "Missing required fields" };
    }

    await db.insert(registrations).values({
      eventId,
      userId,
      email,
      fullName,
      institution,
      whatsapp,
      source,
      experience,
      tools,
      expectations,
      commitment,
      description,
      status: "PENDING",
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to register for event:", error);
    return { success: false, error: "Failed to register" };
  }
}
