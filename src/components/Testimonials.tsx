"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
    TextReveal,
    FadeSlideIn,
} from "@/components/ui/motion-primitives";

const testimonials = [
    {
        text: "Dulu bingung bikin layout web. Setelah ikut kelas UI Craft, sekarang paham workflow riset user sampai bikin komponen matang di Figma",
        name: "Bayu",
        avatar: "https://ui-avatars.com/api/?background=6849E1&color=fff&name=Bayu",
        bgColor: "#FFFFFF",
    },
    {
        text: "Materinya daging banget! Membuka mata tentang pentingnya komposisi grid dan psikologi warna untuk branding.",
        name: "Raihan",
        avatar: "https://ui-avatars.com/api/?background=4A7CF7&color=fff&name=Raihan",
        bgColor: "#E0F0FF",
    },
    {
        text: "Event multimedia paling worth it! Gabungan materi UI Craft dan teknik visual lainnya jadi modal kuat buat nyusun portofolio pertama.",
        name: "Siti",
        avatar: "https://ui-avatars.com/api/?background=7C7AEA&color=fff&name=Siti",
        bgColor: "#EDE5FF",
    },
    {
        text: "Sesi Videography seru parah! Trik angle dinamis dan dasar editing video dikupas habis, sangat mudah dipahami pemula.",
        name: "Nurul H.",
        avatar: "https://ui-avatars.com/api/?background=5B6DEA&color=fff&name=Nurul+H.",
        bgColor: "#FFFFFF",
    },
    {
        text: "Belajar segitiga eksposur dan teknik komposisi di sini sangat membantu. Hasil foto produk saya sekarang jauh lebih estetik dan profesional!",
        name: "Zahra F.",
        avatar: "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Zahra+F.",
        bgColor: "#E0F0FF",
    },
];

export default function Testimonials() {
    const [activeCard, setActiveCard] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");

    const CARD_HEIGHT = isMobile ? 200 : isTablet ? 220 : 260;
    const CARD_GAP = isMobile ? 20 : isTablet ? 28 : 35;

    const nextCard = useCallback(() => {
        setActiveCard((prev) => (prev + 1) % testimonials.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextCard, 3000);
        return () => clearInterval(interval);
    }, [isPaused, nextCard]);

    return (
        <section className="testimonials section-spacing" id="testimonials">
            <div className="container">
                <div className="testimonials__heading">
                    <TextReveal
                        as="h2"
                        className="heading-h2"
                    >
                        {"Real stories"}
                        {<br />}
                        {"from creators"}
                    </TextReveal>
                </div>

                {/* Sticky Card Stack */}
                <FadeSlideIn delay={0.2}>
                    <div
                        className="relative mx-auto"
                        style={{
                            height: CARD_HEIGHT + (testimonials.length - 1) * CARD_GAP,
                            maxWidth: 600,
                        }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Decorative icons */}
                        <img
                            src="/event/assets/icon-arrow.png"
                            alt=""
                            className="pointer-events-none absolute -top-4 left-2 z-50 w-[60px] rotate-[15deg] opacity-70 sm:-left-12 sm:-top-6 sm:w-[80px]"
                        />
                        <img
                            src="/event/assets/icon-cling.png"
                            alt=""
                            className="pointer-events-none absolute -top-2 right-6 z-50 w-[50px] rotate-[15deg] opacity-70 sm:-top-4 sm:right-4 sm:w-[70px]"
                        />
                        {testimonials.map((t, i) => {
                            const pos = (i - activeCard + testimonials.length) % testimonials.length;
                            // pos 0 = front, 1 = behind, 2 = further behind

                            return (
                                <motion.div
                                    key={i}
                                    className="absolute left-0 right-0 cursor-pointer overflow-hidden rounded-[16px] sm:rounded-[24px] shadow-xl"
                                    animate={{
                                        top: (testimonials.length - 1 - pos) * CARD_GAP,
                                        zIndex: testimonials.length - pos,
                                        scale: 1 - pos * 0.03,
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
                                                className="mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-[#6849E1]/20"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                            </svg>
                                            <p className="font-body text-text-main text-[14px] leading-[22px] sm:text-[16px] sm:leading-[26px] md:text-[17px] md:leading-[28px] font-medium">
                                                &ldquo;{t.text}&rdquo;
                                            </p>
                                        </div>

                                        {/* Author */}
                                        <div className="flex items-center gap-3 mt-3 sm:mt-4">
                                            <div className="h-9 w-9 sm:h-10 sm:w-10 flex-none overflow-hidden rounded-full">
                                                <img
                                                    src={t.avatar}
                                                    alt={t.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <span className="font-body text-text-main text-[14px] sm:text-[15px] font-semibold">
                                                {t.name}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </FadeSlideIn>

                {/* Dot indicators */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${activeCard === i
                                    ? "w-6 bg-[#6849E1]"
                                    : "w-2 bg-[#6849E1]/20"
                                }`}
                            onClick={() => setActiveCard(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
