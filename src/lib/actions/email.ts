"use server";

import { z } from "zod";
import { and, eq, gte, notInArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, ensureSchema } from "../db";
import { events, registrations, siteContent } from "../../db/schema";
import { getSession } from "../auth/session";
import {
    buildApprovalEmailTemplate,
    buildBroadcastEmailTemplate,
    buildTestEmailTemplate,
    getResendConfigStatus,
    sendBatchEmails,
    sendEmail,
} from "../email";

export interface EmailSettings {
    sendOnPending: boolean;
    notifyAdminOnRegister: boolean;
    adminNotifyEmail: string;
}

const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
    sendOnPending: false,
    notifyAdminOnRegister: false,
    adminNotifyEmail: "",
};

const EMAIL_SETTINGS_KEY = "email_settings";
const EMAIL_USAGE_KEY = "email_daily_usage";
const DAILY_RESEND_LIMIT = 100;

function getUtcDateKey(): string {
    const now = new Date();
    return now.toISOString().slice(0, 10);
}

/**
 * Increments today's Resend email usage counter in site_content.
 */
export async function recordDailyEmailUsage(count: number): Promise<void> {
    if (count <= 0) return;
    try {
        await ensureSchema();
        const today = getUtcDateKey();
        const rows = await db
            .select()
            .from(siteContent)
            .where(eq(siteContent.key, EMAIL_USAGE_KEY))
            .limit(1);

        const prev = rows[0]?.data as { date?: string; count?: number } | undefined;
        const nextCount =
            prev?.date === today ? Number(prev.count ?? 0) + count : count;

        await db
            .insert(siteContent)
            .values({
                key: EMAIL_USAGE_KEY,
                data: { date: today, count: nextCount },
                updatedAt: new Date(),
            })
            .onConflictDoUpdate({
                target: siteContent.key,
                set: {
                    data: { date: today, count: nextCount },
                    updatedAt: new Date(),
                },
            });
    } catch (err) {
        console.warn("Failed to record daily email usage:", err);
    }
}

const updateEmailSettingsSchema = z
    .object({
        sendOnPending: z.boolean(),
        notifyAdminOnRegister: z.boolean(),
        adminNotifyEmail: z.string().trim(),
    })
    .refine(
        (val) =>
            !val.notifyAdminOnRegister ||
            z.string().email().safeParse(val.adminNotifyEmail).success,
        {
            message: "Masukkan alamat email admin yang valid untuk notifikasi.",
            path: ["adminNotifyEmail"],
        },
    );

function getBaseUrl(): string {
    return (
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        "https://mudeng.oktaa.my.id/event"
    );
}

/**
 * Reads global email preferences from site_content.
 */
export async function getEmailSettings(): Promise<EmailSettings> {
    try {
        await ensureSchema();
        const rows = await db
            .select()
            .from(siteContent)
            .where(eq(siteContent.key, EMAIL_SETTINGS_KEY))
            .limit(1);

        if (rows.length === 0 || !rows[0].data) {
            return DEFAULT_EMAIL_SETTINGS;
        }

        const raw = rows[0].data as Partial<EmailSettings>;
        return {
            sendOnPending: Boolean(raw.sendOnPending),
            notifyAdminOnRegister: Boolean(raw.notifyAdminOnRegister),
            adminNotifyEmail:
                typeof raw.adminNotifyEmail === "string"
                    ? raw.adminNotifyEmail
                    : "",
        };
    } catch {
        return DEFAULT_EMAIL_SETTINGS;
    }
}

/**
 * Counts how many emails were sent today (UTC) based on registrations.emailSentAt.
 */
