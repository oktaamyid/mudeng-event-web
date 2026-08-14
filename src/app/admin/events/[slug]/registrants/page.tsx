import { ExportButton } from "./ExportButton";
import {
    getEventRegistrants,
    updateRegistrationStatus,
} from "@/lib/actions/events";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Users, ArrowLeft, Mail, Clock, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";

import { SyncSheetButton } from "./SyncSheetButton";

export default async function RegistrantsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const { data, success } = await getEventRegistrants(resolvedParams.slug);

    if (!success || !data || !data.event) {
        notFound();
    }

    const { event, registrants } = data;

    return (
        <div className="space-y-6">
            {/* Back nav */}
            <div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-2"
                    render={<Link href="/admin/events" />}
                >
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Back to Events
                </Button>
            </div>

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {event.title}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {registrants.length} participant
                        {registrants.length !== 1 ? "s" : ""} registered
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <SyncSheetButton eventId={event.id} />
                    <ExportButton slug={resolvedParams.slug} />
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1.5"
                    >
                        <Users className="h-3.5 w-3.5" />
                        {registrants.length} Registrants
                    </Badge>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Registrants</CardTitle>
                    <CardDescription>
                        All participants who have registered for this event.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {registrants.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="bg-muted mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                <Users className="text-muted-foreground h-6 w-6" />
                            </div>
                            <h3 className="text-foreground mb-1 font-medium">
                                No registrants yet
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                No one has registered for this event yet.
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {registrants.map((reg: any) => (
                                    <TableRow key={reg.id}>
                                        <TableCell className="font-medium">
                                            {reg.fullName}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {reg.email}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(
                                                reg.registeredAt,
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {reg.status === "APPROVED" ? (
                                                <Badge className="border-green-200 bg-green-500/15 text-green-700 hover:bg-green-500/20">
                                                    Approved
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Pending
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-primary hover:text-primary hover:bg-primary/10"
                                                        />
                                                    }
                                                >
                                                    <Eye className="mr-1.5 h-4 w-4" />
                                                    View
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-0 sm:rounded-2xl border-0 shadow-2xl">
                                                    <div className="bg-muted/10 px-6 py-6 sm:px-8 sm:py-8">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-2xl font-bold flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                                <span className="leading-tight">{reg.fullName}</span>
                                                                <div>
                                                                    {reg.status === "APPROVED" ? (
                                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                            <CheckCircle2 className="h-4 w-4" /> Approved
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                                                                            Pending
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-2.5">
                                                                <Mail className="h-4 w-4 text-brand" /> 
                                                                <span className="font-medium text-foreground">{reg.email}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2.5">
                                                                <Clock className="h-4 w-4 text-brand" /> 
                                                                <span className="font-medium text-foreground">
                                                                    {new Date(reg.registeredAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="px-6 py-6 sm:px-8 border-t bg-white">
                                                        <h4 className="text-sm font-semibold tracking-tight mb-6 flex items-center gap-2 uppercase text-muted-foreground">
                                                            <FileText className="h-4 w-4" /> Form Details
                                                        </h4>
                                                        <div className="flex flex-col gap-5">
                                                            {Object.entries(
                                                                reg.answers as Record<string, any>,
                                                            ).map(([key, item]) => {
                                                                // Handle Hybrid Snapshot vs Old Data
                                                                const isComplex = typeof item === "object" && item !== null && !Array.isArray(item) && "value" in item;
                                                                const value = isComplex ? item.value : item;
                                                                const savedLabel = isComplex ? item.label : null;

                                                                const fieldDef = (
                                                                    event.formFields as any[]
                                                                )?.find((f: any) => f.id === key);
                                                                
                                                                const label = savedLabel || (fieldDef ? fieldDef.label : key);
                                                                
                                                                let displayValue = "—";
                                                                if (Array.isArray(value)) {
                                                                    // Fix corrupted draft data where a string was spread into an array of characters
                                                                    const singleChars = value.filter(v => typeof v === 'string' && v.length === 1).join("");
                                                                    const normalStrings = value.filter(v => typeof v !== 'string' || v.length > 1);
                                                                    
                                                                    if (singleChars.length > 3 && value.length > 5) {
                                                                        displayValue = [singleChars, ...normalStrings].filter(Boolean).join(", ");
                                                                    } else {
                                                                        displayValue = value.join(", ");
                                                                    }
                                                                } else {
                                                                    displayValue = value?.toString() || "—";
                                                                }

                                                                return (
                                                                    <div
                                                                        key={key}
                                                                        className="flex flex-col gap-1.5 pb-5 border-b border-border/50 last:border-0 last:pb-0"
                                                                    >
                                                                        <span className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
                                                                            {label}
                                                                        </span>
                                                                        <span className="text-[15px] font-medium text-foreground leading-relaxed whitespace-pre-wrap">
                                                                            {displayValue}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="bg-muted/10 px-6 py-5 sm:px-8 border-t flex justify-end gap-3 rounded-b-2xl">
                                                        <form
                                                            action={async () => {
                                                                "use server";
                                                                await updateRegistrationStatus(
                                                                    reg.id,
                                                                    "PENDING",
                                                                );
                                                            }}
                                                        >
                                                            <Button
                                                                type="submit"
                                                                variant="outline"
                                                                className="w-full sm:w-auto"
                                                            >
                                                                Set to Pending
                                                            </Button>
                                                        </form>
                                                        <form
                                                            action={async () => {
                                                                "use server";
                                                                await updateRegistrationStatus(
                                                                    reg.id,
                                                                    "APPROVED",
                                                                );
                                                            }}
                                                        >
                                                            <Button
                                                                type="submit"
                                                                style={{ backgroundColor: "var(--color-badge-green, #49C420)", color: "white" }}
                                                                className="w-full sm:w-auto shadow-sm hover:opacity-90 transition-opacity border-0"
                                                            >
                                                                Approve Registration
                                                            </Button>
                                                        </form>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
