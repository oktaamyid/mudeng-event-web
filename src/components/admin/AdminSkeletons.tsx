import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Reusable skeleton for admin pages with header, optional stat cards, and a data table.
 */
export function AdminTablePageSkeleton({
    statCards = 3,
    rows = 5,
    showBackLink = false,
    showToolbar = false,
}: {
    statCards?: number;
    rows?: number;
    showBackLink?: boolean;
    showToolbar?: boolean;
}) {
    return (
        <div className="space-y-6">
            {showBackLink && <Skeleton className="h-7 w-28" />}

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-72 max-w-full" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-28 rounded-md" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                </div>
            </div>

            {/* Stat Cards */}
            {statCards > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {Array.from({ length: statCards }).map((_, idx) => (
                        <Card key={idx} className="border-border/60 shadow-xs">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <Skeleton className="h-3.5 w-24" />
                                <Skeleton className="h-8 w-8 rounded-lg" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-7 w-14" />
                                <Skeleton className="h-3 w-32" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Table Card */}
            <Card className="border-border/60 shadow-xs">
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-3.5 w-56" />
                    </div>
                    {showToolbar && (
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-52 rounded-md" />
                            <Skeleton className="h-9 w-44 rounded-lg" />
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-3">
                    {/* Table header */}
                    <div className="grid grid-cols-4 gap-4 border-b pb-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="ml-auto h-4 w-16" />
                    </div>
                    {/* Table rows */}
                    {Array.from({ length: rows }).map((_, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-4 items-center gap-4 py-2.5"
                        >
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-36" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="ml-auto h-8 w-20 rounded-md" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

/**
 * Skeleton for Event Create / Edit long form pages.
 */
export function AdminFormSkeleton() {
    return (
        <div className="mx-auto max-w-3xl space-y-6 pb-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-44" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <Skeleton className="h-9 w-28 rounded-md" />
            </div>

            {Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx} className="border-border/60 shadow-xs">
                    <CardHeader className="space-y-2">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-3.5 w-60" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Skeleton className="h-3.5 w-24" />
                                <Skeleton className="h-9 w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-3.5 w-24" />
                                <Skeleton className="h-9 w-full rounded-md" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3.5 w-28" />
                            <Skeleton className="h-24 w-full rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

/**
 * Skeleton for the Home CMS tabbed editor page.
 */
export function AdminCmsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-36" />
                    <Skeleton className="h-4 w-80 max-w-full" />
                </div>
                <Skeleton className="h-9 w-36 rounded-md" />
            </div>

            <Skeleton className="h-10 w-full max-w-md rounded-xl" />

            <Card className="border-border/60 shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-44" />
                        <Skeleton className="h-3.5 w-64" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-1 gap-4 rounded-xl border p-4 md:grid-cols-12"
                        >
                            <Skeleton className="aspect-[4/3] w-full rounded-lg md:col-span-4" />
                            <div className="space-y-3 md:col-span-8">
                                <div className="grid grid-cols-2 gap-3">
                                    <Skeleton className="h-9 w-full rounded-md" />
                                    <Skeleton className="h-9 w-full rounded-md" />
                                </div>
                                <Skeleton className="h-9 w-full rounded-md" />
                                <Skeleton className="h-16 w-full rounded-md" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

/**
 * Skeleton for the Admin Settings page.
 */
export function AdminSettingsSkeleton() {
    return (
        <div className="max-w-3xl space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-4 w-64" />
            </div>
            {Array.from({ length: 2 }).map((_, idx) => (
                <Card key={idx} className="border-border/60 shadow-xs">
                    <CardHeader className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3.5 w-56" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-3.5 w-24" />
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3.5 w-28" />
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
