"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image"; // Import Image for potential use with other assets, though video uses <video>

export default function About() {
    const stats = [
        { number: "500", suffix: "+", label: "Peserta Berpartisipasi" },
        { number: "3", suffix: "", label: "Kategori Pelatihan Utama" },
        { number: "10", suffix: "+", label: "Mentor Berpengalaman" },
        { number: "100", suffix: "%", label: "Berorientasi Portofolio" },
    ];

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play().catch((error) => {
                    console.error("Autoplay failed:", error);
                });
            }
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative py-[160px] text-center" id="about">
            <div className="mx-auto max-w-[1440px] px-6 md:px-[240px]">
                <h2 className="mb-6 font-['Anton'] text-[72px] leading-[72px] tracking-[-2px] text-[#6849E1] uppercase">
                    MUDENG IS A MODERN CREATIVE
                </h2>
                <p className="mx-auto mb-[60px] max-w-[720px] font-['Inter'] text-[24px] leading-[29.76px] font-medium tracking-[-0.48px] text-[#1A1A1A]/65">
                    MUDENG adalah wadah kreatif modern yang fokus mengembangkan
                    keahlian multimedia melalui pelatihan interaktif guna
                    mempersiapkan talenta digital masa depan yang siap kerja.
                </p>

                <div className="mb-[60px] flex flex-wrap items-start justify-center gap-0">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`relative min-w-[160px] flex-none px-6 text-center ${i === stats.length - 1 ? "" : 'md:after:bg-[#000000]/05 md:after:absolute md:after:top-0 md:after:right-0 md:after:bottom-0 md:after:w-[1px] md:after:content-[""]'}`}
                        >
                            <div className="mb-2 font-['Inter'] text-[40px] leading-[48px] font-medium tracking-[-2.2px] text-[#7C7AEA]">
                                {stat.number}
                                {stat.suffix && <span>{stat.suffix}</span>}
                            </div>
                            <div className="font-['Inter'] text-[17px] leading-[27px] font-medium tracking-[-0.63px] text-[#7d7d7d]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative mx-auto aspect-[1200/650] max-w-[1200px] overflow-hidden rounded-[32px] shadow-[0_16px_48px_-4px_rgba(26,26,26,0.2)]">
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    >
                        <source
                            src="/videos/video-coming-soon.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
}
