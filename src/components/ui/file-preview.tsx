"use client";

import { useState } from "react";
import { ExternalLink, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const NON_IMAGE_EXTENSIONS = [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".zip",
    ".rar",
    ".txt",
    ".csv",
];

function looksLikeNonImage(url: string): boolean {
    const clean = url.split("?")[0].toLowerCase();
    return NON_IMAGE_EXTENSIONS.some((ext) => clean.endsWith(ext));
}

/**
 * Displays an inline image preview with lightbox zoom when the URL is an image,
 * or falls back to a clean file link card for non-image files (e.g. PDF).
 */
export function FilePreview({
    url,
    label = "Lampiran File",
    compact = false,
}: {
    url: string;
    label?: string;
    compact?: boolean;
}) {
    const [canRenderImage, setCanRenderImage] = useState(
        !looksLikeNonImage(url),
    );
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <>
            <div className="mt-1 flex flex-col gap-2">
                {canRenderImage ? (
                    <div className="bg-muted/20 group relative w-full max-w-xs overflow-hidden rounded-xl border">
                        <img
                            src={url}
                            alt={label}
                            onError={() => setCanRenderImage(false)}
                            onClick={() => setIsLightboxOpen(true)}
                            className={`w-full cursor-pointer object-contain transition-transform duration-200 group-hover:scale-[1.02] ${
                                compact ? "max-h-36" : "max-h-52"
                            }`}
                        />
                        <div className="flex items-center justify-between gap-2 border-t bg-white px-3 py-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsLightboxOpen(true)}
                                className="h-7 px-2 text-xs font-medium"
                            >
                                <Eye className="mr-1.5 h-3.5 w-3.5" />
                                Preview
                            </Button>
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium"
                            >
                                Buka Tab
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="bg-muted/30 inline-flex w-fit items-center gap-3 rounded-lg border px-3 py-2">
                        <FileText className="text-muted-foreground h-4 w-4 shrink-0" />
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                        >
                            Lihat File / Tautan
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                    </div>
                )}
            </div>

            <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
                <DialogContent className="flex max-h-[90vh] w-full flex-col gap-3 overflow-hidden p-4 sm:max-w-2xl">
                    <DialogHeader className="pr-8">
                        <DialogTitle className="truncate text-sm font-semibold">
                            Preview — {label}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="bg-muted/30 flex max-h-[70vh] items-center justify-center overflow-auto rounded-lg border p-2">
                        <img
                            src={url}
                            alt={label}
                            className="max-h-[66vh] w-auto rounded object-contain"
                        />
                    </div>
                    <div className="flex justify-end">
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                        >
                            Buka ukuran penuh di tab baru
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
