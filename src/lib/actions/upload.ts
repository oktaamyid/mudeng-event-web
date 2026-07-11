"use server";

import { UTApi } from "uploadthing/server";
import { getSession } from "@/lib/auth/session";

const utapi = new UTApi();

export async function deleteUploadThingFile(fileUrl: string) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Extract file key from URL
        // Typically UploadThing URLs are like: https://utfs.io/f/FILE_KEY or https://...ufs.sh/f/FILE_KEY
        let fileKey = "";
        if (fileUrl.includes("/f/")) {
            fileKey = fileUrl.split("/f/")[1];
        } else {
            // Fallback for older formats or just in case
            const parts = fileUrl.split("/");
            fileKey = parts[parts.length - 1];
        }

        if (!fileKey) {
            return { success: false, error: "Invalid file URL" };
        }

        await utapi.deleteFiles(fileKey);
        
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting file from UploadThing:", error);
        return { success: false, error: error.message };
    }
}
