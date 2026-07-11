import { MetadataRoute } from "next";
import { getEvents } from "@/lib/actions/events";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://mudeng.nurulfikri.ac.id/event";

    // Standard static routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
    ];

    // Fetch dynamic event routes
    const res = await getEvents();
    if (res.success && res.data) {
        const events = res.data.filter((e) => e.status === "PUBLISHED");
        const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
            url: `${baseUrl}/events/${event.slug}`,
            lastModified: new Date(event.createdAt || new Date()),
            changeFrequency: "weekly",
            priority: 0.8,
        }));
        
        routes.push(...eventRoutes);
    }

    return routes;
}
