import Link from "next/link";
import { getEvents } from "../lib/actions/events";
import EventsAnimated from "./EventsAnimated";

export default async function Events() {
    const { data } = await getEvents();
    const events = (data || []).filter(e => e.status === "PUBLISHED");

    const slugOrder = ["ui-craft", "creative-craft", "mucrex"];
    const sortedEvents = [...events].sort((a, b) => {
        const aIdx = slugOrder.indexOf(a.slug);
        const bIdx = slugOrder.indexOf(b.slug);
        return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
    });

    return <EventsAnimated events={sortedEvents} />;
}
