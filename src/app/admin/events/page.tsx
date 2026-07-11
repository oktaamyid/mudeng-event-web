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
          <h1 className="text-2xl font-semibold tracking-tight">Manage Events</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage your events and their registration forms.
          </p>
        </div>
        <Button render={<Link href="/admin/events/new" />}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published
            </CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{publishedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Draft
            </CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalEvents - publishedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>A list of all events in your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {!success || !eventsList || eventsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">No events yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get started by creating your first event.
              </p>
              <Button render={<Link href="/admin/events/new" />} size="sm">
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventsList.map((evt: any) => (
                  <TableRow key={evt.id}>
                    <TableCell className="font-medium">{evt.title}</TableCell>
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
                          className="bg-green-500/15 text-green-700 border-green-200 hover:bg-green-500/20"
                        >
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          render={<Link href={`/admin/events/${evt.slug}/registrants`} />}
                        >
                          <Users className="w-4 h-4 mr-1.5" />
                          Registrants
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          render={<Link href={`/admin/events/${evt.slug}/edit`} />}
                        >
                          <Edit className="w-4 h-4 mr-1.5" />
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
