"use server";

import { db } from "../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "../auth/session";

export async function getUsers() {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const allUsers = await db.select().from(users).orderBy(users.createdAt);
        return { success: true, data: allUsers };
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return { success: false, error: "Failed to fetch users" };
    }
}

export async function updateUserRole(userId: string, role: string) {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await db.update(users).set({ role }).where(eq(users.id, userId));
        return { success: true };
    } catch (error) {
        console.error("Failed to update user role:", error);
        return { success: false, error: "Failed to update user role" };
    }
}

export async function deleteUser(userId: string) {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await db.delete(users).where(eq(users.id, userId));
        return { success: true };
    } catch (error) {
        console.error("Failed to delete user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
