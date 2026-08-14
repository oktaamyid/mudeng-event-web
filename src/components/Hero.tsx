"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    TextReveal,
    FadeSlideIn,
    FloatingBadge,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";
import SeamlessLoopVideo from "@/components/ui/SeamlessLoopVideo";

const springTransition = {
    type: "spring" as const,
    stiffness: 80,
    damping: 18,
};

export default function Hero({ event: activeEvent }: { event: any }) {
    const ctaLink = activeEvent ? `/${activeEvent.slug}/register` : "#events";

    return (
        <section
            className="relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden pt-25 pb-[60px] md:pt-[160px] md:pb-[100px]"
            id="hero"
        >
            <div className="absolute inset-0 z-0">
                <SeamlessLoopVideo
                    src="/event/videos/Background-Hero-Content.mp4"
                    className="relative h-full w-full"
                    videoClassName="object-[center_top]"
                />
            </div>

            {/* Floating Badges — Fade + Slide from different directions */}
            <div className="pointer-events-none absolute top-[40%] left-1/2 z-20 hidden h-[320px] w-[900px] -translate-x-1/2 -translate-y-1/2 lg:block">
                <FloatingBadge
                    className="absolute top-[10px] left-[30px] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]"
                    delay={0.5}
                    fromX={-40}
                    fromY={-20}
                    style={{ "--badge-rotate": "-10deg", animation: "hero-badge-float-1 5s ease-in-out infinite" } as React.CSSProperties}
                >
                    <Image
                        src="/event/assets/icon-eyes.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        8600
                    </span>
                </FloatingBadge>
                <FloatingBadge
                    className="absolute top-[200px] left-0 flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]"
                    delay={0.7}
                    fromX={-50}
                    fromY={20}
                    style={{ "--badge-rotate": "10deg", animation: "hero-badge-float-2 5s ease-in-out 0.5s infinite" } as React.CSSProperties}
                >
                    <Image
                        src="/event/assets/icon-heart.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        1520
                    </span>
                </FloatingBadge>
                <FloatingBadge
                    className="absolute top-[30px] right-0 flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]"
                    delay={0.6}
                    fromX={40}
                    fromY={-20}
                    style={{ "--badge-rotate": "10deg", animation: "hero-badge-float-1 5s ease-in-out 1s infinite" } as React.CSSProperties}
                >
                    <Image
                        src="/event/assets/icon-save.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        1160
                    </span>
                </FloatingBadge>
                <FloatingBadge
                    className="absolute top-[210px] right-[10px] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]"
                    delay={0.85}
                    fromX={50}
                    fromY={20}
                    style={{ "--badge-rotate": "-10deg", animation: "hero-badge-float-2 5s ease-in-out 1.5s infinite" } as React.CSSProperties}
                >
                    <Image
                        src="/event/assets/icon-chat.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        730
                    </span>
                </FloatingBadge>
            </div>

            {/* Text Content — TextReveal + FadeSlideIn */}
            <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
                <TextReveal
                    as="h1"
                    className="mb-4 sm:mb-6 font-['Anton'] text-[36px] leading-[38px] sm:text-[56px] sm:leading-[56px] md:text-[72px] md:leading-[72px] lg:text-[96px] lg:leading-[92.16px] tracking-[-1.5px] sm:tracking-[-2.5px] lg:tracking-[-3.84px] text-[#6849E1] uppercase"
                    onLoad
                >
                    {activeEvent?.title || "TAKE OVER THE TIMELINE"}
                </TextReveal>

                <FadeSlideIn delay={0.4} onLoad>
                    <p className="mx-auto mb-[30px] sm:mb-[60px] max-w-[692px] font-['Inter'] text-[15px] leading-[22px] sm:text-[18px] sm:leading-[24px] md:text-[24px] md:leading-[29.76px] font-medium tracking-[-0.48px] text-[#1A1A1A]/65">
                        {activeEvent?.subtitle ||
                            "Ikuti rangkaian pelatihan digital kreatif terbesar dari Multimedia Digital Engagement untuk kuasai keahlian masa depan."}
                    </p>
                </FadeSlideIn>

                <StaggerContainer
                    className="mb-[30px] sm:mb-[60px] flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:flex-row"
                    stagger={0.15}
                    delay={0.6}
                    onLoad
                >
                    <StaggerItem>
                        <Link
                            href={ctaLink}
                            className="bg-brand !text-white rounded-pill font-nav shadow-cta-btn flex w-full items-center justify-center px-10 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:w-auto"
                        >
                            Daftar Sekarang
                        </Link>
                    </StaggerItem>
                    <StaggerItem>
                        <Link
                            href="/#events"
                            className="bg-pill-bg text-btn-secondary-text rounded-pill font-nav flex w-full items-center justify-center px-10 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-black/10 md:w-auto"
                        >
                            Lihat Detail
                        </Link>
                    </StaggerItem>
                </StaggerContainer>
            </div>

            {/* Mobile — 2 Image Cards (overlapping) */}
            <div className="relative z-10 mx-auto flex items-center justify-center px-6 md:hidden">
                {[
                    {
                        src: "/event/assets/uiux1.png",
                        alt: "UI Craft",
                        rotate: -5,
                        delay: 0.5,
                        zIndex: 1,
                        offsetY: 8,
                    },
                    {
                        src: "/event/assets/mg1.png",
                        alt: "Motion Graphic",
                        rotate: 5,
                        delay: 0.65,
                        zIndex: 2,
                        offsetY: -8,
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        className="relative h-[160px] w-[160px] shrink-0 overflow-hidden rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:h-[200px] sm:w-[200px] sm:rounded-[28px]"
                        style={{
                            zIndex: card.zIndex,
                            marginLeft: i === 0 ? 0 : -24,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            rotate: card.rotate * 2,
                            y: card.offsetY,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: card.rotate,
                            y: card.offsetY,
                        }}
                        transition={{
                            ...springTransition,
                            duration: 1.0,
                            delay: card.delay,
                        }}
                    >
                        <Image
                            src={card.src}
                            alt={card.alt}
                            fill
                            sizes="(max-width: 640px) 160px, 200px"
                            style={{ objectFit: "cover" }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Tablet — 4 Image Cards (overlapping) */}
            <div className="relative z-10 mx-auto hidden items-center justify-center px-6 md:flex lg:hidden">
                {[
                    {
                        src: "/event/assets/uiux1.png",
                        alt: "UI Craft",
                        rotate: -5,
                        delay: 0.4,
                        zIndex: 1,
                        offsetY: 10,
                    },
                    {
                        src: "/event/assets/gd1.png",
                        alt: "Graphic Design",
                        rotate: 3,
                        delay: 0.55,
                        zIndex: 2,
                        offsetY: -6,
                    },
                    {
                        src: "/event/assets/pd1.png",
                        alt: "Photography",
                        rotate: -3,
                        delay: 0.7,
                        zIndex: 3,
                        offsetY: 8,
                    },
                    {
                        src: "/event/assets/vg1.png",
                        alt: "Videography",
                        rotate: 5,
                        delay: 0.85,
                        zIndex: 2,
                        offsetY: -10,
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                        style={{
                            zIndex: card.zIndex,
                            marginLeft: i === 0 ? 0 : -20,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            rotate: card.rotate * 2,
                            y: card.offsetY,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: card.rotate,
                            y: card.offsetY,
                        }}
                        transition={{
                            ...springTransition,
                            duration: 1.0,
                            delay: card.delay,
                        }}
                    >
                        <Image
                            src={card.src}
                            alt={card.alt}
                            fill
                            sizes="180px"
                            style={{ objectFit: "cover" }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Desktop — 4 Image Cards Fan-out */}
            <div className="relative z-10 mx-auto hidden h-[304px] w-full max-w-[1200px] lg:block">
                {[
                    {
                        src: "/event/assets/uiux1.png",
                        alt: "UI Craft",
                        className:
                            "absolute top-1/2 left-[calc(50%-300px-132px)] h-[264px] w-[264px] -translate-y-1/2 rotate-[-3deg] overflow-hidden rounded-[32px]",
                        delay: 0.4,
                        rotate: -8,
                        cardRotate: "-3deg",
                        animDelay: "0s",
                    },
                    {
                        src: "/event/assets/mg1.png",
                        alt: "Motion Graphic",
                        className:
                            "absolute top-[calc(50%-20px)] left-[calc(50%-100px-132px)] z-10 h-[264px] w-[264px] -translate-y-1/2 rotate-[3deg] overflow-hidden rounded-[32px]",
                        delay: 0.55,
                        rotate: 8,
                        cardRotate: "3deg",
                        animDelay: "0.5s",
                    },
                    {
                        src: "/event/assets/pd1.png",
                        alt: "Photography",
                        className:
                            "absolute top-[calc(50%+20px)] left-[calc(50%+100px-132px)] z-20 h-[264px] w-[264px] -translate-y-1/2 rotate-[-3deg] overflow-hidden rounded-[32px]",
                        delay: 0.7,
                        rotate: -8,
                        cardRotate: "-3deg",
                        animDelay: "1s",
                    },
                    {
                        src: "/event/assets/vg1.png",
                        alt: "Videography",
                        className:
                            "absolute top-1/2 left-[calc(50%+300px-132px)] z-30 h-[264px] w-[264px] -translate-y-1/2 rotate-[3deg] overflow-hidden rounded-[32px]",
                        delay: 0.85,
                        rotate: 8,
                        cardRotate: "3deg",
                        animDelay: "1.5s",
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        className={card.className}
                        style={{
                            "--card-rotate": card.cardRotate,
                            animation: `image-card-float 5s ease-in-out ${card.animDelay} infinite`,
                        } as React.CSSProperties}
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            rotate: card.rotate,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        transition={{
                            ...springTransition,
                            duration: 1.0,
                            delay: card.delay,
                        }}
                    >
                        <Image
                            src={card.src}
                            alt={card.alt}
                            fill
                            sizes="264px"
                            style={{ objectFit: "cover" }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
