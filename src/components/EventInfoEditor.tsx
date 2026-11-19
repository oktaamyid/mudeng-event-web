"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export interface EventInfoItem {
    label: string;
    value: string;
    icon: string;
}

export const INFO_ICON_OPTIONS = [
    { value: "user", label: "User / Nama" },
    { value: "monitor", label: "Kategori / Layar" },
    { value: "globe", label: "Format / Online" },
    { value: "map-pin", label: "Lokasi / Pin" },
    { value: "file-text", label: "Fokus / Dokumen" },
    { value: "calendar", label: "Jadwal / Output" },
    { value: "clock", label: "Durasi / Waktu" },
    { value: "award", label: "Benefit / Sertifikat" },
];

export function createDefaultInfoItems(event: {
    title?: string;
    category?: string;
    duration?: string;
    kickoffDate?: string;
    focus?: string;
    output?: string;
}): EventInfoItem[] {
    return [
        {
            label: "Nama Proker:",
            value: (event.title || "").toUpperCase(),
            icon: "user",
        },
        {
            label: "Kategori:",
            value: event.category || "",
            icon: "monitor",
        },
        {
            label: "Format:",
            value: "Hybrid",
            icon: "globe",
        },
        {
            label: "Fokus",
            value: event.focus || "Perancangan antarmuka digital",
            icon: "file-text",
        },
        {
            label: "Output",
            value: event.output || "Prototype & Portofolio UI/UX",
            icon: "calendar",
        },
    ];
}

export function EventInfoEditor({
    items,
    onChange,
    eventFallback,
}: {
    items: EventInfoItem[];
    onChange: (items: EventInfoItem[]) => void;
    eventFallback?: {
        title?: string;
        category?: string;
        duration?: string;
        kickoffDate?: string;
        focus?: string;
        output?: string;
    };
}) {
    const handleAdd = () => {
        onChange([...items, { label: "", value: "", icon: "file-text" }]);
    };

    const handleLoadDefaults = () => {
        onChange(createDefaultInfoItems(eventFallback || {}));
    };

    const handleUpdate = (
        idx: number,
        field: keyof EventInfoItem,
        val: string,
    ) => {
        const next = [...items];
        next[idx] = { ...next[idx], [field]: val };
        onChange(next);
    };

    const handleRemove = (idx: number) => {
        const next = [...items];
        next.splice(idx, 1);
        onChange(next);
    };

    const handleMove = (idx: number, dir: -1 | 1) => {
        const target = idx + dir;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[idx], next[target]] = [next[target], next[idx]];
        onChange(next);
    };

    return (
        <div className="space-y-3 rounded-xl border border-dashed p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Label className="text-sm font-semibold">
                        Event Info Card (Sidebar Halaman Event)
                    </Label>
                    <p className="text-muted-foreground text-xs">
                        Sesuaikan baris informasi yang tampil di kotak sebelah kanan
                        section Overview (misal: Nama Proker, Kategori, Format,
                        Lokasi, Fokus, Output).
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    {items.length === 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleLoadDefaults}
                            className="border-border bg-white shadow-xs hover:bg-muted"
                        >
                            Isi Default
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAdd}
                        className="border-[#6849E1]/30 bg-[#6849E1]/10 text-[#6849E1] hover:bg-[#6849E1]/20"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" />
                        Tambah Info
                    </Button>
                </div>
            </div>

            {items.length === 0 ? (
                <p className="text-muted-foreground py-3 text-center text-xs">
                    Belum ada baris info kustom (halaman publik akan menggunakan
                    data bawaan). Klik &quot;Isi Default&quot; atau &quot;Tambah
                    Info&quot; untuk menyesuaikannya.
                </p>
            ) : (
                <div className="space-y-2.5">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-muted/30 grid grid-cols-1 gap-2 rounded-lg border p-2.5 sm:grid-cols-12 sm:items-center"
                        >
                            <div className="sm:col-span-4">
                                <Input
                                    placeholder="Label (mis. Format:)"
                                    value={item.label}
                                    onChange={(e) =>
                                        handleUpdate(idx, "label", e.target.value)
                                    }
                                    className="h-9 bg-white text-sm"
                                />
                            </div>
                            <div className="sm:col-span-4">
                                <Input
                                    placeholder="Isi (mis. Hybrid)"
                                    value={item.value}
                                    onChange={(e) =>
                                        handleUpdate(idx, "value", e.target.value)
                                    }
                                    className="h-9 bg-white text-sm"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <Select
                                    value={item.icon || "file-text"}
                                    onValueChange={(val) => {
                                        if (val) handleUpdate(idx, "icon", val);
                                    }}
                                >
                                    <SelectTrigger className="h-9 w-full bg-white text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {INFO_ICON_OPTIONS.map((opt) => (
                                            <SelectItem
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-end gap-0.5 sm:col-span-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    disabled={idx === 0}
                                    onClick={() => handleMove(idx, -1)}
                                    className="h-7 w-7"
                                    title="Naik"
                                >
                                    <ArrowUp className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    disabled={idx === items.length - 1}
                                    onClick={() => handleMove(idx, 1)}
                                    className="h-7 w-7"
                                    title="Turun"
                                >
                                    <ArrowDown className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => handleRemove(idx)}
                                    className="text-destructive hover:bg-destructive/10 h-7 w-7"
                                    title="Hapus"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
