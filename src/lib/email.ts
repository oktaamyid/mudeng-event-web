const RESEND_API_BASE = "https://api.resend.com";

export interface SendEmailPayload {
    to: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
}

export interface SendEmailResult {
    success: boolean;
    id?: string;
    error?: string;
    isRateLimited?: boolean;
}

export interface BatchEmailResult {
    success: boolean;
    results: Array<{
        to: string;
        success: boolean;
        id?: string;
        error?: string;
        isRateLimited?: boolean;
    }>;
    error?: string;
    isRateLimited?: boolean;
}

/**
 * Returns non-sensitive Resend configuration status for admin diagnostics.
 */
export function getResendConfigStatus(): {
    hasApiKey: boolean;
    hasFromEmail: boolean;
    fromEmail: string;
    replyTo: string;
} {
    const apiKey = process.env.RESEND_API_KEY?.trim() || "";
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "";
    const replyTo = process.env.RESEND_REPLY_TO?.trim() || "";
    return {
        hasApiKey: Boolean(apiKey),
        hasFromEmail: Boolean(fromEmail),
        fromEmail,
        replyTo,
    };
}

function getRequiredConfig():
    | { ok: true; apiKey: string; from: string; replyTo?: string }
    | { ok: false; error: string } {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.RESEND_FROM_EMAIL?.trim();
    const replyTo = process.env.RESEND_REPLY_TO?.trim() || undefined;

    if (!apiKey) {
        return { ok: false, error: "RESEND_API_KEY belum dikonfigurasi di .env." };
    }
    if (!from) {
        return { ok: false, error: "RESEND_FROM_EMAIL belum dikonfigurasi di .env." };
    }
    return { ok: true, apiKey, from, replyTo };
}

/**
 * Escapes user-supplied plain text before inserting into HTML email templates.
 */
export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function normalizeRichHtml(html: string): string {
    return html.replace(/&nbsp;|\u00A0/g, " ").trim();
}

function stripHtmlToText(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;|\u00A0/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

/**
 * Sends a single transactional email via Resend REST API.
 */
export async function sendEmail(
    payload: SendEmailPayload,
): Promise<SendEmailResult> {
    const cfg = getRequiredConfig();
    if (!cfg.ok) {
        return { success: false, error: cfg.error };
    }

    try {
        const res = await fetch(`${RESEND_API_BASE}/emails`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${cfg.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: cfg.from,
                to: [payload.to],
                subject: payload.subject,
                html: payload.html,
                text: payload.text,
                ...(payload.replyTo || cfg.replyTo
                    ? { reply_to: payload.replyTo || cfg.replyTo }
                    : {}),
            }),
            signal: AbortSignal.timeout(10000),
        });

        const data = (await res.json().catch(() => ({}))) as {
            id?: string;
            message?: string;
            name?: string;
        };

        if (!res.ok) {
            const isRateLimited =
                res.status === 429 ||
                data?.name === "rate_limit_exceeded" ||
                data?.name === "daily_quota_exceeded";
            return {
                success: false,
                error: data?.message || `Resend HTTP ${res.status}`,
                isRateLimited,
            };
        }

        return { success: true, id: data.id };
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Network error contacting Resend";
        return { success: false, error: message };
    }
}

/**
 * Sends up to 100 emails in a single Resend Batch API call.
 */
