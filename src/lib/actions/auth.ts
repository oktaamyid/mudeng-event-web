"use server";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "../auth/session";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    try {
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (user.length === 0) {
            return { error: "Invalid email or password." };
        }

        const match = await bcrypt.compare(password, user[0].passwordHash);
        if (!match) {
            return { error: "Invalid email or password." };
        }

        await createSession(user[0].id, user[0].role);
        
    } catch (e) {
        return { error: "An unexpected error occurred." };
    }
    
    // Redirect must be called outside try/catch
    redirect("/dashboard");
}

export async function logout() {
    await deleteSession();
    redirect("/sign-in");
}
