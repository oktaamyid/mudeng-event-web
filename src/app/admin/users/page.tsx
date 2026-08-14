import { getUsers, updateUserRole, deleteUser } from "@/lib/actions/users";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function UsersPage() {
    const { data: users, success } = await getUsers();

    if (!success || !users) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <ShieldAlert className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-xl font-medium">Access Denied</h3>
                <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Users Administration
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Manage system users and their roles
                    </p>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {users.length} Users
                </Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>
                        A list of all users registered in the system.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell className="font-medium">{u.name || "—"}</TableCell>
                                    <TableCell className="text-muted-foreground text-sm">{u.email}</TableCell>
                                    <TableCell>
                                        {u.role === "admin" ? (
                                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">
                                                <Shield className="h-3 w-3 mr-1" />
                                                Admin
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">User</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(u.createdAt).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <form action={async () => {
                                                "use server";
                                                await updateUserRole(u.id, u.role === "admin" ? "user" : "admin");
                                            }}>
                                                <Button variant="outline" size="sm">
                                                    Make {u.role === "admin" ? "User" : "Admin"}
                                                </Button>
                                            </form>
                                            <form action={async () => {
                                                "use server";
                                                await deleteUser(u.id);
                                            }}>
                                                <Button variant="destructive" size="sm" className="px-2">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
