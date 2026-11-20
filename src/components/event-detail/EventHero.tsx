"use client";

import Link from "next/link";
import {
    TextReveal,
    FadeSlideIn,
} from "@/components/ui/motion-primitives";
import SeamlessLoopVideo from "@/components/ui/SeamlessLoopVideo";

const slugOrder = ["ui-craft", "creative-craft", "mucrex"];

const localImageMap: Record<string, string> = {
    "ui-craft": "/event/assets/ui-craft.png",
    "creative-craft": "/event/assets/creative-craftt.png",
    "mucrex": "/event/assets/mucrexx.png",
};

export default function EventHero({ event }: { event: any }) {
    const eventNumber = slugOrder.indexOf(event.slug) + 1;
    const displayNumber =
        eventNumber > 0
            ? eventNumber.toString().padStart(2, "0")
            : "01";

    const heroImage = event.imageUrl || localImageMap[event.slug];
    const badgeLabels = [
        displayNumber,
        event.category || event.service || "Event",
    ];

    return (
        <section className="relative pt-[120px] pb-6 md:pt-[160px] md:pb-10" id="hero">
            {/* Background */}
            <SeamlessLoopVideo
                src="/event/videos/Background-Hero-Content.mp4"
                className="pointer-events-none absolute inset-0 h-full w-full"
            />

            <div className="relative z-10 mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="mx-auto mb-8 flex max-w-[800px] flex-col items-center text-center md:mb-12">
                    {/* Badges */}
                    <FadeSlideIn delay={0}>
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-[#F0EDFA] py-1.5 pr-5 pl-1.5">
                            <div className="font-body flex h-8 w-8 items-center justify-center rounded-full bg-[#6849E1] text-sm font-bold text-white">
                                {badgeLabels[0]}
                            </div>
                            <span className="font-body text-[#1A1A1A]/65 text-[15px] font-medium">
                                {badgeLabels[1]}
                            </span>
                        </div>
                    </FadeSlideIn>

                    <TextReveal as="h1" className="font-display text-brand mb-4 md:mb-6 text-[36px] leading-[38px] font-normal tracking-tight uppercase sm:text-[50px] sm:leading-[52px] md:text-[80px] md:leading-[80px] lg:text-[100px] lg:leading-[100px]">
                        {event.title}
                    </TextReveal>

                    <FadeSlideIn delay={0.2}>
                        <p className="font-body mx-auto max-w-[600px] text-[16px] leading-[24px] font-medium tracking-[-0.32px] text-[#1A1A1A]/65 md:text-[18px] md:leading-[27px] md:tracking-[-0.36px]">
                            {event.subtitle || event.description}
                        </p>
                    </FadeSlideIn>

                    <FadeSlideIn delay={0.25} className="mt-6 w-full sm:w-auto">
                        {event.isRegistrationOpen !== false ? (
                            <Link
                                href={`/${event.slug}/register`}
                                className="font-body inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#6849E1] px-7 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#5738CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6849E1] focus-visible:ring-offset-2 sm:w-auto"
                            >
                                Daftar Sekarang
                            </Link>
                        ) : (
                            <span className="font-body inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#F4F4F5] px-7 py-3 text-sm font-semibold text-[#52525B] sm:w-auto">
                                Pendaftaran Ditutup
                            </span>
                        )}
                    </FadeSlideIn>
                </div>
            </div>

            {/* Hero Image */}
            <FadeSlideIn delay={0.3} className="relative z-10">
                <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                    <div className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[32px] h-[250px] sm:h-[400px] md:h-[650px]">
                        {heroImage ? (
                            <img
                                src={heroImage}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6849E1] to-[#7C7AEA] p-6 sm:p-12 text-center shadow-inner">
                                <h2 className="font-['Anton'] text-[40px] leading-tight text-white/90 sm:text-[60px] md:text-[80px]">
                                    {event.title}
                                </h2>
                            </div>
                        )}
                    </div>
                </div>
            </FadeSlideIn>
        </section>
    );
}
