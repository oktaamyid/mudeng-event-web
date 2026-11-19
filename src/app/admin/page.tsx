import { getAdminDashboardStats } from "@/lib/actions/events";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, Activity, Clock, Plus, ArrowUpRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboardPage() {
    const { data, success } = await getAdminDashboardStats();

    if (!success || !data) {
        return (
            <div className="bg-muted/20 flex h-100 items-center justify-center rounded-xl border border-dashed">
                <div className="text-center">
                    <Activity className="text-muted-foreground mx-auto mb-4 h-8 w-8 opacity-50" />
                    <h2 className="text-foreground text-lg font-medium">
                        Failed to load data
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    const {
        totalEvents,
        publishedEvents = 0,
        totalRegistrations,
        pendingRegistrations = 0,
        recentRegistrations,
    } = data;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Ringkasan event dan pendaftaran peserta Mudeng.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        render={<Link href="/admin/events" />}
                    >
                        Manage Events
                    </Button>
                    <Button
                        size="sm"
                        className="bg-[#6849E1] text-white hover:bg-[#5738CC]"
                        render={<Link href="/admin/events/new" />}
                    >
                        <Plus className="mr-1.5 h-4 w-4" />
                        New Event
                    </Button>
                </div>
            </div>

            {/* Minimalist Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border-border/60 shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            Total Events
                        </CardTitle>
                        <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                            <Calendar className="text-foreground h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold tracking-tight">
                            {totalEvents}
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                            {publishedEvents} published · {totalEvents - publishedEvents} draft
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            Total Registrations
                        </CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6849E1]/10">
                            <Users className="h-4 w-4 text-[#6849E1]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold tracking-tight">
                            {totalRegistrations}
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                            Total peserta di seluruh event
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-xs sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            Pending Review
                        </CardTitle>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                            <Clock className="h-4 w-4 text-amber-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold tracking-tight">
                            {pendingRegistrations}
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                            Menunggu persetujuan admin
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Registrations */}
            <Card className="border-border/60 shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-base font-semibold">
                            Recent Registrations
                        </CardTitle>
                        <CardDescription>
                            5 pendaftar terbaru dari seluruh event.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {recentRegistrations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <Clock className="text-muted-foreground/30 mb-4 h-10 w-10" />
                            <p className="text-foreground text-sm font-medium">
                                Belum ada pendaftaran terbaru
                            </p>
                            <p className="text-muted-foreground mt-1 text-xs">
                                Peserta yang mendaftar akan muncul di sini.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Participant</TableHead>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentRegistrations.map((reg: any) => (
                                        <TableRow
                                            key={reg.id}
                                            className="hover:bg-muted/40 transition-colors"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="bg-[#6849E1]/10 text-xs font-medium text-[#6849E1]">
                                                            {reg.fullName
                                                                .substring(0, 2)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="min-w-0">
                                                        <div className="truncate font-medium">
                                                            {reg.fullName}
                                                        </div>
                                                        <div className="text-muted-foreground truncate text-xs">
                                                            {reg.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {reg.eventTitle}
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
                                                {reg.status === "APPROVED" ? (
                                                    <Badge className="border-emerald-200 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20">
                                                        Approved
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="secondary"
                                                        className="border-amber-200 bg-amber-500/15 text-amber-700 hover:bg-amber-500/20"
                                                    >
                                                        Pending
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {reg.eventSlug ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2.5 text-xs"
                                                        render={
                                                            <Link
                                                                href={`/admin/events/${reg.eventSlug}/registrants`}
                                                            />
                                                        }
                                                    >
                                                        Detail
                                                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                                    </Button>
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
