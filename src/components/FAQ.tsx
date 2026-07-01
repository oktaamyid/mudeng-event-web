"use client";

import { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Apa itu Creative Labs MUDENG?",
      a: "Creative Labs adalah program pelatihan dan kolaborasi kreatif dari MUDENG. Melalui acara ini, kamu akan diajak terjun langsung menangani proyek digital kreatif secara praktis bersama para mentor.",
    },
    {
      q: "Siapa saja yang bisa mendaftar?",
      a: "Acara ini terbuka bagi siapa saja—mulai dari pemula hingga yang sudah memiliki pengalaman dasar di bidang UI/UX, desain grafis, maupun videografi.",
    },
    {
      q: "Apakah acara ini dipungut biaya?",
      a: "Program Creative Labs ini memiliki sistem pendaftaran khusus. Pastikan kamu mengecek bagian pendaftaran di atas untuk detail biaya maupun beasiswa (jika tersedia).",
    },
    {
      q: "Apakah kegiatannya online atau offline?",
      a: "Rangkaian acara akan berjalan secara hybrid. Detail pelaksanaan sesi offline dan online akan kami infokan melalui timeline dan email peserta yang terdaftar.",
    },
    {
      q: "Bagaimana sistem pendaftarannya?",
      a: "Kamu cukup mengisi form pendaftaran yang tersedia di website ini. Siapkan data diri dan portofolio (opsional) untuk mempermudah proses seleksi.",
    },
  ];

  return (
    <section className="py-[160px]" id="faq">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="mb-12 text-center">
          <h2 className="font-display text-brand text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-10.5 lg:text-[72px] lg:leading-[72px]">
            Let's clear a few things up
          </h2>
        </div>

        <div className="mx-auto flex max-w-[800px] flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-[32px] bg-black/5 transition-colors duration-300 hover:bg-black/10"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="font-body flex w-full items-center justify-between gap-4 p-6 text-left text-lg leading-[26px] font-semibold text-[#1a1a1a] md:px-8 md:py-6"
                >
                  <span className="flex-1">{faq.q}</span>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)] transition-transform duration-300`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3.5 w-3.5 fill-[#1a1a1a]/65 transition-transform duration-300 ${isActive ? "rotate-45" : ""}`}
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-400 ease-in-out ${isActive ? "max-h-[300px]" : "max-h-0"}`}
                >
                  <div className="font-body px-6 pb-6 text-[15px] leading-[23px] font-medium text-[#1a1a1a]/65 md:px-8">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
