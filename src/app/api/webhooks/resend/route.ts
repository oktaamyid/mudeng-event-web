import crypto from "crypto";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, ensureSchema } from "@/lib/db";
import { registrations } from "@/db/schema";

function verifySvixSignature(params: {
    rawBody: string;
    secret: string;
    svixId: string | null;
    svixTimestamp: string | null;
    svixSignature: string | null;
}): boolean {
    const { rawBody, secret, svixId, svixTimestamp, svixSignature } = params;
    if (!svixId || !svixTimestamp || !svixSignature) return false;

    const cleanSecret = secret.startsWith("whsec_")
        ? secret.slice("whsec_".length)
        : secret;
    const secretBytes = Buffer.from(cleanSecret, "base64");
    const signedContent = `${svixId}.${svixTimestamp}.${rawBody}`;
    const expected = crypto
        .createHmac("sha256", secretBytes)
        .update(signedContent)
        .digest("base64");

    const signatures = svixSignature
        .split(" ")
        .map((part) => part.split(",")[1])
        .filter((sig): sig is string => Boolean(sig));

    return signatures.some((sig) => {
        const expectedBuf = Buffer.from(expected);
        const actualBuf = Buffer.from(sig);
        if (expectedBuf.length !== actualBuf.length) return false;
        return crypto.timingSafeEqual(expectedBuf, actualBuf);
    });
}

/**
 * Receives Resend webhook events (email.delivered, email.bounced, email.complained)
 * to update registrant delivery tracking.
 */
export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();

        if (webhookSecret) {
            const isValid = verifySvixSignature({
                rawBody,
                secret: webhookSecret,
                svixId: req.headers.get("svix-id"),
                svixTimestamp: req.headers.get("svix-timestamp"),
                svixSignature: req.headers.get("svix-signature"),
            });
            if (!isValid) {
                return NextResponse.json(
                    { error: "Invalid webhook signature" },
                    { status: 401 },
                );
            }
        }

        const payload = JSON.parse(rawBody) as {
            type?: string;
            data?: {
                email_id?: string;
                bounce?: { message?: string };
            };
        };

        const emailId = payload.data?.email_id;
        if (!emailId || !payload.type) {
            return NextResponse.json({ received: true });
        }

        await ensureSchema();

        if (payload.type === "email.delivered") {
            await db
                .update(registrations)
                .set({
                    emailStatus: "DELIVERED",
                    emailError: null,
                })
                .where(eq(registrations.resendEmailId, emailId));
        } else if (payload.type === "email.bounced") {
            await db
                .update(registrations)
                .set({
                    emailStatus: "BOUNCED",
                    emailError:
                        payload.data?.bounce?.message || "Email bounced",
                })
                .where(eq(registrations.resendEmailId, emailId));
        } else if (payload.type === "email.complained") {
            await db
                .update(registrations)
                .set({
                    emailStatus: "FAILED",
                    emailError: "Penerima menandai email sebagai spam",
                })
                .where(eq(registrations.resendEmailId, emailId));
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Resend webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 },
        );
    }
}
