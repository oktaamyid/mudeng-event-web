"use client";

import Link from "next/link";
import {
    TextReveal,
    FadeSlideIn,
} from "@/components/ui/motion-primitives";

const photo = "/event/assets/user.png";

export default function CTA() {
    return (
        <section id="cta" className="relative overflow-hidden pt-32 pb-16 sm:pt-64 sm:pb-24 md:pt-96 md:pb-32">
            {/* Object */}
            <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center px-6 md:flex md:px-16">
                <img
                    src={photo}
                    alt=""
                    draggable={false}
                    className="w-full max-w-[1600px] select-none"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto max-w-[820px] text-center">
                <TextReveal as="h2" className="heading-h2-large mb-6">
                    {"LEARN BETTER"}
                    {<br />}
                    {"BUILD SMARTER"}
                </TextReveal>

                <FadeSlideIn delay={0.15}>
                    <p className="text-subtitle mx-auto mb-10 max-w-[560px]">
                        Nggak perlu bingung lagi soal karir kreatif. Yuk, bikin
                        portofolio keren bareng MUDENG lewat bimbingan yang jelas
                        dan terarah.
                    </p>
                </FadeSlideIn>

                <FadeSlideIn delay={0.3}>
                    <Link
                        href="/#events"
                        className="bg-brand font-body inline-block rounded-[100px] px-[28px] py-[13px] text-[16px] font-medium !text-white transition-transform hover:scale-105"
                    >
                        Daftar Sekarang
                    </Link>
                </FadeSlideIn>
            </div>
        </section>
    );
}
