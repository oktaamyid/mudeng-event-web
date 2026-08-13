"use client";

import {
    TextReveal,
    FadeSlideIn,
    ScaleIn,
    FloatingBadge,
} from "@/components/ui/motion-primitives";

const floatingBadges = [
    {
        icon: "/event/assets/icon-eyes.png",
        value: "8600",
        position: "top-[10px] left-[calc(50%-30px)]",
        rotate: "rotate-[-2deg]",
        delay: 0.2,
        fromX: 0,
        fromY: -20,
    },
    {
        icon: "/event/assets/icon-chat.png",
        value: "730",
        position: "top-[50px] left-[calc(50%-480px)]",
        rotate: "rotate-[6deg]",
        delay: 0.35,
        fromX: -25,
        fromY: -10,
    },
    {
        icon: "/event/assets/icon-heart.png",
        value: "1520",
        position: "top-[70px] right-[calc(50%-480px)]",
        rotate: "rotate-[-4deg]",
        delay: 0.3,
        fromX: 25,
        fromY: -10,
    },
    {
        icon: "/event/assets/icon-jari.png",
        value: "2470",
        position: "top-[190px] left-[calc(50%-490px)]",
        rotate: "rotate-[5deg]",
        delay: 0.5,
        fromX: -25,
        fromY: 10,
    },
    {
        icon: "/event/assets/icon-share.png",
        value: "410",
        position: "top-[210px] left-[calc(50%-20px)]",
        rotate: "rotate-[-3deg]",
        delay: 0.45,
        fromX: 0,
        fromY: 15,
    },
    {
        icon: "/event/assets/icon-save.png",
        value: "1160",
        position: "top-[190px] right-[calc(50%-500px)]",
        rotate: "rotate-[4deg]",
        delay: 0.55,
        fromX: 25,
        fromY: 10,
    },
];

