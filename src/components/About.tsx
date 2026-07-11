"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image"; // Import Image for potential use with other assets, though video uses <video>

export default function About() {
  const stats = [
    { number: '500', suffix: '+', label: 'Peserta Berpartisipasi' },
    { number: '3', suffix: '', label: 'Kategori Pelatihan Utama' },
    { number: '10', suffix: '+', label: 'Mentor Berpengalaman' },
    { number: '100', suffix: '%', label: 'Berorientasi Portofolio' }
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Autoplay failed:", error);
        });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-[160px] text-center" id="about">
      <div className="mx-auto max-w-[1440px] px-6 md:px-[240px]">
        <h2 className="font-['Anton'] text-[72px] leading-[72px] tracking-[-2px] text-[#6849E1] uppercase mb-6">
          MUDENG IS A MODERN CREATIVE
        </h2>
        <p className="font-['Inter'] font-medium text-[24px] leading-[29.76px] tracking-[-0.48px] text-[#1A1A1A]/65 max-w-[720px] mx-auto mb-[60px]">
          MUDENG adalah wadah kreatif modern yang fokus mengembangkan keahlian multimedia melalui pelatihan interaktif guna mempersiapkan talenta digital masa depan yang siap kerja.
        </p>

        <div className="flex flex-wrap justify-center items-start gap-0 mb-[60px]">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`relative flex-none min-w-[160px] px-6 text-center ${i === stats.length - 1 ? '' : 'md:after:absolute md:after:right-0 md:after:top-0 md:after:bottom-0 md:after:w-[1px] md:after:bg-[#000000]/05 md:after:content-[""]'}`}
            >
              <div className="font-['Inter'] font-medium text-[40px] leading-[48px] tracking-[-2.2px] text-[#7C7AEA] mb-2">
                {stat.number}{stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <div className="font-['Inter'] font-medium text-[17px] leading-[27px] tracking-[-0.63px] text-[#7d7d7d]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-[1200px] aspect-[1200/650] overflow-hidden rounded-[32px] shadow-[0_16px_48px_-4px_rgba(26,26,26,0.2)]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/videos/video-coming-soon.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}