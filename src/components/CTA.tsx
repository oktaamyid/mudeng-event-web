"use client";

import Link from "next/link";
import {
    TextReveal,
    FadeSlideIn,
} from "@/components/ui/motion-primitives";

const photo = "/event/assets/visual-user.png";

export default function CTA() {
    return (
        <section id="cta" className="relative overflow-hidden pt-[280px] pb-16 sm:pt-[300px] md:pt-[300px] md:pb-24 lg:pt-[520px] xl:pt-[580px] xl:pb-32">
            {/* Rotating photo arc — all devices */}
            <div className="pointer-events-none absolute inset-x-0 top-[180px] sm:top-[180px] md:top-[120px] lg:top-[40px] xl:top-0 flex items-start justify-center">
                <img
                    src={photo}
                    alt=""
                    draggable={false}
                    className="w-full max-w-[1600px] select-none animate-[spin_60s_linear_infinite] scale-[1.5] sm:scale-[1.4] md:scale-[1.4] lg:scale-[1.05] xl:scale-100"
                />
            </div>

            {/* Text content — all devices */}
            <div className="relative z-10 container mx-auto max-w-[820px] px-6 text-center">
                <TextReveal as="h2" className="heading-h2-large mb-4 sm:mb-6">
                    {"LEARN BETTER"}
                    {<br />}
                    {"BUILD SMARTER"}
                </TextReveal>

                <FadeSlideIn delay={0.15}>
                    <p className="text-subtitle mx-auto mb-8 max-w-[560px] sm:mb-10">
                        Nggak perlu bingung lagi soal karir kreatif. Yuk, bikin
                        portofolio keren bareng MUDENG lewat bimbingan yang jelas
                        dan terarah.
                    </p>
                </FadeSlideIn>

                <FadeSlideIn delay={0.3}>
                    <Link
                        href="/#events"
                        className="bg-brand font-body inline-block rounded-[100px] px-[28px] py-[13px] text-[15px] sm:text-[16px] font-medium !text-white transition-transform hover:scale-105"
                    >
                        Daftar Sekarang
                    </Link>
                </FadeSlideIn>
            </div>
        </section>
    );
}