export async function sendBatchEmails(
    items: SendEmailPayload[],
): Promise<BatchEmailResult> {
    if (items.length === 0) {
        return { success: true, results: [] };
    }

    const cfg = getRequiredConfig();
    if (!cfg.ok) {
        return {
            success: false,
            error: cfg.error,
            results: items.map((item) => ({
                to: item.to,
                success: false,
                error: cfg.error,
            })),
        };
    }

    const chunk = items.slice(0, 100);

    try {
        const res = await fetch(`${RESEND_API_BASE}/emails/batch`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${cfg.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                chunk.map((item) => ({
                    from: cfg.from,
                    to: [item.to],
                    subject: item.subject,
                    html: item.html,
                    text: item.text,
                    ...(item.replyTo || cfg.replyTo
                        ? { reply_to: item.replyTo || cfg.replyTo }
                        : {}),
                })),
            ),
            signal: AbortSignal.timeout(15000),
        });

        const json = (await res.json().catch(() => ({}))) as {
            data?: Array<{ id?: string }>;
            message?: string;
            name?: string;
        };

        if (!res.ok) {
            const isRateLimited =
                res.status === 429 ||
                json?.name === "rate_limit_exceeded" ||
                json?.name === "daily_quota_exceeded";
            const errorMsg = json?.message || `Resend Batch HTTP ${res.status}`;
            return {
                success: false,
                error: errorMsg,
                isRateLimited,
                results: chunk.map((item) => ({
                    to: item.to,
                    success: false,
                    error: errorMsg,
                    isRateLimited,
                })),
            };
        }

        const returned = Array.isArray(json.data) ? json.data : [];
        return {
            success: true,
            results: chunk.map((item, idx) => ({
                to: item.to,
                success: Boolean(returned[idx]?.id),
                id: returned[idx]?.id,
                error: returned[idx]?.id ? undefined : "No email ID returned",
            })),
        };
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Network error contacting Resend";
        return {
            success: false,
            error: message,
            results: chunk.map((item) => ({
                to: item.to,
                success: false,
                error: message,
            })),
        };
    }
}

const MUDENG_LOGO_CDN_URL =
    "https://cdn.mudeng.oktaa.my.id/logo/logo-element.png";