export async function getDailyEmailQuotaInternal(): Promise<{
    used: number;
    limit: number;
    remaining: number;
}> {
    try {
        await ensureSchema();
        const now = new Date();
        const startOfUtcDay = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        );
        const [regRows, usageRows] = await Promise.all([
            db
                .select({ count: sql<number>`count(*)::int` })
                .from(registrations)
                .where(gte(registrations.emailSentAt, startOfUtcDay)),
            db
                .select()
                .from(siteContent)
                .where(eq(siteContent.key, EMAIL_USAGE_KEY))
                .limit(1),
        ]);

        const regCount = Number(regRows[0]?.count ?? 0);
        const usageData = usageRows[0]?.data as
            | { date?: string; count?: number }
            | undefined;
        const usageCount =
            usageData?.date === getUtcDateKey() ? Number(usageData.count ?? 0) : 0;

        const used = Math.max(regCount, usageCount);
        return {
            used,
            limit: DAILY_RESEND_LIMIT,
            remaining: Math.max(0, DAILY_RESEND_LIMIT - used),
        };
    } catch {
        return { used: 0, limit: DAILY_RESEND_LIMIT, remaining: DAILY_RESEND_LIMIT };
    }
}

/**
 * Updates global email settings (Admin only).
 */
export async function updateEmailSettings(
    payload: EmailSettings,
): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const parsed = updateEmailSettingsSchema.safeParse(payload);
        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || "Input tidak valid.",
            };
        }

        await ensureSchema();
        await db
            .insert(siteContent)
            .values({
                key: EMAIL_SETTINGS_KEY,
                data: parsed.data,
                updatedAt: new Date(),
            })
            .onConflictDoUpdate({
                target: siteContent.key,
                set: {
                    data: parsed.data,
                    updatedAt: new Date(),
                },
            });

        revalidatePath("/admin/settings");
        return { success: true };
    } catch (error) {
        console.error("Failed to update email settings:", error);
        return { success: false, error: "Gagal menyimpan pengaturan email." };
    }
}

/**
 * Returns Resend env configuration status, preferences, and daily quota (Admin only).
 */
export async function getEmailDiagnostics() {
    const session = await getSession();
    if (!session?.userId || session.role !== "admin") {
        return { success: false as const, error: "Unauthorized" };
    }

    const [settings, quota] = await Promise.all([
        getEmailSettings(),
        getDailyEmailQuotaInternal(),
    ]);

    return {
        success: true as const,
        data: {
            config: getResendConfigStatus(),
            settings,
            quota,
        },
    };
}

/**
 * Sends or resends the approval email for a single registration (Admin only).
 */
export async function sendApprovalEmailForRegistration(
    registrationId: string,
    options?: { force?: boolean },
): Promise<{
    success: boolean;
    skipped?: boolean;
    error?: string;
    isRateLimited?: boolean;
}> {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await ensureSchema();
        const rows = await db
            .select({
                reg: registrations,
                event: events,
            })
            .from(registrations)
            .innerJoin(events, eq(registrations.eventId, events.id))
            .where(eq(registrations.id, registrationId))
            .limit(1);

        if (rows.length === 0) {
            return { success: false, error: "Data pendaftar tidak ditemukan." };
        }

        const { reg, event } = rows[0];
        if (
            !options?.force &&
            (reg.emailStatus === "SENT" || reg.emailStatus === "DELIVERED")
        ) {
            return { success: true, skipped: true };
        }

        const baseUrl = getBaseUrl();
        const template = buildApprovalEmailTemplate({
            fullName: reg.fullName,
            eventTitle: event.title,
            kickoffDate: event.kickoffDate,
            confirmationMessage: event.confirmationMessage,
            customSubject: event.emailSubject,
            customBody: event.emailBody,
            eventUrl: `${baseUrl}/${event.slug}`,
        });

        const sendRes = await sendEmail({
            to: reg.email,
            subject: template.subject,
            html: template.html,
            text: template.text,
        });

        if (sendRes.success) {
            await db
                .update(registrations)
                .set({
                    emailStatus: "SENT",
                    emailSentAt: new Date(),
                    emailError: null,
                    resendEmailId: sendRes.id || null,
                })
                .where(eq(registrations.id, reg.id));

            await recordDailyEmailUsage(1);
            revalidatePath("/admin/events/[slug]/registrants", "page");
            return { success: true };
        }

        await db
            .update(registrations)
            .set({
                emailStatus: "FAILED",
                emailError: sendRes.error || "Gagal mengirim email",
            })
            .where(eq(registrations.id, reg.id));

        revalidatePath("/admin/events/[slug]/registrants", "page");
        return {
            success: false,
            error: sendRes.error,
            isRateLimited: sendRes.isRateLimited,
        };
    } catch (error) {
        console.error("Failed to send approval email:", error);
        return {
            success: false,
            error: "Terjadi kesalahan saat mengirim email approval.",
        };
    }
}

