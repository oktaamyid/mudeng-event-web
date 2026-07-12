import Link from "next/link";
import { getEvents } from "../lib/actions/events";

export default async function Events() {
    const { data } = await getEvents();
    const events = data || [];

    const sortedEvents = [...events].sort((a, b) => {
        if (a.isFeatured === b.isFeatured) return 0;
        return a.isFeatured ? -1 : 1;
    });

    return (
        <section className="events section-spacing" id="events">
            <div className="container">
                <div className="events__header">
                    <h2 className="events__heading">
                        SELECTED EVENTS
                        <br />
                        CRAFTED WITH PURPOSE
                    </h2>
                    <p className="events__subtitle">
                        Ini adalah beberapa hasil nyata dari para peserta
                        <br />
                        yang telah mengikuti program kami sebelumnya.
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    {sortedEvents.map((evt, idx) => (
                        <div
                            key={idx}
                            className="group relative h-125 w-full overflow-hidden rounded-[32px] bg-[#0a0a0a] md:h-162.5"
                        >
                            <img
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={evt.imageUrl || ""}
                                alt={evt.title}
                            />

                            <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-87.5 bg-linear-to-b from-transparent via-black/95 to-black"></div>

                            <div
                                className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-87.5 backdrop-blur-[50px]"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.50) 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, transparent 0%, black 100%)",
                                    maskImage:
                                        "linear-gradient(to bottom, transparent 0%, black 100%)",
                                }}
                            ></div>

                            <div className="absolute top-6 left-6 z-30 max-w-112.5 md:top-9 md:left-9">
                                <div className="mb-5 flex items-center gap-2.5">
                                    <span className="font-body text-[39px] leading-11 font-medium text-white/60">
                                        {idx < 9 ? `0${idx + 1}` : idx + 1}
                                    </span>
                                    <h3 className="font-body text-[32px] leading-[34.56px] font-semibold text-white">
                                        {evt.title}
                                    </h3>
                                </div>
                                <p className="font-body mb-5 max-w-110 text-[15px] leading-[23.2px] font-medium text-white/85">
                                    {evt.description}
                                </p>
                                <Link
                                    href={`/${evt.slug}`}
                                    className="font-body inline-flex h-12.25 w-50 items-center justify-center rounded-[30px] bg-[#F8F9FA] text-[17px] leading-6.75 font-medium text-black shadow-[0px_6px_20px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] md:w-62.5"
                                >
                                    Event details
                                </Link>
                            </div>

                            <div className="absolute right-6 bottom-6 z-30 w-[calc(100%-48px)] md:right-9 md:bottom-9 md:w-167.5">
                                <div className="flex items-center justify-between py-1.75">
                                    <span className="font-body text-[15px] leading-6.75 font-medium text-white/70 md:text-[17px]">
                                        Timeline
                                    </span>
                                    <span className="font-body text-right text-[15px] leading-6.75 font-medium text-white md:text-[17px]">
                                        {evt.timeline}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-white/15"></div>
                                <div className="flex items-center justify-between py-1.75">
                                    <span className="font-body text-[15px] leading-6.75 font-medium text-white/70 md:text-[17px]">
                                        Service
                                    </span>
                                    <span className="font-body text-right text-[15px] leading-6.75 font-medium text-white md:text-[17px]">
                                        {evt.service}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-white/15"></div>
                                <div className="flex items-center justify-between py-1.75">
                                    <span className="font-body text-[15px] leading-6.75 font-medium text-white/70 md:text-[17px]">
                                        Project Kickoff
                                    </span>
                                    <span className="font-body text-right text-[15px] leading-6.75 font-medium text-white md:text-[17px]">
                                        {evt.kickoffDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
