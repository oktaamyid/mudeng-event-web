import { getAdminDashboardStats } from "@/lib/actions/events";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, Activity, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const { data, success } = await getAdminDashboardStats();

  if (!success || !data) {
    return (
      <div className="flex h-100 items-center justify-center rounded-xl border border-dashed bg-muted/20">
        <div className="text-center">
          <Activity className="mx-auto h-8 w-8 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-lg font-medium text-foreground">Failed to load data</h2>
          <p className="text-sm text-muted-foreground mt-1">Please try again later.</p>
        </div>
      </div>
    );
  }

  const { totalEvents, totalRegistrations, recentRegistrations } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your events and registrations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Events created so far
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total participants across all events
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1 border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <div className="text-sm font-medium text-green-600">All systems operational</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Accepting new registrations normally
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
          <CardDescription>
            The latest 5 participants who registered for your events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentRegistrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Clock className="h-10 w-10 text-muted-foreground/30 mb-4" />
              <p className="text-sm font-medium text-foreground">No recent registrations</p>
              <p className="text-xs text-muted-foreground mt-1">When people register, they'll show up here.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRegistrations.map((reg: any) => (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <div className="font-medium">{reg.fullName}</div>
                      <div className="text-xs text-muted-foreground">{reg.email}</div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {reg.eventTitle}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(reg.registeredAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </TableCell>
                    <TableCell>
                      {reg.status === "APPROVED" ? (
                        <Badge className="bg-green-500/15 text-green-700 border-green-200 hover:bg-green-500/20">
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
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
