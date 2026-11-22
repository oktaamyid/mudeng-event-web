"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Eye,
    Pencil,
    Trash2,
    Users,
    Mail,
    Clock,
    CheckCircle2,
    FileText,
    Search,
    Loader2,
    Send,
    AlertCircle,
    Megaphone,
    ArrowDown,
    ArrowUp,
    X,
} from "lucide-react";
import { FilePreview } from "@/components/ui/file-preview";
import { UploadButton } from "@/lib/uploadthing";
import {
    deleteUploadThingFile,
    deleteUploadThingFiles,
} from "@/lib/actions/upload";
import {
    updateRegistrationStatus,
    updateRegistration,
    deleteRegistration,
} from "@/lib/actions/events";
import {
    sendApprovalEmailForRegistration,
    sendEventBroadcastEmail,
    sendPendingApprovalEmails,
} from "@/lib/actions/email";

interface FormFieldDef {
    id: string;
    label: string;
    type?: string;
}

interface Registrant {
    id: string;
    fullName: string;
    email: string;
    status: string;
    emailStatus?: string;
    emailSentAt?: string | null;
    emailError?: string | null;
    registeredAt: string | Date;
    answers: Record<string, unknown>;
}

interface EventInfo {
    id: string;
    title: string;
    slug: string;
    formFields?: FormFieldDef[] | null;
}

interface ExtractedAnswer {
    key: string;
    label: string;
    type: string;
    isComplex: boolean;
    rawValue: unknown;
    displayValue: string;
    isArray: boolean;
}

function extractAnswers(
    answers: Record<string, unknown> | null | undefined,
    formFields?: FormFieldDef[] | null,
): ExtractedAnswer[] {
    if (!answers || typeof answers !== "object") return [];

    return Object.entries(answers).map(([key, item]) => {
        const isComplex =
            typeof item === "object" &&
            item !== null &&
            !Array.isArray(item) &&
            "value" in item;

        const complexItem = isComplex
            ? (item as { value: unknown; label?: string; type?: string })
            : null;
        const rawValue = complexItem ? complexItem.value : item;
        const savedLabel = complexItem?.label ?? null;
        const fieldDef = formFields?.find((f) => f.id === key);
        const label = savedLabel || fieldDef?.label || key;
        const type = complexItem?.type || fieldDef?.type || "text";

        let displayValue = "—";
        const isArray = Array.isArray(rawValue);

        if (isArray) {
            const arr = rawValue as unknown[];
            const singleChars = arr
                .filter((v) => typeof v === "string" && v.length === 1)
                .join("");
            const normalStrings = arr.filter(
                (v) => typeof v !== "string" || v.length > 1,
            );
            if (singleChars.length > 3 && arr.length > 5) {
                displayValue = [singleChars, ...normalStrings]
                    .filter(Boolean)
                    .join(", ");
            } else {
                displayValue = arr.join(", ");
            }
        } else if (rawValue !== null && rawValue !== undefined && rawValue !== "") {
            displayValue = String(rawValue);
        }

        return {
            key,
            label,
            type,
            isComplex,
            rawValue,
            displayValue,
            isArray,
        };
    });
}

function isUrlValue(val: string): boolean {
    return val.startsWith("http://") || val.startsWith("https://");
}

function StatusBadge({ status }: { status: string }) {
    if (status === "APPROVED") {
        return (
            <Badge className="border-emerald-200 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Approved
            </Badge>
        );
    }
    return (
        <Badge
            variant="secondary"
            className="border-amber-200 bg-amber-500/15 text-amber-700 hover:bg-amber-500/20"
        >
            Pending
        </Badge>
    );
}

