"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Settings, LayoutDashboard, Zap } from "lucide-react";
import Image from "next/image";

const adminItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Events", url: "/admin/events", icon: Calendar },
    { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar({ isAdmin }: { isAdmin: boolean }) {
    const pathname = usePathname();
    const items = isAdmin ? adminItems : [];

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={<Link href="/admin" />}
                        >
                            <div className="flex aspect-square size-8 items-center justify-center">
                                <Image
                                    src="https://cdn.mudeng.oktaa.my.id/logo/logo-monogram.svg"
                                    alt="Mudeng"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="text-sm font-bold">
                                    MUDENG
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    Admin Panel
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive =
                                    item.url === "/admin"
                                        ? pathname === "/admin"
                                        : pathname.startsWith(item.url);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={isActive}
                                            tooltip={item.title}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="px-2 py-2">
                    <p className="text-muted-foreground text-xs">
                        © 2025 Mudeng Events
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
