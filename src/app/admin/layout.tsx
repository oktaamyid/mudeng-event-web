export const dynamic = "force-dynamic";

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session || session.role !== "admin") {
        redirect("/sign-in");
    }

    return (
        <SidebarProvider>
            <AppSidebar isAdmin={true} />
            <SidebarInset>
                {/* Top Header Bar */}
                <header className="bg-background flex h-14 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex flex-1 items-center justify-between">
                        <span className="text-muted-foreground text-sm font-medium">
                            Admin Dashboard
                        </span>
                        <form action={logout}>
                            <Button
                                type="submit"
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </form>
                    </div>
                </header>

                {/* Main Content */}
                <main className="bg-muted/20 flex-1 p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
