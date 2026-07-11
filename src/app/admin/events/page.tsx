import { getEvents } from "@/lib/actions/events";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Edit, Users, Calendar, FileText } from "lucide-react";

export default async function AdminEventsPage() {
    const { data: eventsList, success } = await getEvents();

    const totalEvents = eventsList?.length ?? 0;
    const publishedCount =
        eventsList?.filter((e: any) => e.status === "PUBLISHED").length ?? 0;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Manage Events
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Create and manage your events and their registration
                        forms.
                    </p>
                </div>
                <Button render={<Link href="/admin/events/new" />}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Event
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-muted-foreground text-sm font-medium">
                            Total Events
                        </CardTitle>
                        <Calendar className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalEvents}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-muted-foreground text-sm font-medium">
                            Published
                        </CardTitle>
                        <FileText className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{publishedCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-muted-foreground text-sm font-medium">
                            Draft
                        </CardTitle>
                        <FileText className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {totalEvents - publishedCount}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Events Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Events</CardTitle>
                    <CardDescription>
                        A list of all events in your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!success || !eventsList || eventsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="bg-muted mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                <Calendar className="text-muted-foreground h-6 w-6" />
                            </div>
                            <h3 className="text-foreground mb-1 font-medium">
                                No events yet
                            </h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Get started by creating your first event.
                            </p>
                            <Button
                                render={<Link href="/admin/events/new" />}
                                size="sm"
                            >
                                Create Event
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Kickoff Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {eventsList.map((evt: any) => (
                                    <TableRow key={evt.id}>
                                        <TableCell className="font-medium">
                                            {evt.title}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs">
                                            {evt.slug}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {evt.kickoffDate}
                                        </TableCell>
                                        <TableCell>
                                            {evt.status === "PUBLISHED" ? (
                                                <Badge
                                                    variant="default"
                                                    className="border-green-200 bg-green-500/15 text-green-700 hover:bg-green-500/20"
                                                >
                                                    Published
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Draft
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    render={
                                                        <Link
                                                            href={`/admin/events/${evt.slug}/registrants`}
                                                        />
                                                    }
                                                >
                                                    <Users className="mr-1.5 h-4 w-4" />
                                                    Registrants
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-primary hover:text-primary hover:bg-primary/10"
                                                    render={
                                                        <Link
                                                            href={`/admin/events/${evt.slug}/edit`}
                                                        />
                                                    }
                                                >
                                                    <Edit className="mr-1.5 h-4 w-4" />
                                                    Edit
                                                </Button>
                                            </div>
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