function EmailStatusBadge({
    emailStatus,
    emailError,
}: {
    emailStatus?: string;
    emailError?: string | null;
}) {
    if (emailStatus === "DELIVERED") {
        return (
            <Badge className="border-0 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20">
                Delivered
            </Badge>
        );
    }
    if (emailStatus === "SENT") {
        return (
            <Badge className="border-0 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15">
                Terkirim
            </Badge>
        );
    }
    if (emailStatus === "BOUNCED") {
        return (
            <Badge
                title={emailError || "Email bounce (alamat tidak valid/ditolak)"}
                className="border-0 bg-red-500/15 text-red-700 hover:bg-red-500/20"
            >
                Bounced
            </Badge>
        );
    }
    if (emailStatus === "FAILED") {
        return (
            <Badge
                title={emailError || "Gagal mengirim email"}
                className="border-0 bg-red-500/10 text-red-700 hover:bg-red-500/15"
            >
                Gagal
            </Badge>
        );
    }
    return (
        <Badge
            variant="secondary"
            className="text-muted-foreground border-0 font-normal"
        >
            Belum Dikirim
        </Badge>
    );
}

export function RegistrantsClient({
    event,
    registrants,
    dailyQuota,
}: {
    event: EventInfo;
    registrants: Registrant[];
    dailyQuota: { used: number; limit: number; remaining: number };
}) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "APPROVED">("ALL");
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
    const sessionUploadedFileUrlsRef = useRef<string[]>([]);
    const baselineFileUrlsRef = useRef<Record<string, string>>({});

    const [viewingReg, setViewingReg] = useState<Registrant | null>(null);
    const [editingReg, setEditingReg] = useState<Registrant | null>(null);
    const [deletingReg, setDeletingReg] = useState<Registrant | null>(null);

    // Edit form state
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editStatus, setEditStatus] = useState("PENDING");
    const [editAnswers, setEditAnswers] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [isSendingPendingBatch, setIsSendingPendingBatch] = useState(false);
    const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
    const [broadcastTarget, setBroadcastTarget] = useState<"APPROVED" | "ALL">("APPROVED");
    const [broadcastSubject, setBroadcastSubject] = useState("");
    const [broadcastMessage, setBroadcastMessage] = useState("");
    const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);
    const [actionMessage, setActionMessage] = useState<string | null>(null);

    const counts = useMemo(() => {
        const approved = registrants.filter((r) => r.status === "APPROVED").length;
        const pending = registrants.length - approved;
        const unsentApproved = registrants.filter(
            (r) =>
                r.status === "APPROVED" &&
                r.emailStatus !== "SENT" &&
                r.emailStatus !== "DELIVERED",
        ).length;
        return { all: registrants.length, approved, pending, unsentApproved };
    }, [registrants]);

    const filteredRegistrants = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return registrants
            .filter((reg) => {
                const matchesStatus =
                    statusFilter === "ALL" || reg.status === statusFilter;
                const matchesSearch =
                    !q ||
                    reg.fullName.toLowerCase().includes(q) ||
                    reg.email.toLowerCase().includes(q);
                return matchesStatus && matchesSearch;
            })
            .sort((a, b) => {
                const aTime = new Date(a.registeredAt).getTime();
                const bTime = new Date(b.registeredAt).getTime();
                return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
            });
    }, [registrants, searchQuery, statusFilter, sortOrder]);

    const openEditDialog = (reg: Registrant) => {
        setActionError(null);
        setEditName(reg.fullName);
        setEditEmail(reg.email);
        setEditStatus(reg.status);

        const extracted = extractAnswers(reg.answers, event.formFields);
        const initialMap: Record<string, string> = {};
        const baselineFiles: Record<string, string> = {};
        for (const item of extracted) {
            const val = item.displayValue === "—" ? "" : item.displayValue;
            initialMap[item.key] = val;
            if (item.type === "file" && val) {
                baselineFiles[item.key] = val;
            }
        }
        baselineFileUrlsRef.current = baselineFiles;
        sessionUploadedFileUrlsRef.current = [];
        setEditAnswers(initialMap);
        setEditingReg(reg);
    };

    const handleCancelEditDialog = async () => {
        const orphanedUrls = [...sessionUploadedFileUrlsRef.current];
        sessionUploadedFileUrlsRef.current = [];
        if (orphanedUrls.length > 0) {
            await deleteUploadThingFiles(orphanedUrls);
        }
        setEditingReg(null);
    };

    const handleStatusChange = async (id: string, status: "PENDING" | "APPROVED") => {
        setIsUpdatingStatus(true);
        setActionError(null);
        setActionMessage(null);
        const res = await updateRegistrationStatus(id, status);
        setIsUpdatingStatus(false);

        if (res.success) {
            if (viewingReg && viewingReg.id === id) {
                const nextEmailStatus =
                    res.emailResult?.sent
                        ? "SENT"
                        : res.emailResult && !res.emailResult.sent && !res.emailResult.skipped
                          ? "FAILED"
                          : viewingReg.emailStatus;
                setViewingReg({
                    ...viewingReg,
                    status,
                    emailStatus: nextEmailStatus,
                    emailError: res.emailResult?.error || null,
                });
            }
            if (res.emailResult?.sent) {
                setActionMessage("Status diperbarui & email approval terkirim.");
            } else if (res.emailResult && !res.emailResult.sent && !res.emailResult.skipped) {
                setActionError(
                    `Status berubah ke APPROVED, tetapi email gagal dikirim: ${res.emailResult.error || "Unknown error"}`,
                );
            }
            router.refresh();
        } else {
            setActionError(res.error || "Gagal mengubah status.");
        }
    };

    const handleResendApprovalEmail = async (id: string) => {
        setIsSendingEmail(true);
        setActionError(null);
        setActionMessage(null);
        const res = await sendApprovalEmailForRegistration(id, { force: true });
        setIsSendingEmail(false);

        if (res.success) {
            if (viewingReg && viewingReg.id === id) {
                setViewingReg({
                    ...viewingReg,
                    emailStatus: "SENT",
                    emailError: null,
                });
            }
            setActionMessage("Email konfirmasi approval berhasil dikirim ulang.");
            router.refresh();
        } else {
            setActionError(res.error || "Gagal mengirim ulang email.");
            router.refresh();
        }
    };

    const handleSendPendingBatch = async () => {
        setIsSendingPendingBatch(true);
        setActionError(null);
        setActionMessage(null);
        const res = await sendPendingApprovalEmails(event.id);
        setIsSendingPendingBatch(false);

        if (res.success) {
            setActionMessage(
                `Berhasil mengirim ${res.sentCount ?? 0} email tertunda.${
                    res.remainingPendingCount
                        ? ` Tersisa ${res.remainingPendingCount} email untuk besok.`
                        : ""
                }`,
            );
            router.refresh();
        } else {
            setActionError(res.error || "Gagal mengirim email tertunda.");
            router.refresh();
        }
    };

    const handleSendBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSendingBroadcast(true);
        setActionError(null);
        setActionMessage(null);

        const res = await sendEventBroadcastEmail({
            eventId: event.id,
            target: broadcastTarget,
            subject: broadcastSubject,
            message: broadcastMessage,
        });

        setIsSendingBroadcast(false);
        if (res.success) {
            setIsBroadcastOpen(false);
            setBroadcastSubject("");
            setBroadcastMessage("");
            setActionMessage(
                `Broadcast terkirim ke ${res.sentCount ?? 0} peserta${
                    res.failedCount ? ` (${res.failedCount} gagal)` : ""
                }.`,
            );
            router.refresh();
        } else {
            setActionError(res.error || "Gagal mengirim broadcast.");
        }
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingReg) return;

        setIsSaving(true);
        setActionError(null);

        const originalAnswers = (editingReg.answers || {}) as Record<string, unknown>;
        const updatedAnswers: Record<string, unknown> = { ...originalAnswers };

        for (const [key, strVal] of Object.entries(editAnswers)) {
            const existing = originalAnswers[key];
            const isComplex =
                typeof existing === "object" &&
                existing !== null &&
                !Array.isArray(existing) &&
                "value" in existing;

            if (isComplex) {
                const complexObj = existing as {
                    label?: string;
                    type?: string;
                    value: unknown;
                };
                const nextValue = Array.isArray(complexObj.value)
                    ? strVal
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                    : strVal;
                updatedAnswers[key] = {
                    ...complexObj,
                    value: nextValue,
                };
            } else if (Array.isArray(existing)) {
                updatedAnswers[key] = strVal
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
            } else {
                updatedAnswers[key] = strVal;
            }
        }

        const res = await updateRegistration(editingReg.id, {
            fullName: editName,
            email: editEmail,
            status: editStatus,
            answers: updatedAnswers,
        });

        setIsSaving(false);
        if (res.success) {
            const removedBaselineFiles = Object.entries(baselineFileUrlsRef.current)
                .filter(([key, oldUrl]) => oldUrl && editAnswers[key] !== oldUrl)
                .map(([, oldUrl]) => oldUrl);
            sessionUploadedFileUrlsRef.current = [];
            baselineFileUrlsRef.current = {};
            if (removedBaselineFiles.length > 0) {
                await deleteUploadThingFiles(removedBaselineFiles);
            }
            setEditingReg(null);
            router.refresh();
        } else {
            setActionError(res.error || "Gagal menyimpan perubahan.");
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletingReg) return;
        setIsDeleting(true);
        setActionError(null);

        const res = await deleteRegistration(deletingReg.id);
        setIsDeleting(false);

        if (res.success) {
            if (viewingReg?.id === deletingReg.id) {
                setViewingReg(null);
            }
            setDeletingReg(null);
            router.refresh();
        } else {
            setActionError(res.error || "Gagal menghapus pendaftar.");
        }
    };

    const viewingAnswers = viewingReg
        ? extractAnswers(viewingReg.answers, event.formFields)
        : [];

    const editingAnswersList = editingReg
        ? extractAnswers(editingReg.answers, event.formFields)
        : [];

    return (
        <>
            <Card className="border-border/60 shadow-xs">
                <CardHeader className="gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Registrants List
                            </CardTitle>
                            <CardDescription>
                                Kelola, tinjau, edit, atau hapus data pendaftar event.
                            </CardDescription>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Badge
                                variant="secondary"
                                className={`font-normal ${
                                    dailyQuota.used >= 85
                                        ? "bg-amber-500/15 text-amber-800"
                                        : ""
                                }`}
                            >
                                <Mail className="mr-1.5 h-3.5 w-3.5" />
                                Kuota Email Hari Ini: {dailyQuota.used} / {dailyQuota.limit}
                            </Badge>
                            {counts.unsentApproved > 0 && (
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    disabled={isSendingPendingBatch || dailyQuota.remaining <= 0}
                                    onClick={handleSendPendingBatch}
                                    className="h-8 text-xs"
                                >
                                    {isSendingPendingBatch ? (
                                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                        <Send className="mr-1.5 h-3.5 w-3.5" />
                                    )}
                                    Kirim Email Tertunda ({counts.unsentApproved})
                                </Button>
                            )}
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={registrants.length === 0 || dailyQuota.remaining <= 0}
                                onClick={() => {
                                    setActionError(null);
                                    setIsBroadcastOpen(true);
                                }}
                                className="h-8 text-xs"
                            >
                                <Megaphone className="mr-1.5 h-3.5 w-3.5" />
                                Broadcast Email
                            </Button>
                        </div>
                    </div>

                    {(actionMessage || actionError) && (
                        <div
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                                actionError
                                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                            }`}
                        >
                            {actionError ? (
                                <AlertCircle className="h-4 w-4 shrink-0" />
                            ) : (
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                            )}
                            <span>{actionError || actionMessage}</span>
                        </div>
                    )}

                    {/* Search & Filter */}
                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:w-64">
                            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari nama atau email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 pl-9 text-sm"
                            />
                        </div>
                        <div className="bg-muted/60 inline-flex items-center rounded-lg p-1 text-xs font-medium">
                            {(
                                [
                                    { key: "ALL", label: `Semua (${counts.all})` },
                                    { key: "PENDING", label: `Pending (${counts.pending})` },
                                    { key: "APPROVED", label: `Approved (${counts.approved})` },
                                ] as const
                            ).map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setStatusFilter(tab.key)}
                                    className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                                        statusFilter === tab.key
                                            ? "bg-background text-foreground shadow-xs"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {filteredRegistrants.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="bg-muted mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                <Users className="text-muted-foreground h-6 w-6" />
                            </div>
                            <h3 className="text-foreground mb-1 font-medium">
                                {registrants.length === 0
                                    ? "Belum ada pendaftar"
                                    : "Tidak ada hasil yang cocok"}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {registrants.length === 0
                                    ? "Peserta yang mendaftar akan muncul di sini."
                                    : "Coba ubah kata kunci pencarian atau filter status."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSortOrder((prev) =>
                                                        prev === "desc" ? "asc" : "desc",
                                                    )
                                                }
                                                className="hover:text-foreground inline-flex cursor-pointer items-center gap-1 font-medium transition-colors"
                                                title={
                                                    sortOrder === "desc"
                                                        ? "Urutan: Terbaru ke Terlama"
                                                        : "Urutan: Terlama ke Terbaru"
                                                }
                                            >
                                                <span>Tanggal Daftar</span>
                                                {sortOrder === "desc" ? (
                                                    <ArrowDown className="h-3.5 w-3.5" />
                                                ) : (
                                                    <ArrowUp className="h-3.5 w-3.5" />
                                                )}
                                            </button>
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Email Notif</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRegistrants.map((reg) => (
                                        <TableRow
                                            key={reg.id}
                                            className="hover:bg-muted/40 transition-colors"
                                        >
                                            <TableCell className="font-medium">
                                                {reg.fullName}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {reg.email}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                                                {new Date(
                                                    reg.registeredAt,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={reg.status} />
                                            </TableCell>
                                            <TableCell>
                                                <EmailStatusBadge
                                                    emailStatus={reg.emailStatus}
                                                    emailError={reg.emailError}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="inline-flex items-center justify-end gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setActionError(null);
                                                            setViewingReg(reg);
                                                        }}
                                                        className="text-muted-foreground hover:text-foreground h-8 px-2.5"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye className="mr-1 h-4 w-4" />
                                                        View
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openEditDialog(reg)}
                                                        className="text-muted-foreground hover:text-foreground h-8 px-2.5"
                                                        title="Edit Pendaftar"
                                                    >
                                                        <Pencil className="mr-1 h-3.5 w-3.5" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => {
                                                            setActionError(null);
                                                            setDeletingReg(reg);
                                                        }}
                                                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                                                        title="Hapus Pendaftar"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* VIEW DIALOG */}
            <Dialog
                open={!!viewingReg}
                onOpenChange={(open) => {
                    if (!open) setViewingReg(null);
                }}
            >
                <DialogContent className="flex max-h-[85vh] w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-[600px] sm:rounded-2xl">
                    {viewingReg && (
                        <>
                            {/* Fixed Header */}
                            <div className="border-b bg-muted/20 px-6 py-5 pr-12 sm:px-7">
                                <DialogHeader className="gap-2.5">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <DialogTitle className="text-xl font-semibold tracking-tight break-words">
                                            {viewingReg.fullName}
                                        </DialogTitle>
                                        <StatusBadge status={viewingReg.status} />
                                        <EmailStatusBadge
                                            emailStatus={viewingReg.emailStatus}
                                            emailError={viewingReg.emailError}
                                        />
                                    </div>
                                    <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Mail className="text-brand h-4 w-4 shrink-0" />
                                            <span className="text-foreground font-medium break-all">
                                                {viewingReg.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="text-brand h-4 w-4 shrink-0" />
                                            <span className="text-foreground font-medium">
                                                {new Date(
                                                    viewingReg.registeredAt,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </DialogHeader>
                            </div>

                            {/* Scrollable Body */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-5 sm:px-7">
                                {actionError && (
                                    <div className="border-destructive/30 bg-destructive/10 text-destructive mb-4 rounded-lg border px-3 py-2 text-xs">
                                        {actionError}
                                    </div>
                                )}

                                <h4 className="text-muted-foreground mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                                    <FileText className="h-3.5 w-3.5" />
                                    Form Details
                                </h4>

                                <div className="divide-border/50 flex flex-col divide-y">
                                    {viewingAnswers.map((item) => (
                                        <div
                                            key={item.key}
                                            className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0"
                                        >
                                            <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                                                {item.label}
                                            </span>
                                            {isUrlValue(item.displayValue) ? (
                                                <FilePreview
                                                    url={item.displayValue}
                                                    label={item.label}
                                                />
                                            ) : (
                                                <span className="text-foreground text-sm leading-relaxed font-medium break-words whitespace-pre-wrap">
                                                    {item.displayValue}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fixed Footer */}
                            <div className="bg-muted/20 flex flex-wrap items-center justify-between gap-2 border-t px-6 py-4 sm:px-7">
                                <div className="flex flex-wrap items-center gap-2">
                                    {viewingReg.status === "APPROVED" && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={isSendingEmail}
                                            onClick={() =>
                                                handleResendApprovalEmail(viewingReg.id)
                                            }
                                        >
                                            {isSendingEmail ? (
                                                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                                <Send className="mr-1.5 h-3.5 w-3.5" />
                                            )}
                                            Kirim Ulang Email
                                        </Button>
                                    )}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const target = viewingReg;
                                            setViewingReg(null);
                                            openEditDialog(target);
                                        }}
                                    >
                                        <Pencil className="mr-1.5 h-3.5 w-3.5" />
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setDeletingReg(viewingReg)}
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                        Delete
                                    </Button>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {viewingReg.status === "APPROVED" && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={isSendingEmail}
                                            onClick={() =>
                                                handleResendApprovalEmail(viewingReg.id)
                                            }
                                        >
                                            {isSendingEmail ? (
                                                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                                <Send className="mr-1.5 h-3.5 w-3.5" />
                                            )}
                                            Kirim Ulang Email
                                        </Button>
                                    )}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={
                                            isUpdatingStatus ||
                                            viewingReg.status === "PENDING"
                                        }
                                        onClick={() =>
                                            handleStatusChange(viewingReg.id, "PENDING")
                                        }
                                    >
                                        Set Pending
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        disabled={
                                            isUpdatingStatus ||
                                            viewingReg.status === "APPROVED"
                                        }
                                        onClick={() =>
                                            handleStatusChange(viewingReg.id, "APPROVED")
                                        }
                                        style={{
                                            backgroundColor:
                                                "var(--color-badge-green, #49C420)",
                                            color: "white",
                                        }}
                                        className="border-0 shadow-xs hover:opacity-90"
                                    >
                                        {isUpdatingStatus ? (
                                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                                        )}
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* EDIT DIALOG */}
            <Dialog
                open={!!editingReg}
                onOpenChange={(open) => {
                    if (!open && !isSaving) {
                        void handleCancelEditDialog();
                    }
                }}
            >
                <DialogContent className="flex max-h-[85vh] w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-[600px] sm:rounded-2xl">
                    {editingReg && (
                        <form onSubmit={handleSaveEdit} className="flex min-h-0 flex-1 flex-col">
                            <div className="border-b bg-muted/20 px-6 py-5 pr-12 sm:px-7">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold">
                                        Edit Pendaftar
                                    </DialogTitle>
                                    <DialogDescription>
                                        Perbarui informasi peserta, status, atau jawaban formulir.
                                    </DialogDescription>
                                </DialogHeader>
                            </div>

                            <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-6 py-5 sm:px-7">
                                {actionError && (
                                    <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-xs">
                                        {actionError}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="edit-fullName">Nama Lengkap</Label>
                                        <Input
                                            id="edit-fullName"
                                            required
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="edit-email">Email</Label>
                                        <Input
                                            id="edit-email"
                                            type="email"
                                            required
                                            value={editEmail}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label>Status Pendaftaran</Label>
                                    <Select
                                        value={editStatus}
                                        onValueChange={(val) => {
                                            if (val) setEditStatus(val);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="APPROVED">Approved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {editingAnswersList.length > 0 && (
                                    <div className="border-t pt-4 space-y-3.5">
                                        <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                            Jawaban Formulir
                                        </h4>
                                        {editingAnswersList.map((item) => (
                                            <div key={item.key} className="space-y-1.5">
                                                <Label
                                                    htmlFor={`ans-${item.key}`}
                                                    className="text-xs font-medium"
                                                >
                                                    {item.label}
                                                    {item.isArray && (
                                                        <span className="text-muted-foreground ml-1.5 font-normal">
                                                            (pisahkan dengan koma)
                                                        </span>
                                                    )}
                                                </Label>
                                                {item.type === "file" ? (
                                                    <div className="space-y-2.5">
                                                        {editAnswers[item.key] ? (
                                                            <div className="space-y-2">
                                                                <FilePreview
                                                                    url={editAnswers[item.key]}
                                                                    label={item.label}
                                                                />
                                                                <div className="flex justify-end">
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={async () => {
                                                                            const prevUrl = editAnswers[item.key];
                                                                            setEditAnswers((prev) => ({
                                                                                ...prev,
                                                                                [item.key]: "",
                                                                            }));
                                                                            if (
                                                                                prevUrl &&
                                                                                prevUrl !== baselineFileUrlsRef.current[item.key] &&
                                                                                (prevUrl.includes("utfs.io") || prevUrl.includes("ufs.sh"))
                                                                            ) {
                                                                                sessionUploadedFileUrlsRef.current =
                                                                                    sessionUploadedFileUrlsRef.current.filter(
                                                                                        (u) => u !== prevUrl,
                                                                                    );
                                                                                await deleteUploadThingFile(prevUrl);
                                                                            }
                                                                        }}
                                                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 px-2 text-xs"
                                                                    >
                                                                        <X className="mr-1 h-3.5 w-3.5" />
                                                                        Hapus File
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-muted-foreground text-xs">
                                                                Belum ada file terunggah.
                                                            </p>
                                                        )}

                                                        <div className="bg-muted/30 rounded-lg border border-dashed p-3 text-center">
                                                            <p className="text-muted-foreground mb-1.5 text-xs">
                                                                {editAnswers[item.key]
                                                                    ? "Ganti file (Gambar / PDF / ZIP)"
                                                                    : "Unggah file (Gambar / PDF / ZIP)"}
                                                            </p>
                                                            <UploadButton
                                                                endpoint="publicUploader"
                                                                onClientUploadComplete={async (res) => {
                                                                    if (res && res.length > 0) {
                                                                        const newUrl = res[0].url;
                                                                        const prevUrl = editAnswers[item.key];
                                                                        sessionUploadedFileUrlsRef.current.push(newUrl);
                                                                        setEditAnswers((prev) => ({
                                                                            ...prev,
                                                                            [item.key]: newUrl,
                                                                        }));
                                                                        if (
                                                                            prevUrl &&
                                                                            prevUrl !== newUrl &&
                                                                            prevUrl !== baselineFileUrlsRef.current[item.key] &&
                                                                            (prevUrl.includes("utfs.io") || prevUrl.includes("ufs.sh"))
                                                                        ) {
                                                                            sessionUploadedFileUrlsRef.current =
                                                                                sessionUploadedFileUrlsRef.current.filter(
                                                                                    (u) => u !== prevUrl,
                                                                                );
                                                                            await deleteUploadThingFile(prevUrl);
                                                                        }
                                                                    }
                                                                }}
                                                                onUploadError={(err: Error) => {
                                                                    setActionError(
                                                                        `Gagal upload file: ${err.message}`,
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : item.type === "textarea" ||
                                                (editAnswers[item.key]?.length ?? 0) > 80 ? (
                                                    <Textarea
                                                        id={`ans-${item.key}`}
                                                        rows={3}
                                                        value={editAnswers[item.key] ?? ""}
                                                        onChange={(e) =>
                                                            setEditAnswers((prev) => ({
                                                                ...prev,
                                                                [item.key]: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                ) : (
                                                    <Input
                                                        id={`ans-${item.key}`}
                                                        value={editAnswers[item.key] ?? ""}
                                                        onChange={(e) =>
                                                            setEditAnswers((prev) => ({
                                                                ...prev,
                                                                [item.key]: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-muted/20 flex items-center justify-end gap-2 border-t px-6 py-4 sm:px-7">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={isSaving}
                                    onClick={() => {
                                        void handleCancelEditDialog();
                                    }}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={isSaving}
                                    className="bg-[#6849E1] text-white hover:bg-[#5738CC]"
                                >
                                    {isSaving && (
                                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    )}
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog
                open={!!deletingReg}
                onOpenChange={(open) => {
                    if (!open && !isDeleting) setDeletingReg(null);
                }}
            >
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <DialogTitle>Hapus Pendaftar?</DialogTitle>
                        <DialogDescription>
                            Data pendaftaran milik{" "}
                            <span className="text-foreground font-medium">
                                {deletingReg?.fullName}
                            </span>{" "}
                            ({deletingReg?.email}) akan dihapus permanen dan tidak dapat
                            dikembalikan.
                        </DialogDescription>
                    </DialogHeader>
                    {actionError && (
                        <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-xs">
                            {actionError}
                        </div>
                    )}
                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isDeleting}
                            onClick={() => setDeletingReg(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={isDeleting}
                            onClick={handleConfirmDelete}
                        >
                            {isDeleting && (
                                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                            )}
                            Ya, Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* BROADCAST EMAIL DIALOG */}
            <Dialog
                open={isBroadcastOpen}
                onOpenChange={(open) => {
                    if (!open && !isSendingBroadcast) setIsBroadcastOpen(false);
                }}
            >
                <DialogContent className="sm:max-w-[520px]">
                    <form onSubmit={handleSendBroadcast} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Broadcast Email Peserta</DialogTitle>
                            <DialogDescription>
                                Kirim pengumuman atau reminder (H-1, lokasi, link sertifikat) via Resend Batch API. Sisa kuota hari ini:{" "}
                                <strong>{dailyQuota.remaining} email</strong>.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2">
                            <Label>Target Penerima</Label>
                            <Select
                                value={broadcastTarget}
                                onValueChange={(v) =>
                                    setBroadcastTarget(
                                        (v === "ALL" ? "ALL" : "APPROVED") as
                                            | "APPROVED"
                                            | "ALL",
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="APPROVED">
                                        Hanya Peserta Approved ({counts.approved} orang)
                                    </SelectItem>
                                    <SelectItem value="ALL">
                                        Semua Pendaftar ({counts.all} orang)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="broadcast-subject">Subject Email</Label>
                            <Input
                                id="broadcast-subject"
                                required
                                placeholder={`e.g. Reminder H-1 ${event.title}`}
                                value={broadcastSubject}
                                onChange={(e) => setBroadcastSubject(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="broadcast-message">Isi Pengumuman</Label>
                            <Textarea
                                id="broadcast-message"
                                required
                                rows={5}
                                placeholder="Tulis pesan pengumuman untuk peserta..."
                                value={broadcastMessage}
                                onChange={(e) => setBroadcastMessage(e.target.value)}
                            />
                        </div>

                        {actionError && (
                            <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-xs">
                                {actionError}
                            </div>
                        )}

                        <DialogFooter className="gap-2 sm:gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={isSendingBroadcast}
                                onClick={() => setIsBroadcastOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isSendingBroadcast}
                                className="bg-[#6849E1] text-white hover:bg-[#5738CC]"
                            >
                                {isSendingBroadcast ? (
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Megaphone className="mr-1.5 h-3.5 w-3.5" />
                                )}
                                Kirim Broadcast
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
