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
import { LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";

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
                <header className="bg-background sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b px-4 sm:px-6">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex flex-1 items-center justify-between">
                        <span className="text-muted-foreground text-sm font-medium">
                            Admin Dashboard
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                                render={<Link href="/" target="_blank" />}
                            >
                                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                <span className="hidden sm:inline">View Site</span>
                            </Button>
                            <form action={logout}>
                                <Button
                                    type="submit"
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                >
                                    <LogOut className="mr-1.5 h-4 w-4" />
                                    Logout
                                </Button>
                            </form>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="bg-muted/20 flex-1 p-4 sm:p-6">
                    <div className="mx-auto w-full max-w-6xl">{children}</div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
