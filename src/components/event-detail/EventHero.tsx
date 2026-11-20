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
        <section
            className="relative flex min-h-[440px] flex-col justify-end overflow-hidden pt-[110px] pb-8 sm:min-h-[500px] sm:pb-10 md:min-h-[560px] md:pt-[140px] md:pb-12"
            id="hero"
        >
            {/* Background */}
            {heroImage ? (
                <div className="pointer-events-none absolute inset-0">
                    <img
                        src={heroImage}
                        alt={event.title}
                        className="h-full w-full object-cover object-center"
                    />
                    {/* Subtle top scrim for floating navbar legibility */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
                    {/* Bottom transition gradient to solid white for text contrast and seamless section blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white from-15% via-white/85 via-45% to-transparent" />
                </div>
            ) : (
                <div className="pointer-events-none absolute inset-0">
                    <SeamlessLoopVideo
                        src="/event/videos/Background-Hero-Content.mp4"
                        className="h-full w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                </div>
            )}

            <div className="relative z-10 mx-auto w-full max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
                    {/* Badges */}
                    <FadeSlideIn delay={0}>
                        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-[#F0EDFA]/95 py-1.5 pr-4 pl-1.5 shadow-xs backdrop-blur-xs sm:mb-6 sm:gap-3 sm:pr-5">
                            <div className="font-body flex h-7 w-7 items-center justify-center rounded-full bg-[#6849E1] text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                                {badgeLabels[0]}
                            </div>
                            <span className="font-body text-[13px] font-medium text-[#1A1A1A]/75 sm:text-[15px]">
                                {badgeLabels[1]}
                            </span>
                        </div>
                    </FadeSlideIn>

                    <TextReveal
                        as="h1"
                        className="font-display text-brand mb-3 text-[38px] leading-[40px] font-normal tracking-tight uppercase sm:text-[52px] sm:leading-[54px] md:mb-4 md:text-[76px] md:leading-[78px] lg:text-[92px] lg:leading-[94px]"
                    >
                        {event.title}
                    </TextReveal>

                    <FadeSlideIn delay={0.2}>
                        <p className="font-body mx-auto max-w-[600px] text-[15px] leading-[23px] font-medium tracking-[-0.3px] text-[#1A1A1A]/75 sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px] md:tracking-[-0.36px]">
                            {event.subtitle || event.description}
                        </p>
                    </FadeSlideIn>

                    <FadeSlideIn delay={0.3} className="mt-6 w-full sm:w-auto">
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
        </section>
    );
}
