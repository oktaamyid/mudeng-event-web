"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileSpreadsheet } from "lucide-react";
import { syncEventToGoogleSheets } from "@/lib/actions/sheets";

export function SyncSheetButton({ eventId }: { eventId: string }) {
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const res = await syncEventToGoogleSheets(eventId);
            if (res.success && res.sheetId) {
                // Open the spreadsheet in a new tab if successful
                window.open(`https://docs.google.com/spreadsheets/d/${res.sheetId}/edit`, "_blank");
                alert("Berhasil sinkronisasi ke Google Sheets!");
            } else {
                alert(`Gagal: ${res.error}`);
            }
        } catch (error: any) {
            alert(`Terjadi kesalahan: ${error.message}`);
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5"
        >
            {isSyncing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
                <FileSpreadsheet className="h-4 w-4 text-green-600" />
            )}
            Sync to Sheets
        </Button>
    );
}
