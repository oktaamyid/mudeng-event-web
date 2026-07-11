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
import { Eye, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
                <Badge
                    variant="secondary"
                    className="flex items-center gap-1.5"
                >
                    <Users className="h-3.5 w-3.5" />
                    {registrants.length} Registrants
                </Badge>
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
                                                <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            {reg.fullName}
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <Separator />
                                                    <div className="space-y-4 pt-2">
                                                        {Object.entries(
                                                            reg.answers as Record<
                                                                string,
                                                                any
                                                            >,
                                                        ).map(
                                                            ([key, value]) => {
                                                                const fieldDef =
                                                                    (
                                                                        event.formFields as any[]
                                                                    )?.find(
                                                                        (
                                                                            f: any,
                                                                        ) =>
                                                                            f.id ===
                                                                            key,
                                                                    );
                                                                const label =
                                                                    fieldDef
                                                                        ? fieldDef.label
                                                                        : key;
                                                                return (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="space-y-1"
                                                                    >
                                                                        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                                                            {
                                                                                label
                                                                            }
                                                                        </p>
                                                                        <p className="text-foreground text-sm">
                                                                            {value?.toString() ||
                                                                                "—"}
                                                                        </p>
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                    <Separator className="my-2" />
                                                    <div className="flex justify-end gap-2 pt-2">
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
                                                                size="sm"
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
                                                                size="sm"
                                                                className="bg-green-600 text-white hover:bg-green-700"
                                                            >
                                                                Approve
                                                                Registration
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
