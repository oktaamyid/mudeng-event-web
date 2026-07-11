export const dynamic = "force-dynamic";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { logout } from "@/lib/actions/auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    // Protect User Route
    if (!session) {
        redirect("/sign-in?redirect_url=/dashboard");
    }

    return (
        <SidebarProvider>
            <AppSidebar isAdmin={false} />
            <main className="bg-background min-h-screen flex-1 overflow-x-hidden">
                <div className="flex items-center justify-between border-b p-4">
                    <SidebarTrigger />
                    <form action={logout}>
                        <button type="submit" className="text-sm font-medium text-red-500 hover:underline">
                            Logout
                        </button>
                    </form>
                </div>
                <div className="p-8">{children}</div>
            </main>
        </SidebarProvider>
    );
}