/**
 * Batch-sends approval emails to approved registrants whose emailStatus is not SENT (Admin only).
 */
export async function sendPendingApprovalEmails(eventId: string): Promise<{
    success: boolean;
    sentCount?: number;
    failedCount?: number;
    remainingPendingCount?: number;
    error?: string;
}> {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await ensureSchema();
        const quota = await getDailyEmailQuotaInternal();
        if (quota.remaining <= 0) {
            return {
                success: false,
                error: "Kuota email harian (100/hari) sudah habis. Silakan coba lagi besok.",
            };
        }

        const eventRows = await db
            .select()
            .from(events)
            .where(eq(events.id, eventId))
            .limit(1);

        if (eventRows.length === 0) {
            return { success: false, error: "Event tidak ditemukan." };
        }
        const event = eventRows[0];

        const pendingRegs = await db
            .select()
            .from(registrations)
            .where(
                and(
                    eq(registrations.eventId, eventId),
                    eq(registrations.status, "APPROVED"),
                    notInArray(registrations.emailStatus, ["SENT", "DELIVERED"]),
                ),
            );

        if (pendingRegs.length === 0) {
            return {
                success: true,
                sentCount: 0,
                failedCount: 0,
                remainingPendingCount: 0,
            };
        }

        const batchTargets = pendingRegs.slice(0, quota.remaining);
        const baseUrl = getBaseUrl();

        const payloads = batchTargets.map((reg) => {
            const tpl = buildApprovalEmailTemplate({
                fullName: reg.fullName,
                eventTitle: event.title,
                kickoffDate: event.kickoffDate,
                confirmationMessage: event.confirmationMessage,
                customSubject: event.emailSubject,
                customBody: event.emailBody,
                eventUrl: `${baseUrl}/${event.slug}`,
            });
            return {
                to: reg.email,
                subject: tpl.subject,
                html: tpl.html,
                text: tpl.text,
            };
        });

        const batchRes = await sendBatchEmails(payloads);
        let sentCount = 0;
        let failedCount = 0;

        for (let i = 0; i < batchTargets.length; i++) {
            const reg = batchTargets[i];
            const itemRes = batchRes.results[i];
            if (itemRes?.success) {
                sentCount++;
                await db
                    .update(registrations)
                    .set({
                        emailStatus: "SENT",
                        emailSentAt: new Date(),
                        emailError: null,
                        resendEmailId: itemRes.id || null,
                    })
                    .where(eq(registrations.id, reg.id));
            } else {
                failedCount++;
                await db
                    .update(registrations)
                    .set({
                        emailStatus: "FAILED",
                        emailError:
                            itemRes?.error ||
                            batchRes.error ||
                            "Gagal mengirim batch email",
                    })
                    .where(eq(registrations.id, reg.id));
            }
        }

        await recordDailyEmailUsage(sentCount);
        await recordDailyEmailUsage(sentCount);
        revalidatePath("/admin/events/[slug]/registrants", "page");
        return {
            success: batchRes.success || sentCount > 0,
            sentCount,
            failedCount,
            remainingPendingCount: Math.max(
                0,
                pendingRegs.length - sentCount,
            ),
            error:
                sentCount === 0
                    ? batchRes.error || "Gagal mengirim email tertunda."
                    : undefined,
        };
    } catch (error) {
        console.error("Failed to send pending approval emails:", error);
        return {
            success: false,
            error: "Terjadi kesalahan saat mengirim email tertunda.",
        };
    }
}

/**
 * Sends a test email from /admin/settings to verify Resend configuration (Admin only).
 */
