"use client";

import { motion } from "framer-motion";

import {
    TextReveal,
    FadeSlideIn,
    PopIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

const tools = [
    { name: "instagram", label: "Instagram", img: "/event/assets/logo-ig.png" },
    { name: "aftereffect", label: "After Effect", img: "/event/assets/ae.png" },
    { name: "figma", label: "Figma", img: "/event/assets/logo-figma.png" },
    { name: "linkedin", label: "LinkedIn", img: "/event/assets/logo-linkedin.png" },
    { name: "capcut", label: "CapCut", img: "/event/assets/logo-capcut.png" },
    {
        name: "photoshop",
        label: "Photoshop",
        img: "/event/assets/logo-photoshop.png",
    },
    { name: "dribbble", label: "Dribbble", img: "/event/assets/logo-dribble.png" },
];

const benefits = [
    {
        title: "Kuasai Skill Global",
        desc: "Pelajari desain standar industri untuk portofolio yang bersaing.",
    },
    {
        title: "Mentor Expert",
        desc: "Bimbingan intensif dari para praktisi multimedia berpengalaman.",
    },
    {
        title: "Hybrid Learning",
        desc: "Kombinasi sesi online fleksibel dan pertemuan offline interaktif.",
    },
];


export default function Approach() {
    return (
        <section className="approach section-spacing" id="approach">
            <div className="container">
                <div className="approach__content">
                    {/* Desktop icons — absolute positioned (hidden ≤1280px via CSS) */}
                    <div className="approach__icons">
                        {tools.map((tool, i) => (
                            <PopIn
                                className={`approach__icon approach__icon--${tool.name}`}
                                key={tool.name}
                                delay={i * 0.08}
                            >
                                <img src={tool.img} alt={tool.label} />
                            </PopIn>
                        ))}
                        <img
                            className="approach__deco approach__deco--arrow-1"
                            src="/event/assets/icon-arrow.png"
                            alt=""
                        />
                        <img
                            className="approach__deco approach__deco--cling-1"
                            src="/event/assets/icon-cling.png"
                            alt=""
                        />
                        <img
                            className="approach__deco approach__deco--tali"
                            src="/event/assets/icon-tali.png"
                            alt=""
                        />
                    </div>

                    {/* Mobile/Tablet icons — scattered across entire section (visible ≤1280px) */}
                    <div className="pointer-events-none absolute inset-0 z-0 xl:hidden">
                        {[
                            /* Instagram — top center-left, above heading */
                            { ...tools[0], top: "-40px",  left: "18%",          rotate: "-8deg",  size: "48px" },
                            /* After Effect — top right */
                            { ...tools[1], top: "-10px",  right: "12%",         rotate: "6deg",   size: "44px" },
                            /* Figma — left side, near heading */
                            { ...tools[2], top: "18%",    left: "-4px",         rotate: "-5deg",  size: "50px" },
                            /* LinkedIn — right side, near heading */
                            { ...tools[3], top: "22%",    right: "0px",         rotate: "10deg",  size: "48px" },
                            /* CapCut — bottom left */
                            { ...tools[4], bottom: "12%", left: "5%",           rotate: "6deg",   size: "44px" },
                            /* Photoshop — bottom center, below cling */
                            { ...tools[5], bottom: "-140px", left: "50%",          rotate: "-3deg",  size: "48px" },
                            /* Dribbble — bottom right */
                            { ...tools[6], bottom: "10%", right: "5%",          rotate: "-8deg",  size: "44px" },
                        ].map((icon, i) => (
                            <PopIn key={`mobile-${icon.name}`} delay={i * 0.07}>
                                <div
                                    className="absolute flex items-center justify-center rounded-[14px] bg-white shadow-[0_8px_16px_rgba(26,26,26,0.08)]"
                                    style={{
                                        width: icon.size,
                                        height: icon.size,
                                        top: (icon as any).top,
                                        bottom: (icon as any).bottom,
                                        left: (icon as any).left,
                                        right: (icon as any).right,
                                        "--icon-rotate": icon.rotate,
                                        animation: `icon-float 5s ease-in-out ${i * 0.3}s infinite`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={icon.img}
                                        alt={icon.label}
                                        className="h-[60%] w-[60%] object-contain"
                                    />
                                </div>
                            </PopIn>
                        ))}
                    </div>

                    <TextReveal as="h2" className="approach__heading heading-h2 relative z-10">
                        {"MUDENG CREATIVE"}
                        {<br />}
                        {"POWERHOUSE"}
                    </TextReveal>

                    <StaggerContainer className="approach__benefits relative z-10" stagger={0.12}>
                        {benefits.map((benefit, i) => (
                            <StaggerItem className="approach__benefit" key={i}>
                                <h3 className="approach__benefit-title">
                                    {benefit.title}
                                </h3>
                                <p className="approach__benefit-desc">
                                    {benefit.desc}
                                </p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}
