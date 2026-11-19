"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
    TextReveal,
    FadeSlideIn,
} from "@/components/ui/motion-primitives";
import {
    DEFAULT_TESTIMONIALS,
    DEFAULT_TESTIMONIALS_CONFIG,
    type TestimonialsCmsConfig,
} from "@/lib/cms-defaults";

declare global {
    interface Window {
        instgrm?: {
            Embeds?: {
                process: () => void;
            };
        };
    }
}

function normalizeInstagramPermalink(rawUrl: string): string {
    const trimmed = rawUrl.trim();
    if (!trimmed) return "https://www.instagram.com/mudengsttnf/";
    const withProtocol = trimmed.startsWith("http")
        ? trimmed
        : `https://www.instagram.com/${trimmed.replace(/^@/, "")}/`;
    const clean = withProtocol.split("?")[0];
    return clean.endsWith("/") ? clean : `${clean}/`;
}

function extractHandle(url: string): string {
    const match = url.match(/instagram\.com\/([^/?#]+)/i);
    return match?.[1] ? `@${match[1]}` : "@mudengsttnf";
}

export default function Testimonials({
    config = DEFAULT_TESTIMONIALS_CONFIG,
}: {
    config?: TestimonialsCmsConfig;
}) {
    const mode = config?.mode || "instagram";
    const instagramUrl = normalizeInstagramPermalink(
        config?.instagramUrl || DEFAULT_TESTIMONIALS_CONFIG.instagramUrl,
    );
    const handle = extractHandle(instagramUrl);
    const testimonials =
        config?.items && config.items.length > 0
            ? config.items
            : DEFAULT_TESTIMONIALS;

    const [activeCard, setActiveCard] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");

    const CARD_HEIGHT = isMobile ? 200 : isTablet ? 220 : 260;
    const CARD_GAP = isMobile ? 20 : isTablet ? 28 : 35;

    const nextCard = useCallback(() => {
        setActiveCard((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        if (mode !== "cards" || isPaused) return;
        const interval = setInterval(nextCard, 3000);
        return () => clearInterval(interval);
    }, [mode, isPaused, nextCard]);

    useEffect(() => {
        if (mode !== "instagram") return;

        if (window.instgrm?.Embeds) {
            window.instgrm.Embeds.process();
            return;
        }

        const existingScript = document.querySelector(
            'script[src="https://www.instagram.com/embed.js"]',
        );
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = () => {
                window.instgrm?.Embeds?.process();
            };
            document.body.appendChild(script);
        } else {
            existingScript.addEventListener("load", () => {
                window.instgrm?.Embeds?.process();
            });
        }
    }, [mode, instagramUrl]);

    return (
        <section className="testimonials section-spacing" id="testimonials">
            <div className="container">
                <div className="testimonials__heading">
                    <TextReveal as="h2" className="heading-h2">
                        {"Real stories"}
                        {<br />}
                        {"from creators"}
                    </TextReveal>
                </div>

                {mode === "instagram" ? (
                    <div className="relative mx-auto max-w-[560px]">
                        <img
                            src="/event/assets/icon-arrow.png"
                            alt=""
                            className="pointer-events-none absolute -top-4 left-0 z-10 w-[56px] opacity-70 sm:-top-6 sm:-left-10 sm:w-[76px]"
                            style={{ animation: "deco-float-1 5s ease-in-out infinite" }}
                        />
                        <img
                            src="/event/assets/icon-cling.png"
                            alt=""
                            className="pointer-events-none absolute -top-2 right-0 z-10 w-[48px] opacity-70 sm:-top-4 sm:-right-8 sm:w-[66px]"
                            style={{ animation: "deco-float-2 5s ease-in-out infinite" }}
                        />

                        <FadeSlideIn delay={0.1}>
                            <div className="flex flex-col items-center">
                                <div className="w-full overflow-hidden rounded-[20px] border border-black/5 bg-white p-2 shadow-[0_16px_48px_-4px_rgba(26,26,26,0.12)] sm:p-3">
                                    <blockquote
                                        className="instagram-media"
                                        data-instgrm-permalink={`${instagramUrl}?utm_source=ig_embed&utm_campaign=loading`}
                                        data-instgrm-version="14"
                                        style={{
                                            background: "#FFF",
                                            border: 0,
                                            borderRadius: "12px",
                                            margin: "0 auto",
                                            maxWidth: "540px",
                                            minWidth: "280px",
                                            padding: 0,
                                            width: "100%",
                                        }}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                                            <p className="font-body text-text-muted text-sm font-medium">
                                                Memuat postingan terbaru dari{" "}
                                                <span className="text-text-main font-semibold">
                                                    {handle}
                                                </span>
                                                ...
                                            </p>
                                            <a
                                                href={instagramUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-body inline-flex items-center gap-1.5 rounded-full bg-[#6849E1] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#5738CC]"
                                            >
                                                Lihat di Instagram ({handle})
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </a>
                                        </div>
                                    </blockquote>
                                </div>

                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-body text-text-muted hover:text-brand mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                                >
                                    Ikuti keseruan lainnya di {handle}
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </FadeSlideIn>
                    </div>
                ) : (
                    <>
                        {/* Card stack + decorative icons */}
                        <div
                            className="relative mx-auto"
                            style={{
                                height:
                                    CARD_HEIGHT +
                                    (testimonials.length - 1) * CARD_GAP,
                                maxWidth: 600,
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Decorative icons — continuous bobbing animation */}
                            <img
                                src="/event/assets/icon-arrow.png"
                                alt=""
                                className="pointer-events-none absolute -top-4 left-2 z-50 w-[60px] opacity-70 sm:-top-6 sm:-left-12 sm:w-[80px]"
                                style={{
                                    animation:
                                        "deco-float-1 5s ease-in-out infinite",
                                }}
                            />
                            <img
                                src="/event/assets/icon-cling.png"
                                alt=""
                                className="pointer-events-none absolute -top-2 right-6 z-50 w-[50px] opacity-70 sm:-top-4 sm:right-4 sm:w-[70px]"
                                style={{
                                    animation:
                                        "deco-float-2 5s ease-in-out infinite",
                                }}
                            />

                            {/* Cards */}
                            <FadeSlideIn className="relative h-full w-full">
                                {testimonials.map((t, i) => {
                                    const offset =
                                        (i - activeCard + testimonials.length) %
                                        testimonials.length;
                                    const scale = 1 - offset * 0.04;
                                    const translateY = offset * CARD_GAP;
                                    const zIndex = testimonials.length - offset;
                                    const opacity = offset > 3 ? 0 : 1;

                                    return (
                                        <motion.div
                                            key={i}
                                            className="absolute inset-x-0 cursor-pointer overflow-hidden rounded-[20px] shadow-[0_12px_40px_rgba(26,26,26,0.08)] sm:rounded-[28px]"
                                            initial={false}
                                            animate={{
                                                y: translateY,
                                                scale,
                                                opacity,
                                                zIndex,
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            style={{
                                                height: CARD_HEIGHT,
                                                backgroundColor: t.bgColor,
                                            }}
                                            onClick={nextCard}
                                        >
                                            <div className="flex h-full flex-col justify-between p-5 sm:p-7 md:p-8">
                                                {/* Quote icon */}
                                                <div>
                                                    <svg
                                                        className="mb-3 h-6 w-6 text-[#6849E1]/20 sm:mb-4 sm:h-8 sm:w-8"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                                    </svg>
                                                    <p className="font-body text-text-main text-[14px] leading-[22px] font-medium sm:text-[16px] sm:leading-[26px] md:text-[17px] md:leading-[28px]">
                                                        &ldquo;{t.text}&rdquo;
                                                    </p>
                                                </div>

                                                {/* Author */}
                                                <div className="mt-3 flex items-center gap-3 sm:mt-4">
                                                    <div className="h-9 w-9 flex-none overflow-hidden rounded-full sm:h-10 sm:w-10">
                                                        <img
                                                            src={t.avatar}
                                                            alt={t.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-body text-text-main text-[14px] font-semibold sm:text-[15px]">
                                                        {t.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </FadeSlideIn>
                        </div>

                        {/* Dot indicators */}
                        <div className="mt-6 flex items-center justify-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeCard === i
                                            ? "w-6 bg-[#6849E1]"
                                            : "w-2 bg-[#6849E1]/20"
                                    }`}
                                    onClick={() => setActiveCard(i)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
