"use server";

import { db, ensureSchema } from "@/lib/db";
import { siteContent } from "@/db/schema";
import { getSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import {
    DEFAULT_ABOUT_CONTENT,
    DEFAULT_BENEFIT_CARDS,
    DEFAULT_HOME_FAQS,
    DEFAULT_TESTIMONIALS,
    DEFAULT_TESTIMONIALS_CONFIG,
    type BenefitCardItem,
    type HomeAboutContent,
    type HomeCmsContent,
    type HomeFaqItem,
    type TestimonialItem,
    type TestimonialsCmsConfig,
} from "@/lib/cms-defaults";

export type CmsSectionKey =
    | "home_benefits"
    | "home_testimonials"
    | "home_faqs"
    | "home_about";

/**
 * Fetch all Home CMS sections in a single query, with safe defaults.
 */
export async function getHomeCmsContent(): Promise<HomeCmsContent> {
    const defaults: HomeCmsContent = {
        benefits: DEFAULT_BENEFIT_CARDS,
        testimonials: DEFAULT_TESTIMONIALS_CONFIG,
        faqs: DEFAULT_HOME_FAQS,
        about: DEFAULT_ABOUT_CONTENT,
    };

    try {
        await ensureSchema();
        const rows = await db.select().from(siteContent);
        const byKey = new Map<string, unknown>(rows.map((r) => [r.key, r.data]));

        const benefits = byKey.get("home_benefits");
        const rawTestimonials = byKey.get("home_testimonials");
        const faqs = byKey.get("home_faqs");
        const about = byKey.get("home_about");

        let testimonials: TestimonialsCmsConfig = defaults.testimonials;
        if (Array.isArray(rawTestimonials) && rawTestimonials.length > 0) {
            testimonials = {
                ...defaults.testimonials,
                mode: "cards",
                items: rawTestimonials as TestimonialItem[],
            };
        } else if (
            rawTestimonials &&
            typeof rawTestimonials === "object" &&
            "mode" in rawTestimonials
        ) {
            const cfg = rawTestimonials as Partial<TestimonialsCmsConfig>;
            testimonials = {
                mode: cfg.mode === "cards" ? "cards" : "instagram",
                instagramUrl:
                    cfg.instagramUrl || defaults.testimonials.instagramUrl,
                items:
                    Array.isArray(cfg.items) && cfg.items.length > 0
                        ? cfg.items
                        : DEFAULT_TESTIMONIALS,
            };
        }

        return {
            benefits:
                Array.isArray(benefits) && benefits.length > 0
                    ? (benefits as BenefitCardItem[])
                    : defaults.benefits,
            testimonials,
            faqs:
                Array.isArray(faqs) && faqs.length > 0
                    ? (faqs as HomeFaqItem[])
                    : defaults.faqs,
            about:
                about &&
                typeof about === "object" &&
                Array.isArray((about as HomeAboutContent).stats) &&
                (about as HomeAboutContent).stats.length > 0
                    ? (about as HomeAboutContent)
                    : defaults.about,
        };
    } catch (error) {
        console.warn("Failed to fetch site_content, using defaults:", error);
        return defaults;
    }
}

/**
 * Upsert a single Home CMS section (Admin only).
 */
export async function updateHomeCmsSection(
    key: CmsSectionKey,
    data: unknown,
): Promise<{ success: boolean; error?: string }> {
    try {
        await ensureSchema();
        const session = await getSession();
        if (!session?.userId || session.role !== "admin") {
            return { success: false, error: "Unauthorized" };
        }

        await db
            .insert(siteContent)
            .values({
                key,
                data,
                updatedAt: new Date(),
            })
            .onConflictDoUpdate({
                target: siteContent.key,
                set: {
                    data,
                    updatedAt: new Date(),
                },
            });

        revalidatePath("/");
        revalidatePath("/admin/content");

        return { success: true };
    } catch (error) {
        console.error(`Failed to update CMS section ${key}:`, error);
        return { success: false, error: "Gagal menyimpan konten CMS." };
    }
}
