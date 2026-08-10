"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import { CourseData, coursesList } from "@/data/courses";
import {
    TextReveal,
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

export default function CourseDetail({ course }: { course: CourseData }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeCard, setActiveCard] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Hero images for stack
    const heroImages = course.heroImages?.length > 0 ? course.heroImages : [course.image];

    // Get next course for navigation
    const currentIndex = coursesList.findIndex((c) => c.slug === course.slug);
    const nextCourse = coursesList[(currentIndex + 1) % coursesList.length];

    // Responsive card stack dimensions
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const CARD_HEIGHT = isMobile ? 300 : isTablet ? 420 : 650;
    const CARD_GAP = isMobile ? 25 : isTablet ? 35 : 50;

    // Auto-play infinite loop
    const nextCard = useCallback(() => {
        setActiveCard((prev) => (prev + 1) % heroImages.length);
    }, [heroImages.length]);

    useEffect(() => {
        if (isPaused || heroImages.length <= 1) return;
        const interval = setInterval(nextCard, 3500);
        return () => clearInterval(interval);
    }, [isPaused, nextCard, heroImages.length]);

    return (
        <>
            {/* ─── Hero ─── */}
            <section className="relative pt-[120px] pb-6 md:pt-[160px] md:pb-10" id="course-hero">
                <img
                    src="/event/assets/Background-Hero-Content.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />

                <div className="relative z-10 mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                    <div className="mx-auto mb-8 md:mb-16 flex max-w-[800px] flex-col items-center text-center">
                        <FadeSlideIn delay={0}>
                            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-[#F0EDFA] py-1.5 pr-5 pl-1.5">
                                <div className="font-body flex h-8 w-8 items-center justify-center rounded-full bg-[#6849E1] text-sm font-bold text-white">
                                    {String(currentIndex + 1).padStart(2, "0")}
                                </div>
                                <span className="font-body text-[#1A1A1A]/65 text-[15px] font-medium">
                                    {course.tag}
                                </span>
                            </div>
                        </FadeSlideIn>

                        <TextReveal
                            as="h1"
                            className="font-display text-brand mb-4 md:mb-6 text-[36px] leading-[38px] font-normal tracking-tight uppercase sm:text-[50px] sm:leading-[52px] md:text-[80px] md:leading-[80px] lg:text-[100px] lg:leading-[100px]"
                        >
                            {course.title}
                        </TextReveal>

                        <FadeSlideIn delay={0.2}>
                            <p className="font-body mx-auto max-w-[600px] text-[16px] leading-[24px] font-medium tracking-[-0.32px] text-[#1A1A1A]/65 md:text-[18px] md:leading-[27px] md:tracking-[-0.36px]">
                                {course.description}
                            </p>
                        </FadeSlideIn>
                    </div>
                </div>

                {/* Hero Card Stack — Infinite Vertical Carousel */}
                <FadeSlideIn delay={0.3} className="relative z-10">
                    <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                        <div
                            className="relative mx-auto"
                            style={{
                                height: CARD_HEIGHT + (heroImages.length - 1) * CARD_GAP,
                                maxWidth: 1100,
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {heroImages.map((img, i) => {
                                const pos = (i - activeCard + heroImages.length) % heroImages.length;
                                // pos 0 = front, 1 = behind, 2 = further behind

                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute left-0 right-0 cursor-pointer overflow-hidden rounded-[16px] md:rounded-[24px] bg-white shadow-xl"
                                        animate={{
                                            top: (heroImages.length - 1 - pos) * CARD_GAP,
                                            zIndex: heroImages.length - pos,
                                            scale: 1 - pos * 0.03,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        style={{
                                            height: CARD_HEIGHT,
                                        }}
                                        onClick={nextCard}
                                    >
                                        {/* All cards show their image */}
                                        <img
                                            src={img}
                                            alt={`${course.title} ${i + 1}`}
                                            className="h-full w-full object-cover select-none"
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </FadeSlideIn>
            </section>

            {/* ─── Overview + Highlights ─── */}
            <section className="pt-[50px] pb-[15px] md:pt-[80px] md:pb-[20px] lg:pt-[120px] lg:pb-[30px]" id="overview">
                <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
                        {/* Left: Overview */}
                        <StaggerContainer className="flex flex-col gap-10 lg:col-span-7" stagger={0.12}>
                            <StaggerItem>
                                <div>
                                    <h2 className="font-body text-text-main mb-3 text-[24px] font-bold md:text-[28px]">
                                        Tentang Program
                                    </h2>
                                    <p className="font-body text-[15px] leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px]">
                                        {course.overview}
                                    </p>
                                </div>
                            </StaggerItem>

                            <StaggerItem>
                                <div>
                                    <h2 className="font-body text-text-main mb-4 text-[24px] font-bold md:text-[28px]">
                                        Yang Akan Kamu Pelajari
                                    </h2>
                                    <ul className="flex flex-col gap-3">
                                        {course.highlights.map((item, i) => (
                                            <li
                                                key={i}
                                                className="font-body flex items-start gap-3 text-[15px] leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px]"
                                            >
                                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7C7AEA]/15 text-[11px] text-[#6849E1]">
                                                    ✓
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </StaggerItem>

                            {/* Tools & Software */}
                            {course.tools && course.tools.length > 0 && (
                                <StaggerItem>
                                    <div>
                                        <h2 className="font-body text-text-main mb-4 text-[24px] font-bold md:text-[28px]">
                                            Tools & Software
                                        </h2>
                                        <div className="flex flex-wrap gap-2 sm:gap-4">
                                            {course.tools.map((tool, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 sm:gap-3 rounded-[12px] sm:rounded-[16px] bg-[#7C7AEA]/10 px-3 py-2 sm:px-5 sm:py-3 transition-colors hover:bg-[#7C7AEA]/15"
                                                >
                                                    <img
                                                        src={tool.logo}
                                                        alt={tool.name}
                                                        className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                                                    />
                                                    <span className="font-body text-text-main text-[14px] font-semibold">
                                                        {tool.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </StaggerItem>
                            )}
                        </StaggerContainer>

                        {/* Right: Info Card */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-32">
                                <FadeSlideIn delay={0.3}>
                                    <div className="flex flex-col gap-0 rounded-[20px] md:rounded-[24px] bg-[#7C7AEA]/10 p-5 sm:p-8">
                                        <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                            <div className="flex flex-col">
                                                <span className="font-body text-text-main mb-1 text-sm font-medium">Program:</span>
                                                <span className="font-body text-text-muted text-[15px] font-medium">{course.title}</span>
                                            </div>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                            <div className="flex flex-col">
                                                <span className="font-body text-text-main mb-1 text-sm font-medium">Durasi:</span>
                                                <span className="font-body text-text-muted text-[15px] font-medium">4 Minggu</span>
                                            </div>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                            <div className="flex flex-col">
                                                <span className="font-body text-text-main mb-1 text-sm font-medium">Level:</span>
                                                <span className="font-body text-text-muted text-[15px] font-medium">Pemula - Intermediate</span>
                                            </div>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="12" y1="20" x2="12" y2="10"></line>
                                                    <line x1="18" y1="20" x2="18" y2="4"></line>
                                                    <line x1="6" y1="20" x2="6" y2="16"></line>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div className="flex flex-col">
                                                <span className="font-body text-text-main mb-1 text-sm font-medium">Sertifikat:</span>
                                                <span className="font-body text-text-muted text-[15px] font-medium">Ya, setelah lulus</span>
                                            </div>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </FadeSlideIn>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Curriculum ─── */}
            <section className="py-[60px] md:py-[80px]" id="curriculum">
                <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                    <FadeSlideIn>
                        <h2 className="font-display text-brand mb-8 md:mb-12 text-[28px] leading-[30px] font-normal uppercase sm:text-[40px] sm:leading-[42px] md:text-[56px] md:leading-[58px]">
                            Curriculum
                        </h2>
                    </FadeSlideIn>

                    <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.1}>
                        {course.curriculum.map((item, i) => (
                            <StaggerItem key={i}>
                                <div className="group rounded-[16px] md:rounded-[24px] bg-[#7C7AEA]/10 p-5 sm:p-8 transition-all duration-300 hover:bg-[#7C7AEA]/15 hover:shadow-lg">
                                    <span className="font-body mb-2 inline-block rounded-full bg-[#6849E1] px-4 py-1 text-xs font-bold text-white">
                                        {item.week}
                                    </span>
                                    <h3 className="font-body text-text-main mb-2 text-[20px] font-bold">
                                        {item.topic}
                                    </h3>
                                    <p className="font-body text-[15px] leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65">
                                        {item.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* Next Course Button */}
                    <FadeSlideIn delay={0.2}>
                        <div className="mt-12 flex justify-start">
                            <Link
                                href={`/course/${nextCourse.slug}`}
                                scroll={true}
                                className="font-body text-text-main inline-flex rounded-full bg-[#7C7AEA]/10 px-8 py-3 text-sm font-medium transition-colors hover:bg-[#7C7AEA]/15"
                            >
                                Next Course
                            </Link>
                        </div>
                    </FadeSlideIn>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="relative py-[50px] sm:py-[80px] md:py-[120px]" id="faq">
                <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                    {/* Heading */}
                    <div className="mb-[40px] sm:mb-[60px] md:mb-[80px] text-center">
                        <TextReveal
                            as="h2"
                            className="font-display text-brand mx-auto mb-4 sm:mb-6 max-w-[700px] text-[28px] leading-[30px] font-normal uppercase sm:text-[40px] sm:leading-[42px] md:text-[56px] md:leading-[58px]"
                        >
                            {"Frequently asked questions about our service"}
                        </TextReveal>
                        <FadeSlideIn delay={0.15}>
                            <p className="font-body mx-auto max-w-[500px] text-[16px] leading-[24px] font-medium tracking-[-0.32px] text-[#1A1A1A]/65">
                                Masih penasaran dengan course ini?
                                <br />
                                Cek tanya jawab di bawah biar Kamu langsung paham.
                            </p>
                        </FadeSlideIn>
                    </div>

                    {/* FAQ Grid */}
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
                        {/* CTA Card */}
                        <FadeSlideIn delay={0.1} className="lg:col-span-4">
                            <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-[20px] md:rounded-[28px] p-5 sm:p-6 min-h-[280px] sm:min-h-[340px]">
                                <img
                                    src="/event/assets/Gradient V26.png"
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="relative z-10 w-full rounded-2xl border border-white/30 bg-white/20 p-4 sm:p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-md">
                                    <h3 className="font-body mb-2 text-[17px] sm:text-[20px] font-semibold text-white">
                                        Daftar {course.title}
                                    </h3>
                                    <p className="font-body mb-4 sm:mb-6 text-[13px] sm:text-sm font-medium text-white/90">
                                        Bergabunglah dan mulai perjalananmu di dunia {course.title}.
                                    </p>
                                    <Link href={`/ui-craft/register`} className="block">
                                        <button className="font-body w-full rounded-full bg-[#6849E1] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_10px_20px_rgba(104,73,225,0.4)] transition-all hover:bg-[#5a3dcf] hover:shadow-[0_12px_24px_rgba(104,73,225,0.5)]">
                                            Daftar Sekarang
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </FadeSlideIn>

                        {/* FAQ Items */}
                        <StaggerContainer className="flex flex-col gap-3 lg:col-span-8" stagger={0.08}>
                            {course.faqs.map((faq, idx) => {
                                const isOpen = openIndex === idx;
                                return (
                                    <StaggerItem key={idx}>
                                        <div className="flex flex-col overflow-hidden rounded-[16px] bg-[#7C7AEA]/10 transition-colors hover:bg-[#7C7AEA]/15">
                                            <div
                                                className="flex cursor-pointer items-center justify-between p-3.5 sm:p-5"
                                                onClick={() => toggleFaq(idx)}
                                            >
                                                <span className="font-body text-text-main pr-4 text-[14px] sm:text-[16px] font-medium">
                                                    {faq.q}
                                                </span>
                                                <div
                                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C7AEA] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                                                >
                                                    <svg viewBox="0 0 24 24" width="14" height="14" className="fill-white">
                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-3.5 pb-3.5 sm:px-5 sm:pb-5">
                                                            <p className="font-body text-text-muted text-[13px] leading-[20px] sm:text-[15px] sm:leading-[24px] font-medium">
                                                                {faq.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>
                </div>
            </section>
        </>
    );
}
