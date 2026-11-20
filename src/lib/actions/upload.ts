"use server";

import { UTApi } from "uploadthing/server";
import { getSession } from "@/lib/auth/session";

const utapi = new UTApi();

function isUploadThingUrl(url: string): boolean {
    return url.includes("utfs.io") || url.includes("ufs.sh");
}

function extractUploadThingKey(fileUrl: string): string {
    const cleanUrl = fileUrl.split("?")[0];
    if (cleanUrl.includes("/f/")) {
        return cleanUrl.split("/f/")[1] || "";
    }
    const parts = cleanUrl.split("/");
    return parts[parts.length - 1] || "";
}

/**
 * Delete a single UploadThing file (authenticated users / admin).
 */
export async function deleteUploadThingFile(fileUrl: string) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return { success: false, error: "Unauthorized" };
        }

        if (!fileUrl || !isUploadThingUrl(fileUrl)) {
            return { success: false, error: "Not an UploadThing URL" };
        }

        const fileKey = extractUploadThingKey(fileUrl);
        if (!fileKey) {
            return { success: false, error: "Invalid file URL" };
        }

        await utapi.deleteFiles(fileKey);
        return { success: true };
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Failed to delete file";
        console.error("Error deleting file from UploadThing:", error);
        return { success: false, error: message };
    }
}

/**
 * Batch-delete UploadThing files (authenticated admin cleanup for deleted events/registrants).
 */
export async function deleteUploadThingFiles(fileUrls: string[]) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return { success: false, error: "Unauthorized" };
        }

        const keys = Array.from(
            new Set(
                fileUrls
                    .filter((u) => typeof u === "string" && isUploadThingUrl(u))
                    .map(extractUploadThingKey)
                    .filter(Boolean),
            ),
        );

        if (keys.length === 0) {
            return { success: true };
        }

        await utapi.deleteFiles(keys);
        return { success: true };
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Failed to delete files";
        console.error("Error batch-deleting files from UploadThing:", error);
        return { success: false, error: message };
    }
}

/**
 * Delete a temporary/replaced file uploaded by a public registrant before submission.
 */
export async function deletePublicUploadedFile(fileUrl: string) {
    try {
        if (!fileUrl || !isUploadThingUrl(fileUrl)) {
            return { success: false, error: "Invalid UploadThing URL" };
        }

        const fileKey = extractUploadThingKey(fileUrl);
        if (!fileKey) {
            return { success: false, error: "Invalid file key" };
        }

        await utapi.deleteFiles(fileKey);
        return { success: true };
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Failed to delete file";
        console.error("Error deleting public UploadThing file:", error);
        return { success: false, error: message };
    }
}
