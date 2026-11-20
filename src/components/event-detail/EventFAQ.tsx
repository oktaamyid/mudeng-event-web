"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    TextReveal,
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

export default function EventFAQ({
    faqs = [],
    event,
}: {
    faqs?: { question: string; answer: string }[];
    event?: any;
}) {
    const eventTitle = event?.title?.toUpperCase() || "EVENT";

    const defaultFaqs = [
        {
            q: `Apa itu ${eventTitle}?`,
            a: `${eventTitle} adalah program pelatihan intensif yang dirancang untuk membantu peserta mengembangkan keterampilan di bidang ${event?.category || "desain digital"} melalui praktik langsung dan proyek nyata.`,
        },
        {
            q: `Siapa saja yang mengikuti ${eventTitle}?`,
            a: `${eventTitle} terbuka untuk semua kalangan, mulai dari mahasiswa, fresh graduate, hingga profesional yang ingin mengembangkan keterampilan di bidang ${event?.category || "desain digital"}.`,
        },
        {
            q: "Apakah saya harus memiliki pengalaman desain?",
            a: "Tidak harus. Program ini dirancang untuk semua level, termasuk pemula yang belum memiliki pengalaman sama sekali. Mentor akan membimbing dari dasar.",
        },
        {
            q: `Software apa yang digunakan dalam ${eventTitle}?`,
            a: "Peserta akan menggunakan tools industri seperti Figma, Adobe Photoshop, Canva, dan tools pendukung lainnya sesuai kebutuhan program.",
        },
        {
            q: `Apakah ada tugas atau proyek selama ${eventTitle}?`,
            a: "Ya, setiap sesi dilengkapi dengan tugas praktik dan proyek akhir yang akan menjadi bagian dari portofolio peserta.",
        },
        {
            q: `Bagaimana bergabung dengan ${eventTitle}?`,
            a: "Kamu bisa mendaftar melalui tombol 'Daftar Sekarang' di halaman ini. Isi formulir pendaftaran dan tunggu konfirmasi dari tim kami.",
        },
    ];

    const displayFaqs =
        faqs?.length > 0
            ? faqs.map((f) => ({ q: f.question, a: f.answer }))
            : defaultFaqs;

    const ctaDescriptionMap: Record<string, string> = {
        "ui-craft": "Bergabunglah dan mulai perjalananmu di dunia UI/UX Design",
        "creative-craft": "Bergabunglah dan kembangkan kreativitasmu melalui berbagai karya desain dan multimedia",
        "mucrex": "Tampilkan karya terbaikmu dan jadilah bagian dari pameran kreativitas digital bersama Mudeng STT NF.",
    };

    const ctaDescription = ctaDescriptionMap[event?.slug] || `Bergabunglah dan mulai perjalananmu di dunia ${event?.category || "UI/UX Design"}`;

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            className="border-divider border-t bg-white py-12 sm:py-16 md:py-24"
            id="faq"
        >
            <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                {/* Heading */}
                <div className="mb-8 text-center sm:mb-12 md:mb-14">
                    <TextReveal as="h2" className="font-display text-brand mx-auto mb-4 sm:mb-6 max-w-[700px] text-[28px] leading-[30px] font-normal uppercase sm:text-[40px] sm:leading-[42px] md:text-[56px] md:leading-[58px]">
                        {"Frequently asked questions about our service"}
                    </TextReveal>
                    <FadeSlideIn delay={0.15}>
                        <p className="font-body mx-auto max-w-[500px] text-[16px] leading-[24px] font-medium tracking-[-0.32px] text-[#1A1A1A]/65">
                            Masih penasaran dengan event pelatihan gratis ini.
                            <br />
                            Cek tanya jawab di bawah biar Kamu langsung paham.
                        </p>
                    </FadeSlideIn>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
                    {/* CTA Card */}
                    <FadeSlideIn
                        delay={0.2}
                        className="lg:col-span-5 lg:sticky lg:top-28"
                    >
                        <div className="relative flex w-full flex-col overflow-hidden rounded-[20px] bg-gradient-to-br from-[#6F52E8] via-[#6849E1] to-[#4A2EB8] p-6 shadow-[0_16px_40px_rgba(104,73,225,0.22)] sm:rounded-[28px] sm:p-8">
                            {/* Subtle purple depth accents */}
                            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#8E76FF]/35 blur-2xl" />
                            <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#3A2099]/45 blur-2xl" />

                            <div className="relative z-10 flex flex-col">
                                <span className="font-body mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/12 px-3.5 py-1 text-xs font-medium text-white/95">
                                    {event?.category || event?.service || "Program Mudeng"}
                                </span>
                                <h3 className="font-body mb-2.5 text-[20px] leading-snug font-semibold text-white sm:text-[24px]">
                                    Daftar {event?.title || "Event"}
                                </h3>
                                <p className="font-body mb-6 text-[14px] leading-relaxed font-normal text-white/85 sm:text-[15px]">
                                    {ctaDescription}
                                </p>
                                {event?.isRegistrationOpen !== false ? (
                                    <Link
                                        href={`/${event?.slug || ""}/register`}
                                        className="font-body inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold tracking-wider text-[#6849E1] uppercase shadow-sm transition-all hover:bg-[#F5F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6849E1] active:scale-[0.99]"
                                    >
                                        <span>Daftar Sekarang</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <span className="font-body inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-white/15 px-6 py-3.5 text-sm font-semibold tracking-wide text-white/90">
                                        Pendaftaran Ditutup
                                    </span>
                                )}
                            </div>
                        </div>
                    </FadeSlideIn>

                    {/* FAQ Items */}
                    <StaggerContainer className="flex flex-col gap-3 lg:col-span-7" stagger={0.08}>
                        {displayFaqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <StaggerItem key={idx}>
                                <div
                                    className="flex flex-col overflow-hidden rounded-[16px] bg-[#7C7AEA]/10 transition-colors hover:bg-[#7C7AEA]/15">

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
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="14"
                                                height="14"
                                                className="fill-white"
                                            >
                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <div className="font-body text-text-muted whitespace-pre-wrap px-3.5 pb-3.5 sm:px-5 sm:pb-5 pt-0 text-[13px] sm:text-sm">
                                                    {faq.a}
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
    );
}
