import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://mudeng.unf.ac.id/event";
    
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/dashboard/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
