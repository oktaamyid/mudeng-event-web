import { ExportButton } from "./ExportButton";
import { getEventRegistrants } from "@/lib/actions/events";
import { getDailyEmailQuotaInternal } from "@/lib/actions/email";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { SyncSheetButton } from "./SyncSheetButton";
import { RegistrantsClient } from "./RegistrantsClient";

export default async function RegistrantsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const [{ data, success }, dailyQuota] = await Promise.all([
        getEventRegistrants(resolvedParams.slug),
        getDailyEmailQuotaInternal(),
    ]);

    if (!success || !data || !data.event) {
        notFound();
    }

    const { event, registrants } = data;
    const approvedCount = registrants.filter(
        (r: { status: string }) => r.status === "APPROVED",
    ).length;
    const pendingCount = registrants.length - approvedCount;

    return (
        <div className="space-y-6">
            {/* Back nav */}
            <div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground -ml-2"
                    render={<Link href="/admin/events" />}
                >
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Back to Events
                </Button>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {event.title}
                        </h1>
                        <Badge
                            variant="secondary"
                            className="font-mono text-xs font-normal"
                        >
                            /{event.slug}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Kelola data peserta yang terdaftar pada event ini.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <SyncSheetButton eventId={event.id} />
                    <ExportButton slug={resolvedParams.slug} />
                </div>
            </div>

            {/* Minimalist Summary Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-card border-border/60 flex items-center justify-between rounded-xl border p-4 shadow-xs">
                    <div>
                        <p className="text-muted-foreground text-xs font-medium">
                            Total Registrants
                        </p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">
                            {registrants.length}
                        </p>
                    </div>
                    <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-lg">
                        <Users className="text-muted-foreground h-4 w-4" />
                    </div>
                </div>
                <div className="bg-card border-border/60 flex items-center justify-between rounded-xl border p-4 shadow-xs">
                    <div>
                        <p className="text-muted-foreground text-xs font-medium">
                            Pending Review
                        </p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">
                            {pendingCount}
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                        <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                </div>
                <div className="bg-card border-border/60 flex items-center justify-between rounded-xl border p-4 shadow-xs">
                    <div>
                        <p className="text-muted-foreground text-xs font-medium">
                            Approved
                        </p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">
                            {approvedCount}
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                </div>
            </div>

            {/* Interactive Table & Dialogs */}
            <RegistrantsClient
                event={{
                    id: event.id,
                    title: event.title,
                    slug: event.slug,
                    formFields: (event.formFields as { id: string; label: string; type?: string }[]) || [],
                }}
                registrants={registrants.map((r) => ({
                    id: r.id,
                    fullName: r.fullName,
                    email: r.email,
                    status: r.status,
                    emailStatus: r.emailStatus,
                    emailSentAt: r.emailSentAt ? r.emailSentAt.toISOString() : null,
                    emailError: r.emailError,
                    registeredAt: r.registeredAt.toISOString(),
                    answers: (r.answers as Record<string, unknown>) || {},
                }))}
                dailyQuota={dailyQuota}
            />
        </div>
    );
}
