"use client";

import Link from "next/link";
import {
    TextReveal,
    FadeSlideIn,
} from "@/components/ui/motion-primitives";

interface EventItem {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    timeline: string | null;
    service: string | null;
    kickoffDate: string | null;
    isFeatured: boolean;
    [key: string]: any;
}

export default function EventsAnimated({ events }: { events: EventItem[] }) {
    const localImageMap: Record<string, string> = {
        "ui-craft": "/event/assets/ui-craft.png",
        "creative-craft": "/event/assets/creative-craftt.png",
        "mucrex": "/event/assets/mucrexx.png",
    };

    const getEventImage = (evt: EventItem) =>
        localImageMap[evt.slug] || evt.imageUrl || undefined;

    return (
        <section className="events section-spacing" id="events">
            <div className="container">
                <div className="events__header">
                    <TextReveal as="h2" className="events__heading">
                        {"SELECTED EVENTS"}
                        {<br />}
                        {"CRAFTED WITH PURPOSE"}
                    </TextReveal>
                    <FadeSlideIn delay={0.15}>
                        <p className="events__subtitle">
                            Ini adalah beberapa hasil nyata dari para peserta
                            <br />
                            yang telah mengikuti program kami sebelumnya.
                        </p>
                    </FadeSlideIn>
                </div>
            </div>

            {/* Stacking cards — NO overflow-hidden on this wrapper */}
            <section className="relative mx-auto max-w-[1280px] px-4 sm:px-5 md:px-8 lg:px-10">
                {events.map((evt, idx) => (
                    <div
                        key={evt.id || idx}
                        className="sticky top-[70px] sm:top-[80px] md:top-[100px] h-[75vh] sm:h-[85vh] md:h-screen flex items-start justify-center"
                        style={{ zIndex: idx + 1 }}
                    >
                        {/* Inner card — overflow-hidden ONLY here for rounded corners */}
                        <div
                            className="w-full rounded-[16px] sm:rounded-[20px] md:rounded-[32px] overflow-hidden relative group"
                            style={{
                                height: "clamp(340px, calc(100vh - 120px), 650px)",
                                boxShadow: "0 -2px 20px rgba(0,0,0,0.15), 0 20px 60px rgba(0,0,0,0.35)",
                            }}
                        >
                            {/* Background image */}
                            <img
                                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                                    evt.slug === "mucrex"
                                        ? "object-center"
                                        : "object-[75%_center] sm:object-[70%_center] md:object-right lg:object-center"
                                }`}
                                src={getEventImage(evt)}
                                alt={evt.title}
                            />

                            {/* Dark gradient overlay */}
                            <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-[280px] sm:h-87.5 bg-linear-to-b from-transparent via-black/95 to-black" />

                            {/* Blur overlay */}
                            <div
                                className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[280px] sm:h-87.5 backdrop-blur-[50px]"
                                style={{
                                    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.50) 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
                                    maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
                                }}
                            />

                            {/* Top-left content */}
                            <div className="absolute top-4 left-4 z-30 max-w-[calc(100%-32px)] sm:max-w-112.5 sm:top-6 sm:left-6 md:top-9 md:left-9">
                                <div className="mb-3 sm:mb-5 flex items-center gap-2 sm:gap-2.5">
                                    <span className="font-body text-[24px] leading-8 sm:text-[39px] sm:leading-11 font-medium text-white/60">
                                        {idx < 9 ? `0${idx + 1}` : idx + 1}
                                    </span>
                                    <h3 className="font-body text-[22px] leading-[26px] sm:text-[32px] sm:leading-[34.56px] font-semibold text-white">
                                        {evt.title}
                                    </h3>
                                </div>
                                <p className="font-body mb-3 sm:mb-5 max-w-110 text-[13px] leading-[20px] sm:text-[15px] sm:leading-[23.2px] font-medium text-white/85">
                                    {evt.description}
                                </p>
                                <Link
                                    href={`/${evt.slug}`}
                                    scroll={true}
                                    className="font-body inline-flex h-10 sm:h-12.25 w-auto px-6 sm:w-50 items-center justify-center rounded-full bg-[#F8F9FA] text-[14px] sm:text-[17px] leading-6.75 font-medium text-black shadow-[0px_6px_20px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] md:w-62.5"
                                >
                                    Event details
                                </Link>
                            </div>

                            {/* Bottom-right info strip */}
                            <div className="absolute right-4 bottom-4 left-4 z-30 sm:right-6 sm:bottom-6 sm:left-6 md:right-9 md:bottom-9 md:left-auto md:w-[calc(100%-72px)] lg:w-167.5">
                                <div className="flex items-center justify-between py-1.75">
                                    <span className="font-body text-[13px] sm:text-[15px] leading-6.75 font-medium text-white/70 md:text-[17px]">
                                        Timeline
                                    </span>
                                    <span className="font-body text-right text-[13px] sm:text-[15px] leading-6.75 font-medium text-white md:text-[17px]">
                                        {evt.timeline}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-white/15" />
                                <div className="flex items-center justify-between py-1.75">
                                    <span className="font-body text-[13px] sm:text-[15px] leading-6.75 font-medium text-white/70 md:text-[17px]">
                                        Service
                                    </span>
                                    <span className="font-body text-right text-[13px] sm:text-[15px] leading-6.75 font-medium text-white md:text-[17px]">
                                        {evt.service}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-white/15" />
                                <div className="flex items-center justify-between py-1.75">
                                    <span className="font-body text-[13px] sm:text-[15px] leading-6.75 font-medium text-white/70 md:text-[17px]">
                                        Project Kickoff
                                    </span>
                                    <span className="font-body text-right text-[13px] sm:text-[15px] leading-6.75 font-medium text-white md:text-[17px]">
                                        {evt.kickoffDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}
