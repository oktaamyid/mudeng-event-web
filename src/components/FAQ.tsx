"use client";

import { useState, useCallback } from "react";
import {
    TextReveal,
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

import {
    DEFAULT_HOME_FAQS,
    type HomeFaqItem,
} from "@/lib/cms-defaults";

export default function FAQ({
    items = DEFAULT_HOME_FAQS,
}: {
    items?: HomeFaqItem[];
}) {
    const faqItems = items.length > 0 ? items : DEFAULT_HOME_FAQS;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleItem = useCallback((index: number | null) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    }, []);

    return (
        <section className="section-spacing pb-32" id="faq">
            <div className="container max-w-[700px]">
                <TextReveal as="h2" className="heading-h2 mb-10 text-center">
                    {"Let's clear a few things up"}
                </TextReveal>

                <StaggerContainer
                    className="flex flex-col items-center space-y-3"
                    stagger={0.08}
                >
                    {faqItems.map((item: any, i: number) => (
                        <StaggerItem key={i} className="w-full flex justify-center">
                            <div
                                className={`bg-nav-outer border-divider w-[560px] max-w-full overflow-hidden border transition-all ${
                                    activeIndex === i
                                        ? "rounded-[20px]"
                                        : "rounded-[20px]"
                                }`}
                            >
                                <button
                                    className="flex min-h-[56px] sm:min-h-[70px] w-full items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3 text-left focus:outline-none"
                                    onClick={() => toggleItem(i)}
                                >
                                    <span className="text-text-main pr-2 text-[15px] sm:text-[18px]">
                                        {item.question}
                                    </span>
                                    <div
                                        className={`bg-brand flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-transform ${activeIndex === i ? "rotate-45" : ""}`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="14"
                                            height="14"
                                            className="fill-white"
                                        >
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                        </svg>
                                    </div>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        activeIndex === i
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-text-muted px-4 pb-4 sm:px-6 text-[13px] sm:text-[15px]">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