export async function sendTestEmail(
    toEmail: string,
): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const parsed = z.string().trim().email().safeParse(toEmail);
        if (!parsed.success) {
            return {
                success: false,
                error: "Masukkan alamat email tujuan yang valid.",
            };
        }

        const tpl = buildTestEmailTemplate({
            sentBy: session.email || "Admin MUDENG",
        });

        const res = await sendEmail({
            to: parsed.data,
            subject: tpl.subject,
            html: tpl.html,
            text: tpl.text,
        });

        if (!res.success) {
            return { success: false, error: res.error || "Gagal mengirim email test." };
        }
        await recordDailyEmailUsage(1);
        return { success: true };
    } catch (error) {
        console.error("Failed to send test email:", error);
        return { success: false, error: "Gagal mengirim email test." };
    }
}

const broadcastSchema = z.object({
    eventId: z.string().uuid("ID event tidak valid."),
    target: z.enum(["APPROVED", "ALL"]),
    subject: z.string().trim().min(3, "Subject minimal 3 karakter.").max(200),
    message: z.string().trim().min(5, "Isi pesan minimal 5 karakter."),
});

/**
 * Broadcasts an announcement or reminder email to event registrants using Resend Batch API (Admin only).
 */
export async function sendEventBroadcastEmail(payload: {
    eventId: string;
    target: "APPROVED" | "ALL";
    subject: string;
    message: string;
}): Promise<{
    success: boolean;
    sentCount?: number;
    failedCount?: number;
    error?: string;
}> {
    try {
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        const parsed = broadcastSchema.safeParse(payload);
        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message || "Data broadcast tidak valid.",
            };
        }

        await ensureSchema();
        const quota = await getDailyEmailQuotaInternal();
        if (quota.remaining <= 0) {
            return {
                success: false,
                error: "Kuota email harian (100/hari) sudah habis. Coba lagi besok.",
            };
        }

        const eventRows = await db
            .select()
            .from(events)
            .where(eq(events.id, parsed.data.eventId))
            .limit(1);

        if (eventRows.length === 0) {
            return { success: false, error: "Event tidak ditemukan." };
        }
        const event = eventRows[0];

        const whereCondition =
            parsed.data.target === "APPROVED"
                ? and(
                      eq(registrations.eventId, event.id),
                      eq(registrations.status, "APPROVED"),
                  )
                : eq(registrations.eventId, event.id);

        const targetRegs = await db
            .select()
            .from(registrations)
            .where(whereCondition);

        if (targetRegs.length === 0) {
            return {
                success: false,
                error: "Tidak ada peserta pada target yang dipilih.",
            };
        }

        if (targetRegs.length > quota.remaining) {
            return {
                success: false,
                error: `Jumlah penerima (${targetRegs.length} peserta) melebihi sisa kuota harian (${quota.remaining} email).`,
            };
        }

        const baseUrl = getBaseUrl();
        const payloads = targetRegs.map((reg) => {
            const tpl = buildBroadcastEmailTemplate({
                fullName: reg.fullName,
                eventTitle: event.title,
                subject: parsed.data.subject,
                message: parsed.data.message,
                eventUrl: `${baseUrl}/${event.slug}`,
            });
            return {
                to: reg.email,
                subject: tpl.subject,
                html: tpl.html,
                text: tpl.text,
            };
        });

        const batchRes = await sendBatchEmails(payloads);
        let sentCount = 0;
        let failedCount = 0;

        for (let i = 0; i < targetRegs.length; i++) {
            const itemRes = batchRes.results[i];
            if (itemRes?.success) {
                sentCount++;
            } else {
                failedCount++;
            }
        }

        await recordDailyEmailUsage(sentCount);
        await recordDailyEmailUsage(sentCount);
        revalidatePath("/admin/events/[slug]/registrants", "page");
        return {
            success: batchRes.success || sentCount > 0,
            sentCount,
            failedCount,
            error:
                sentCount === 0
                    ? batchRes.error || "Gagal mengirim broadcast."
                    : undefined,
        };
    } catch (error) {
        console.error("Failed to broadcast email:", error);
        return { success: false, error: "Terjadi kesalahan saat broadcast." };
    }
}
