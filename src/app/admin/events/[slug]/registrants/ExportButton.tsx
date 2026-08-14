"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportRegistrantsCSV } from "@/lib/actions/events";
import { useState } from "react";

export function ExportButton({ slug }: { slug: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleExport = async () => {
        setIsLoading(true);
        try {
            const res = await exportRegistrantsCSV(slug);
            if (res.success && res.data) {
                const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", res.filename || `export-${slug}.csv`);
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert(res.error || "Failed to export");
            }
        } catch (error) {
            console.error("Export failed", error);
            alert("Export failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleExport} disabled={isLoading} variant="outline" size="sm" className="flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" />
            {isLoading ? "Exporting..." : "Export CSV"}
        </Button>
    );
}
