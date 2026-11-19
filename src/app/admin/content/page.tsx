import { getHomeCmsContent } from "@/lib/actions/cms";
import { CmsClient } from "./CmsClient";

export default async function AdminContentPage() {
    const content = await getHomeCmsContent();
    return <CmsClient initialContent={content} />;
}
