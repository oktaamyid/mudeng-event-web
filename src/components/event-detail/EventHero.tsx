"use client";

import { EventData } from "@/data/events";
import {
    TextReveal,
    FadeSlideIn,
} from "@/components/ui/motion-primitives";

const slugOrder = ["ui-craft", "creative-craft", "mucrex"];

const localImageMap: Record<string, string> = {
    "ui-craft": "/event/assets/ui-craft.png",
    "creative-craft": "/event/assets/creative-craftt.png",
    "mucrex": "/event/assets/mucrexx.png",
};

// Badge labels per slug
const badgeLabelsMap: Record<string, string[]> = {
    "ui-craft": ["01", "UI/UX Design"],
    "creative-craft": ["02", "MotionCraft & VisioCraft"],
    "mucrex": ["03", "Show Case Karya & Talk Show"],
};

export default function EventHero({ event }: { event: any }) {
    const eventNumber = slugOrder.indexOf(event.slug) + 1;
    const displayNumber =
        eventNumber > 0
            ? eventNumber.toString().padStart(2, "0")
            : "01";

    const heroImage = localImageMap[event.slug] || event.imageUrl;
    const badgeLabels = badgeLabelsMap[event.slug] || [displayNumber, event.category || event.service];

    return (
        <section className="relative pt-[120px] pb-6 md:pt-[160px] md:pb-10" id="hero">
            {/* Background */}
            <img
                src="/event/assets/Background-Hero-Content.png"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div className="relative z-10 mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="mx-auto mb-8 md:mb-16 flex max-w-[800px] flex-col items-center text-center">
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
                </div>
            </div>

            {/* Hero Image */}
            <FadeSlideIn delay={0.3} className="relative z-10">
                <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                    <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[32px] h-[250px] sm:h-[400px] md:h-[650px]">
                        <img
                            src={heroImage}
                            alt={event.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </FadeSlideIn>
        </section>
    );
}
