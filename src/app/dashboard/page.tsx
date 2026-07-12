import { getUserRegistrations } from "@/lib/actions/events";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default async function DashboardPage() {
    const { data: registrations, success } = await getUserRegistrations();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                    My Events
                </h1>
                <p className="text-muted-foreground mt-2">
                    View the events you have registered for and track their
                    status.
                </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A0B10] p-6 shadow-sm">
                {!success || !registrations || registrations.length === 0 ? (
                    <div className="py-12 text-center">
                        <h3 className="text-lg font-medium text-white">
                            No registrations found
                        </h3>
                        <p className="text-muted-foreground mt-1 mb-6 text-sm">
                            You haven't registered for any events yet.
                        </p>
                        <Button
                            render={<Link href="/#events" />}
                            className="bg-[#6849E1] hover:bg-[#5b3fd1]"
                        >
                            Browse Events
                        </Button>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-white/70">
                                    Event Name
                                </TableHead>
                                <TableHead className="text-white/70">
                                    Kickoff Date
                                </TableHead>
                                <TableHead className="text-white/70">
                                    Registration Date
                                </TableHead>
                                <TableHead className="text-white/70">
                                    Status
                                </TableHead>
                                <TableHead className="text-right text-white/70">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrations.map((reg) => (
                                <TableRow
                                    key={reg.id}
                                    className="border-white/10 hover:bg-white/5"
                                >
                                    <TableCell className="font-medium text-white">
                                        {reg.event.title}
                                    </TableCell>
                                    <TableCell className="text-white/80">
                                        {reg.event.kickoffDate}
                                    </TableCell>
                                    <TableCell className="text-white/80">
                                        {new Date(
                                            reg.registeredAt,
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                reg.status === "APPROVED"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                reg.status === "APPROVED"
                                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                                    : reg.status === "PENDING"
                                                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                                      : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                            }
                                        >
                                            {reg.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            render={
                                                <Link
                                                    href={`/${reg.event.slug}`}
                                                />
                                            }
                                            className="text-white/70 hover:text-white"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />{" "}
                                            View Event
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
