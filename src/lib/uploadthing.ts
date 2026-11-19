"use client";

import { createElement, type ComponentProps } from "react";
import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

const BaseUploadButton = generateUploadButton<OurFileRouter>({
    url: "/event/api/uploadthing",
});

const BaseUploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: "/event/api/uploadthing",
});

/**
 * Styled UploadButton wrapper with explicit high-contrast colors
 * so "Choose File(s)" remains visible across admin and public themes.
 */
export function UploadButton({
    appearance,
    ...props
}: ComponentProps<typeof BaseUploadButton>) {
    return createElement(BaseUploadButton, {
        ...props,
        appearance: {
            container:
                "w-full flex flex-col items-center justify-center gap-1.5",
            button: "inline-flex h-9 items-center justify-center rounded-lg bg-[#6849E1] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#5738CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6849E1] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
            allowedContent: "text-xs text-muted-foreground",
            ...appearance,
        },
    });
}

/**
 * Styled UploadDropzone wrapper with explicit high-contrast colors.
 */
export function UploadDropzone({
    appearance,
    ...props
}: ComponentProps<typeof BaseUploadDropzone>) {
    return createElement(BaseUploadDropzone, {
        ...props,
        appearance: {
            container:
                "rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center",
            button: "inline-flex h-9 items-center justify-center rounded-lg bg-[#6849E1] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#5738CC] cursor-pointer",
            label: "text-sm font-medium text-foreground",
            allowedContent: "text-xs text-muted-foreground",
            ...appearance,
        },
    });
}
