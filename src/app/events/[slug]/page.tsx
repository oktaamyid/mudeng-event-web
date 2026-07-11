import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEventBySlug, getEvents } from "@/lib/actions/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHero from "@/components/event-detail/EventHero";
import EventOverview from "@/components/event-detail/EventOverview";
import EventGallery from "@/components/event-detail/EventGallery";
import EventFAQ from "@/components/event-detail/EventFAQ";
import EventCTA from "@/components/event-detail/EventCTA";

export async function generateStaticParams() {
    const res = await getEvents();
    if (!res.success || !res.data) return [];
    return res.data.map((event) => ({
        slug: event.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const res = await getEventBySlug(resolvedParams.slug);

    if (!res.success || !res.data || res.data.status !== "PUBLISHED") {
        return {
            title: "Event Not Found",
        };
    }

    const event = res.data;
    const previousImages = event.imageUrl ? [event.imageUrl] : [];

    return {
        title: event.title,
        description: event.description || `Register for ${event.title}`,
        openGraph: {
            title: event.title,
            description: event.description || `Register for ${event.title}`,
            url: `https://mudeng.unf.ac.id/event/events/${event.slug}`,
            images: previousImages,
        },
        twitter: {
            card: "summary_large_image",
            title: event.title,
            description: event.description || `Register for ${event.title}`,
            images: previousImages,
        },
    };
}

export default async function EventDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const res = await getEventBySlug(resolvedParams.slug);

    if (!res.success || !res.data || res.data.status !== "PUBLISHED") {
        notFound();
    }

    const event = res.data;

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <EventHero event={event as any} />
                <EventOverview event={event as any} />
                <EventGallery event={event as any} />
                <EventFAQ faqs={(event.faqs as any) || []} />
                <EventCTA event={event as any} />
            </main>
            <Footer />
        </div>
    );
}
