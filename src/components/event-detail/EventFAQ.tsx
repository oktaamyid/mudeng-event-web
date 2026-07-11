"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

export default function EventFAQ({
    faqs = [],
    event,
}: {
    faqs?: { question: string; answer: string }[];
    event?: any;
}) {
    const defaultFaqs = [
        {
            q: "How does the subscription work?",
            a: "Pendaftaran dapat dilakukan kapan saja selama kuota masih tersedia.",
        },
        {
            q: "What is the turnaround time?",
            a: "Kelas dimulai secara serentak sesuai tanggal kickoff.",
        },
        {
            q: "What happens if I need a revision?",
            a: "Mentor akan membimbing Anda sampai karya Anda mencapai standar portofolio.",
        },
        {
            q: "Can I share my subscription with others?",
            a: "Satu tiket hanya berlaku untuk satu peserta terdaftar.",
        },
        {
            q: "How do I submit requests?",
            a: "Melalui dashboard student yang akan diberikan setelah pendaftaran.",
        },
        {
            q: "What happens if I miss a class?",
            a: "Semua sesi live akan direkam dan bisa diakses selamanya.",
        },
    ];

    const displayFaqs =
        faqs?.length > 0
            ? faqs.map((f) => ({ q: f.question, a: f.answer }))
            : defaultFaqs;

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            className="border-divider border-t bg-white py-[100px] md:py-[160px]"
            id="faq"
        >
            <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="mb-[80px] text-center">
                    <h2 className="font-display text-text-main mx-auto mb-4 max-w-[500px] text-[36px] leading-[40px] font-normal md:text-[50px] md:leading-[52px]">
                        FREQUENTLY <span className="text-text-muted">ASKED</span> QUESTIONS ABOUT OUR SERVICE.
                    </h2>
                    <p className="font-body text-text-muted mx-auto max-w-[500px] text-[16px] font-medium">
                        Masih penasaran dengan event pelatihan gratis ini. Cek tanya jawab di bawah biar Kamu langsung paham.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <div className="relative flex h-[350px] w-full flex-col justify-end overflow-hidden rounded-[32px] p-8 lg:h-auto bg-gradient-to-br from-[#c4b5fd] to-[#818CF8]">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                        <div className="relative z-10 w-full rounded-2xl bg-white/20 p-6 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/30">
                            <h3 className="font-display mb-2 text-[24px] font-semibold text-white">
                                Daftar {event?.title || "Event"}
                            </h3>
                            <p className="font-body mb-6 text-sm font-medium text-white/90">
                                Bergabunglah dan mulai perjalananmu di dunia {event?.category || "UI/UX Design"}
                            </p>
                            <Link href={`/events/${event?.slug || ""}/register`} className="block">
                                <button className="font-body w-full rounded-full bg-[#8b5cf6] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#7c3aed] hover:shadow-lg">
                                    Daftar Sekarang
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {displayFaqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col rounded-[16px] bg-[#F8F9FB] transition-colors hover:bg-[#F2F4F7] overflow-hidden"
                                >
                                    <div 
                                        className="flex cursor-pointer items-center justify-between p-5"
                                        onClick={() => toggleFaq(idx)}
                                    >
                                        <span className="font-body text-text-main font-medium">
                                            {faq.q}
                                        </span>
                                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-[#1a1a1a]' : 'bg-[#6849E1]'}`}>
                                            {isOpen ? (
                                                <Minus className="h-3 w-3 text-white" strokeWidth={3} />
                                            ) : (
                                                <Plus className="h-3 w-3 text-white" strokeWidth={3} />
                                            )}
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-5 pb-5 pt-0 font-body text-sm text-text-muted whitespace-pre-wrap">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
