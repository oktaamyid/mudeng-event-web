import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    // Protect User Route
    if (!userId) {
        redirect("/sign-in?redirect_url=/dashboard");
    }

    return (
        <SidebarProvider>
            <AppSidebar isAdmin={false} />
            <main className="bg-background min-h-screen flex-1 overflow-x-hidden">
                <div className="flex items-center border-b p-4">
                    <SidebarTrigger />
                </div>
                <div className="p-8">{children}</div>
            </main>
        </SidebarProvider>
    );
}
