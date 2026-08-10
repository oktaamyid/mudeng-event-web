"use client";

import Link from "next/link";
import {
    TextReveal,
    FadeSlideIn,
    PopIn,
} from "@/components/ui/motion-primitives";

const pills = [
    "Sistem Hybrid",
    "Mentor Ahli",
    "Software Industri",
    "Bahan Portofolio",
    "Arah yang Jelas",
    "Pembelajaran Santai",
    "Proyek Nyata",
    "Fokus Skill",
    "Konsistensi Mudah",
];

const CheckIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

export default function System() {
    return (
        <section className="system section-spacing" id="system">
            <div className="container">
                <div className="system__heading">
                    <TextReveal as="h2" className="heading-h2">
                        THE SYSTEM THAT PROVIDES
                    </TextReveal>
                </div>

                <div className="system__pills">
                    {pills.map((label, i) => (
                        <PopIn key={i} delay={i * 0.06}>
                            <div className="system__pill">
                                <div className="system__pill-icon">
                                    <CheckIcon />
                                </div>
                                <span className="system__pill-label">{label}</span>
                            </div>
                        </PopIn>
                    ))}
                </div>

                <FadeSlideIn delay={0.2}>
                    <p className="system__text text-subtitle">
                        Belajar jadi lebih mudah karena kurikulum kami tersusun rapi
                        dari dasar. Kamu akan dibimbing langkah demi langkah sampai
                        berhasil membuat portofolio keren sendiri.
                    </p>
                </FadeSlideIn>

                <FadeSlideIn delay={0.3}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        <Link
                            href="/#events"
                            className="bg-brand font-body inline-block w-full sm:w-auto rounded-[100px] px-[24px] sm:px-[28px] py-[11px] sm:py-[13px] text-[14px] sm:text-[16px] font-medium !text-white transition-transform hover:scale-105 text-center"
                        >
                            Daftar Sekarang
                        </Link>
                        <Link
                            href="/#events"
                            className="bg-brand-light text-text-muted font-body inline-block w-full sm:w-auto rounded-[100px] px-[24px] sm:px-[28px] py-[11px] sm:py-[13px] text-[14px] sm:text-[16px] font-medium transition-transform hover:scale-105 text-center"
                        >
                            Lihat Detail
                        </Link>
                    </div>
                </FadeSlideIn>
            </div>
        </section>
    );
}
