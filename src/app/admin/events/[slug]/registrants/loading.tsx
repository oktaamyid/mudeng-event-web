import { AdminTablePageSkeleton } from "@/components/admin/AdminSkeletons";

export default function RegistrantsLoading() {
    return (
        <AdminTablePageSkeleton
            statCards={3}
            rows={6}
            showBackLink
            showToolbar
        />
    );
}
