import { notFound } from "next/navigation";
import { eventsData } from "@/data/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHero from "@/components/event-detail/EventHero";
import EventOverview from "@/components/event-detail/EventOverview";
import EventGallery from "@/components/event-detail/EventGallery";
import EventFAQ from "@/components/event-detail/EventFAQ";
import EventCTA from "@/components/event-detail/EventCTA";

export function generateStaticParams() {
  return Object.keys(eventsData).map((slug) => ({
    slug: slug,
  }));
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const event = eventsData[resolvedParams.slug];

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <EventHero event={event} />
        <EventOverview event={event} />
        <EventGallery event={event} />
        <EventFAQ />
        <EventCTA />
      </main>
      <Footer />
    </div>
  );
}