export default function Preview() {
    return (
        <section className="preview section-spacing relative" id="preview">
            {/* Floating Badges - Mobile/Tablet (< lg) — spread across entire section */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-visible lg:hidden">
                {/* 8600 - top area, center-right */}
                <FloatingBadge className="absolute top-[20px] right-[15%] flex h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_8px_10px_rgba(26,26,26,0.08)]" delay={0.2} fromX={5} fromY={-20} style={{ "--badge-rotate": "-3deg", animation: "hero-badge-float-1 5s ease-in-out infinite" } as React.CSSProperties}>
                    <img src="/event/assets/icon-eyes.png" alt="" width="12" height="12" />
                    <span className="text-[12px] font-medium text-[#1A1A1A]/65">8600</span>
                </FloatingBadge>
                {/* 730 - upper left */}
                <FloatingBadge className="absolute top-[8%] left-[4%] flex h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_8px_10px_rgba(26,26,26,0.08)]" delay={0.4} fromX={-20} fromY={-8} style={{ "--badge-rotate": "7deg", animation: "hero-badge-float-2 5s ease-in-out 0.4s infinite" } as React.CSSProperties}>
                    <img src="/event/assets/icon-chat.png" alt="" width="12" height="12" />
                    <span className="text-[12px] font-medium text-[#1A1A1A]/65">730</span>
                </FloatingBadge>
                {/* 1520 - right side, mid height */}
                <FloatingBadge className="absolute top-[30%] right-[3%] flex h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_8px_10px_rgba(26,26,26,0.08)]" delay={0.3} fromX={18} fromY={-5} style={{ "--badge-rotate": "-5deg", animation: "hero-badge-float-1 5s ease-in-out 0.8s infinite" } as React.CSSProperties}>
                    <img src="/event/assets/icon-heart.png" alt="" width="12" height="12" />
                    <span className="text-[12px] font-medium text-[#1A1A1A]/65">1520</span>
                </FloatingBadge>
                {/* 2470 - left side, below video */}
                <FloatingBadge className="absolute bottom-[12%] left-[5%] flex h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_8px_10px_rgba(26,26,26,0.08)]" delay={0.55} fromX={-18} fromY={12} style={{ "--badge-rotate": "4deg", animation: "hero-badge-float-2 5s ease-in-out 1.2s infinite" } as React.CSSProperties}>
                    <img src="/event/assets/icon-jari.png" alt="" width="12" height="12" />
                    <span className="text-[12px] font-medium text-[#1A1A1A]/65">2470</span>
                </FloatingBadge>
                {/* 410 - bottom center area */}
                <FloatingBadge className="absolute bottom-[10%] left-[45%] flex h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_8px_10px_rgba(26,26,26,0.08)]" delay={0.45} fromX={8} fromY={15} style={{ "--badge-rotate": "-2deg", animation: "hero-badge-float-1 5s ease-in-out 1.6s infinite" } as React.CSSProperties}>
                    <img src="/event/assets/icon-share.png" alt="" width="12" height="12" />
                    <span className="text-[12px] font-medium text-[#1A1A1A]/65">410</span>
                </FloatingBadge>
                {/* 1160 - right side, lower */}
                <FloatingBadge className="absolute bottom-[18%] right-[8%] flex h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_8px_10px_rgba(26,26,26,0.08)]" delay={0.5} fromX={15} fromY={10} style={{ "--badge-rotate": "5deg", animation: "hero-badge-float-2 5s ease-in-out 2s infinite" } as React.CSSProperties}>
                    <img src="/event/assets/icon-save.png" alt="" width="12" height="12" />
                    <span className="text-[12px] font-medium text-[#1A1A1A]/65">1160</span>
                </FloatingBadge>
            </div>

            <div className="container">
                {/* Heading with floating badges */}
                <div className="relative mx-auto" style={{ maxWidth: 960 }}>
                    {/* Floating Badges - positioned relative to heading */}
                    {/* Floating Badges - Desktop (lg+) */}
                    <div className="pointer-events-none absolute inset-0 z-20 hidden overflow-visible lg:block">
                        {/* 8600 - top center */}
                        <FloatingBadge className="absolute -top-[35px] left-[42%] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]" delay={0.2} fromX={0} fromY={-20} style={{ "--badge-rotate": "-2deg", animation: "hero-badge-float-1 5s ease-in-out infinite" } as React.CSSProperties}>
                            <img src="/event/assets/icon-eyes.png" alt="" width="14" height="14" />
                            <span className="text-base font-medium text-[#1A1A1A]/65">8600</span>
                        </FloatingBadge>
                        {/* 730 - left side */}
                        <FloatingBadge className="absolute top-[30px] -left-[80px] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]" delay={0.35} fromX={-25} fromY={-10} style={{ "--badge-rotate": "6deg", animation: "hero-badge-float-2 5s ease-in-out 0.5s infinite" } as React.CSSProperties}>
                            <img src="/event/assets/icon-chat.png" alt="" width="14" height="14" />
                            <span className="text-base font-medium text-[#1A1A1A]/65">730</span>
                        </FloatingBadge>
                        {/* 1520 - right side */}
                        <FloatingBadge className="absolute top-[40px] -right-[60px] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]" delay={0.3} fromX={25} fromY={-10} style={{ "--badge-rotate": "-4deg", animation: "hero-badge-float-1 5s ease-in-out 1s infinite" } as React.CSSProperties}>
                            <img src="/event/assets/icon-heart.png" alt="" width="14" height="14" />
                            <span className="text-base font-medium text-[#1A1A1A]/65">1520</span>
                        </FloatingBadge>
                        {/* 2470 - lower left */}
                        <FloatingBadge className="absolute bottom-[-20px] left-[2%] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]" delay={0.5} fromX={-25} fromY={10} style={{ "--badge-rotate": "5deg", animation: "hero-badge-float-2 5s ease-in-out 1.5s infinite" } as React.CSSProperties}>
                            <img src="/event/assets/icon-jari.png" alt="" width="14" height="14" />
                            <span className="text-base font-medium text-[#1A1A1A]/65">2470</span>
                        </FloatingBadge>
                        {/* 410 - center bottom */}
                        <FloatingBadge className="absolute bottom-[-15px] left-[48%] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]" delay={0.45} fromX={0} fromY={15} style={{ "--badge-rotate": "-3deg", animation: "hero-badge-float-1 5s ease-in-out 2s infinite" } as React.CSSProperties}>
                            <img src="/event/assets/icon-share.png" alt="" width="14" height="14" />
                            <span className="text-base font-medium text-[#1A1A1A]/65">410</span>
                        </FloatingBadge>
                        {/* 1160 - right bottom */}
                        <FloatingBadge className="absolute -bottom-[20px] -right-[40px] flex h-8 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]" delay={0.55} fromX={25} fromY={10} style={{ "--badge-rotate": "4deg", animation: "hero-badge-float-2 5s ease-in-out 2.5s infinite" } as React.CSSProperties}>
                            <img src="/event/assets/icon-save.png" alt="" width="14" height="14" />
                            <span className="text-base font-medium text-[#1A1A1A]/65">1160</span>
                        </FloatingBadge>
                    </div>



                    <TextReveal as="h2" className="preview__heading">
                        {"MUDENG PROVIDES PRACTICAL TRAINING TO BOOST YOUR CREATIVE DIGITAL SKILL"}
                    </TextReveal>
                </div>

                <ScaleIn>
                    <div className="preview__video">
                        <video
                            src="https://cdn.mudeng.oktaa.my.id/videos/boost-digital-skill.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                        />
                    </div>
                </ScaleIn>

                <FadeSlideIn delay={0.1}>
                    <p className="preview__desc text-subtitle">
                        Program ini dibuat agar proses belajar multimedia terasa
                        lebih sederhana, jelas, dan mudah Kamu ikuti sampai
                        menghasilkan karya nyata.
                    </p>
                </FadeSlideIn>
            </div>
        </section>
    );
}
