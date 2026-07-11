"use client";
import { useState, useCallback } from "react";

const faqItems = [
    {
        question: "Apakah materi MUDENG ini cocok untuk pemula??",
        answer: "Ya, kursus ini dirancang untuk pemula hingga intermediate. Semua materi disampaikan secara bertahap dan mudah dipahami, bahkan jika kamu belum punya pengalaman di bidang digital kreatif sebelumnya.",
    },
    {
        question:
            "Program belajar multimedia mana yang paling sesuai untuk saya?",
        answer: "Setiap program memiliki fokus yang berbeda. Jika Anda belum yakin, konsultasikan kebutuhan Anda dengan tim kami agar mendapatkan rekomendasi program yang paling sesuai.",
    },
    {
        question: "Apakah materi kelas digital ini bisa diakses lewat HP?",
        answer: "Ya. Materi dapat diakses melalui HP, tablet, maupun laptop. Namun, untuk praktik menggunakan software multimedia, kami menyarankan menggunakan laptop atau PC agar proses belajar lebih optimal.",
    },
    {
        question:
            "Apakah ada sesi konsultasi langsung dengan mentor jika saya menemui kesulitan?",
        answer: "Ya. Anda dapat berkonsultasi langsung dengan mentor selama proses pembelajaran untuk bertanya, berdiskusi, dan mendapatkan solusi ketika mengalami kesulitan.",
    },
    {
        question:
            "Bagaimana portofolio MUDENG ini dapat membantu saya dalam melamar kerja?",
        answer: "Portofolio yang Anda bangun selama mengikuti program dapat menjadi bukti kemampuan dan pengalaman Anda, sehingga meningkatkan kepercayaan perusahaan saat melamar pekerjaan atau mencari peluang freelance.",
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleItem = useCallback((index: number | null) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    }, []);

    return (
        <section className="section-spacing pb-32" id="faq">
            <div className="container max-w-[700px]">
                <h2 className="heading-h2 mb-10 text-center">
                    Let's clear a few things up
                </h2>

                <div className="flex flex-col items-center space-y-3">
                    {faqItems.map((item, i) => (
                        <div
                            key={i}
                            className={`bg-nav-outer border-divider w-[560px] max-w-full overflow-hidden border transition-all ${
                                activeIndex === i
                                    ? "rounded-[20px]"
                                    : "rounded-[20px]"
                            }`}
                        >
                            <button
                                className="flex min-h-[70px] w-full items-center justify-between gap-4 px-6 py-3 text-left focus:outline-none"
                                onClick={() => toggleItem(i)}
                            >
                                <span className="text-text-main pr-2 text-[18px]">
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
                                    <p className="text-text-muted px-6 pb-4 text-[15px]">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
