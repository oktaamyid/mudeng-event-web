"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    Mail,
    Send,
} from "lucide-react";
import {
    sendTestEmail,
    updateEmailSettings,
    type EmailSettings,
} from "@/lib/actions/email";

interface EmailSettingsCardProps {
    initialConfig: {
        hasApiKey: boolean;
        hasFromEmail: boolean;
        fromEmail: string;
        replyTo: string;
    };
    initialSettings: EmailSettings;
    initialQuota: {
        used: number;
        limit: number;
        remaining: number;
    };
}

export function EmailSettingsCard({
    initialConfig,
    initialSettings,
    initialQuota,
}: EmailSettingsCardProps) {
    const [settings, setSettings] = useState<EmailSettings>(initialSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [saveFeedback, setSaveFeedback] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const [testTo, setTestTo] = useState("");
    const [isSendingTest, setIsSendingTest] = useState(false);
    const [testFeedback, setTestFeedback] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const isConfigured = initialConfig.hasApiKey && initialConfig.hasFromEmail;

    const handleSaveSettings = async () => {
        setIsSaving(true);
        setSaveFeedback(null);
        const res = await updateEmailSettings(settings);
        setIsSaving(false);

        if (res.success) {
            setSaveFeedback({
                type: "success",
                text: "Pengaturan email berhasil disimpan.",
            });
        } else {
            setSaveFeedback({
                type: "error",
                text: res.error || "Gagal menyimpan pengaturan.",
            });
        }
    };

    const handleSendTest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSendingTest(true);
        setTestFeedback(null);
        const res = await sendTestEmail(testTo);
        setIsSendingTest(false);

        if (res.success) {
            setTestFeedback({
                type: "success",
                text: `Email test berhasil dikirim ke ${testTo}.`,
            });
        } else {
            setTestFeedback({
                type: "error",
                text: res.error || "Gagal mengirim email test.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <CardTitle>Email & Resend Configuration</CardTitle>
                        <CardDescription>
                            Kelola pengiriman email otomatis (Approval, Pending, Notifikasi Admin) dengan batas kuota Resend Free Tier.
                        </CardDescription>
                    </div>
                    <Badge variant="secondary" className="font-normal">
                        <Mail className="mr-1.5 h-3.5 w-3.5" />
                        Kuota Hari Ini: {initialQuota.used} / {initialQuota.limit}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Env Diagnostic */}
                <div className="bg-muted/40 space-y-2 rounded-lg border p-4 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-medium">Status Koneksi Resend (.env)</span>
                        {isConfigured ? (
                            <Badge className="border-0 bg-emerald-500/10 text-emerald-700">
                                Terkonfigurasi
                            </Badge>
                        ) : (
                            <Badge className="border-0 bg-amber-500/15 text-amber-800">
                                Belum Lengkap
                            </Badge>
                        )}
                    </div>
                    <div className="text-muted-foreground space-y-1 text-xs">
                        <p>
                            <code>RESEND_API_KEY</code>:{" "}
                            {initialConfig.hasApiKey ? "Terpasang" : "Belum diisi"}
                        </p>
                        <p>
                            <code>RESEND_FROM_EMAIL</code>:{" "}
                            {initialConfig.hasFromEmail
                                ? initialConfig.fromEmail
                                : "Belum diisi (contoh: MUDENG <no-reply@domain.com>)"}
                        </p>
                    </div>
                </div>

                {/* Preference Toggles */}
                <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="send-on-pending">
                                Kirim email konfirmasi saat status Pending
                            </Label>
                            <p className="text-muted-foreground text-xs">
                                Default OFF untuk menghemat kuota (100 email/hari). Jika ON, setiap pendaftar menerima email 2 kali (Pending + Approved).
                            </p>
                        </div>
                        <Switch
                            id="send-on-pending"
                            checked={settings.sendOnPending}
                            onCheckedChange={(checked) =>
                                setSettings((prev) => ({
                                    ...prev,
                                    sendOnPending: checked,
                                }))
                            }
                        />
                    </div>

                    <div className="space-y-3 border-t pt-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="notify-admin">
                                    Notifikasi Admin saat ada pendaftar baru
                                </Label>
                                <p className="text-muted-foreground text-xs">
                                    Kirim email ke panitia setiap kali ada peserta baru yang mendaftar.
                                </p>
                            </div>
                            <Switch
                                id="notify-admin"
                                checked={settings.notifyAdminOnRegister}
                                onCheckedChange={(checked) =>
                                    setSettings((prev) => ({
                                        ...prev,
                                        notifyAdminOnRegister: checked,
                                    }))
                                }
                            />
                        </div>

                        {settings.notifyAdminOnRegister && (
                            <div className="space-y-1.5">
                                <Label htmlFor="admin-notify-email" className="text-xs">
                                    Email Panitia Penerima Notifikasi
                                </Label>
                                <Input
                                    id="admin-notify-email"
                                    type="email"
                                    placeholder="panitia@mudeng.oktaa.my.id"
                                    value={settings.adminNotifyEmail}
                                    onChange={(e) =>
                                        setSettings((prev) => ({
                                            ...prev,
                                            adminNotifyEmail: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {saveFeedback && (
                        <div
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                                saveFeedback.type === "error"
                                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                            }`}
                        >
                            {saveFeedback.type === "error" ? (
                                <AlertCircle className="h-4 w-4 shrink-0" />
                            ) : (
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                            )}
                            <span>{saveFeedback.text}</span>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={handleSaveSettings}
                            disabled={isSaving}
                            style={{ backgroundColor: "#6849E1", color: "#ffffff" }}
                        >
                            {isSaving && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Simpan Pengaturan Email
                        </Button>
                    </div>
                </div>

                {/* Test Send Email */}
                <form
                    onSubmit={handleSendTest}
                    className="space-y-3 border-t pt-5"
                >
                    <div className="space-y-0.5">
                        <Label htmlFor="test-email-input">
                            Test Kirim Email (Verifikasi Resend)
                        </Label>
                        <p className="text-muted-foreground text-xs">
                            Kirim email percobaan untuk memastikan API key dan domain pengirim sudah aktif.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Input
                            id="test-email-input"
                            type="email"
                            required
                            placeholder="email-kamu@contoh.com"
                            value={testTo}
                            onChange={(e) => setTestTo(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={isSendingTest || !isConfigured}
                        >
                            {isSendingTest ? (
                                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="mr-1.5 h-4 w-4" />
                            )}
                            Kirim Test Email
                        </Button>
                    </div>
                    {testFeedback && (
                        <div
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                                testFeedback.type === "error"
                                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                            }`}
                        >
                            {testFeedback.type === "error" ? (
                                <AlertCircle className="h-4 w-4 shrink-0" />
                            ) : (
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                            )}
                            <span>{testFeedback.text}</span>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