function wrapBrandedEmailLayout(params: {
    previewBadge: string;
    heading: string;
    bodyHtml: string;
    preheader?: string;
    ctaLabel?: string;
    ctaUrl?: string;
}): string {
    const ctaBlock =
        params.ctaLabel && params.ctaUrl
            ? `
            <div style="margin-top:24px;">
                <a href="${escapeHtml(params.ctaUrl)}" style="display:inline-block;background-color:#6849E1;color:#FFFFFF;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:9999px;">
                    ${escapeHtml(params.ctaLabel)}
                </a>
            </div>`
            : "";

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(params.heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F3FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181B;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(params.preheader || params.heading)}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E4E4E7;">
          <tr>
            <td style="height:6px;background-color:#6849E1;"></td>
          </tr>
          <tr>
            <td style="padding:26px 28px 24px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                <tr>
                  <td align="left" valign="middle">
                    <a href="https://mudeng.oktaa.my.id" style="text-decoration:none;display:inline-block;">
                      <img src="${MUDENG_LOGO_CDN_URL}" alt="MUDENG" height="18" style="display:block;height:18px;width:auto;border:0;" />
                    </a>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block;background-color:#F0EDFA;color:#6849E1;font-size:12px;font-weight:600;padding:4px 12px;border-radius:9999px;">
                      ${escapeHtml(params.previewBadge)}
                    </span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.3;font-weight:700;color:#18181B;">
                ${escapeHtml(params.heading)}
              </h1>
              <div style="font-size:15px;line-height:1.6;color:#3F3F46;">
                ${params.bodyHtml}
              </div>
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 28px;background-color:#FAFAFA;border-top:1px solid #F4F4F5;font-size:12px;line-height:1.6;color:#71717A;text-align:center;">
              <p style="margin:0 0 10px 0;color:#71717A;">
                Have any questions? Reach out to us directly on <a href="https://www.instagram.com/mudengsttnf/" style="color:#6849E1;text-decoration:none;font-weight:500;">Instagram</a>.
              </p>
              <p style="margin:0 0 8px 0;color:#71717A;">
                Copyright &copy; ${new Date().getFullYear()} MUDENG.
              </p>
              <p style="margin:0;color:#A1A1AA;">
                <a href="https://www.instagram.com/mudengsttnf/" style="color:#6849E1;text-decoration:none;font-weight:500;">Instagram</a>
                &nbsp;&bull;&nbsp;
                <a href="https://mudeng.oktaa.my.id" style="color:#6849E1;text-decoration:none;font-weight:500;">Website</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Builds the registration approval email template.
 */
export function buildApprovalEmailTemplate(params: {
    fullName: string;
    eventTitle: string;
    kickoffDate?: string | null;
    confirmationMessage?: string | null;
    customSubject?: string | null;
    customBody?: string | null;
    eventUrl?: string;
}): { subject: string; html: string; text: string } {
    const subject =
        params.customSubject?.trim() ||
        `Pendaftaran ${params.eventTitle} Disetujui!`;

    const extraRich = params.customBody?.trim()
        ? normalizeRichHtml(params.customBody)
        : params.confirmationMessage?.trim()
          ? normalizeRichHtml(params.confirmationMessage)
          : "";

    const kickoffRow = params.kickoffDate?.trim()
        ? `<tr>
            <td style="color:#71717A;padding:3px 0;width:120px;">Jadwal / Kickoff</td>
            <td style="color:#18181B;font-weight:600;padding:3px 0;">${escapeHtml(params.kickoffDate.trim())}</td>
          </tr>`
        : "";

    const summaryBox = `
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:16px 0;background-color:#FAFAFA;border:1px solid #E4E4E7;border-radius:12px;">
          <tr>
            <td style="padding:14px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:13px;line-height:1.5;">
                <tr>
                  <td style="color:#71717A;padding:3px 0;width:120px;">Kegiatan</td>
                  <td style="color:#18181B;font-weight:600;padding:3px 0;">${escapeHtml(params.eventTitle)}</td>
                </tr>
                <tr>
                  <td style="color:#71717A;padding:3px 0;">Status</td>
                  <td style="color:#15803D;font-weight:600;padding:3px 0;">Disetujui</td>
                </tr>
                ${kickoffRow}
              </table>
            </td>
          </tr>
        </table>`;

    const extraSection = extraRich
        ? `<div style="margin-top:16px;padding:14px 16px;background-color:#F8F7FF;border:1px solid #E9E4FC;border-radius:12px;font-size:14px;line-height:1.6;color:#27272A;">${extraRich}</div>`
        : "";

    const bodyHtml = `
        <p style="margin:0 0 12px 0;">Halo <strong>${escapeHtml(params.fullName)}</strong>,</p>
        <p style="margin:0 0 12px 0;">Kabar baik! Pendaftaran kamu untuk kegiatan <strong>${escapeHtml(params.eventTitle)}</strong> telah <strong>disetujui</strong> oleh panitia.</p>
        ${summaryBox}
        ${extraSection}
    `;

    const html = wrapBrandedEmailLayout({
        previewBadge: "Pendaftaran Disetujui",
        heading: params.eventTitle,
        preheader: `Pendaftaran ${params.eventTitle} kamu telah disetujui oleh panitia MUDENG.`,
        bodyHtml,
        ctaLabel: params.eventUrl ? "Lihat Detail Event" : undefined,
        ctaUrl: params.eventUrl,
    });

    const textParts = [
        `Halo ${params.fullName},`,
        `Pendaftaran kamu untuk kegiatan ${params.eventTitle} telah DISETUJUI oleh panitia.`,
        params.kickoffDate?.trim()
            ? `Jadwal / Kickoff: ${params.kickoffDate.trim()}`
            : "",
        extraRich ? stripHtmlToText(extraRich) : "",
        params.eventUrl ? `Detail Event: ${params.eventUrl}` : "",
    ].filter(Boolean);

    return { subject, html, text: textParts.join("\n\n") };
}

/**
 * Builds the optional registration pending confirmation email template.
 */
export function buildPendingEmailTemplate(params: {
    fullName: string;
    eventTitle: string;
    eventUrl?: string;
}): { subject: string; html: string; text: string } {
    const subject = `Pendaftaran ${params.eventTitle} Diterima`;
    const bodyHtml = `
        <p style="margin:0 0 12px 0;">Halo <strong>${escapeHtml(params.fullName)}</strong>,</p>
        <p style="margin:0 0 14px 0;">Terima kasih telah mendaftar pada kegiatan <strong>${escapeHtml(params.eventTitle)}</strong>.</p>
        <p style="margin:0;">Data kamu sudah kami terima dengan status <strong>Menunggu Verifikasi</strong>. Email lanjutan akan dikirim setelah panitia menyetujui pendaftaranmu.</p>
    `;

    const html = wrapBrandedEmailLayout({
        previewBadge: "Menunggu Verifikasi",
        heading: params.eventTitle,
        bodyHtml,
        ctaLabel: params.eventUrl ? "Lihat Halaman Event" : undefined,
        ctaUrl: params.eventUrl,
    });

    const text = [
        `Halo ${params.fullName},`,
        `Terima kasih telah mendaftar pada kegiatan ${params.eventTitle}.`,
        "Data kamu sudah kami terima dengan status Menunggu Verifikasi. Email lanjutan akan dikirim setelah panitia menyetujui pendaftaranmu.",
        params.eventUrl ? `Halaman Event: ${params.eventUrl}` : "",
    ]
        .filter(Boolean)
        .join("\n\n");

    return { subject, html, text };
}

/**
 * Builds the optional admin notification email when a new user registers.
 */
export function buildAdminNotificationTemplate(params: {
    fullName: string;
    email: string;
    eventTitle: string;
    registrantsUrl?: string;
}): { subject: string; html: string; text: string } {
    const subject = `[Admin] Pendaftar Baru: ${params.eventTitle}`;
    const bodyHtml = `
        <p style="margin:0 0 12px 0;">Ada pendaftar baru pada event <strong>${escapeHtml(params.eventTitle)}</strong>:</p>
        <ul style="margin:0 0 14px 0;padding-left:20px;">
          <li><strong>Nama:</strong> ${escapeHtml(params.fullName)}</li>
          <li><strong>Email:</strong> ${escapeHtml(params.email)}</li>
          <li><strong>Status:</strong> PENDING</li>
        </ul>
    `;

    const html = wrapBrandedEmailLayout({
        previewBadge: "Notifikasi Panitia",
        heading: "Pendaftar Baru Masuk",
        bodyHtml,
        ctaLabel: params.registrantsUrl ? "Tinjau Pendaftar" : undefined,
        ctaUrl: params.registrantsUrl,
    });

    const text = [
        `Pendaftar baru pada event ${params.eventTitle}:`,
        `Nama: ${params.fullName}`,
        `Email: ${params.email}`,
        "Status: PENDING",
        params.registrantsUrl ? `Tinjau: ${params.registrantsUrl}` : "",
    ]
        .filter(Boolean)
        .join("\n");

    return { subject, html, text };
}

/**
 * Builds a test email for verifying Resend settings from /admin/settings.
 */
export function buildTestEmailTemplate(params: {
    sentBy: string;
}): { subject: string; html: string; text: string } {
    const subject = "Test Konfigurasi Email MUDENG (Resend)";
    const bodyHtml = `
        <p style="margin:0 0 12px 0;">Konfigurasi <strong>Resend</strong> pada dashboard admin MUDENG berhasil terhubung.</p>
        <p style="margin:0;">Email percobaan ini dikirim oleh <strong>${escapeHtml(params.sentBy)}</strong>.</p>
    `;

    const html = wrapBrandedEmailLayout({
        previewBadge: "Test Koneksi SMTP/API",
        heading: "Resend Aktif",
        bodyHtml,
    });

    const text = `Konfigurasi Resend pada dashboard admin MUDENG berhasil terhubung.\nDikirim oleh: ${params.sentBy}`;
    return { subject, html, text };
}

/**
 * Builds a broadcast announcement / reminder email template for event registrants.
 */
export function buildBroadcastEmailTemplate(params: {
    fullName: string;
    eventTitle: string;
    subject: string;
    message: string;
    eventUrl?: string;
}): { subject: string; html: string; text: string } {
    const paragraphs = params.message
        .split(/\r?\n/)
        .map((line) => line.trim())
        .map((line) =>
            line
                ? `<p style="margin:0 0 10px 0;">${escapeHtml(line)}</p>`
                : `<div style="height:6px;"></div>`,
        )
        .join("");

    const bodyHtml = `
        <p style="margin:0 0 12px 0;">Halo <strong>${escapeHtml(params.fullName)}</strong>,</p>
        <div style="margin:0 0 12px 0;">${paragraphs}</div>
    `;

    const html = wrapBrandedEmailLayout({
        previewBadge: params.eventTitle,
        heading: params.subject,
        bodyHtml,
        ctaLabel: params.eventUrl ? "Lihat Detail Event" : undefined,
        ctaUrl: params.eventUrl,
    });

    const text = [
        `Halo ${params.fullName},`,
        params.message.trim(),
        params.eventUrl ? `Detail Event: ${params.eventUrl}` : "",
    ]
        .filter(Boolean)
        .join("\n\n");

    return { subject: params.subject, html, text };
}
