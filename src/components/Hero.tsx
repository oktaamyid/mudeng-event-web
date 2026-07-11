import Link from "next/link";
import Image from "next/image";
import { getActiveEvent } from "@/lib/actions/events";

export default async function Hero() {
    const { data: activeEvent } = await getActiveEvent();
    const ctaLink = activeEvent
        ? `/events/${activeEvent.slug}/register`
        : "#events";

    return (
        <section
            className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-[100px] pb-[60px] gap-5 md:pt-[160px] md:pb-[100px]"
            id="hero"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/Background-Hero-Content.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center top"
                    priority
                />
            </div>

            {/* Floating Badges */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[320px] pointer-events-none z-20 hidden lg:block">
                <div className="absolute top-[10px] left-[30px] rotate-[-10deg] flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)] h-8">
                    <Image
                        src="/assets/icon-eyes.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        8600
                    </span>
                </div>
                <div className="absolute top-[200px] left-0 rotate-[10deg] flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)] h-8">
                    <Image
                        src="/assets/icon-heart.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        1520
                    </span>
                </div>
                <div className="absolute top-[30px] right-0 rotate-[10deg] flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)] h-8">
                    <Image
                        src="/assets/icon-save.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        1160
                    </span>
                </div>
                <div className="absolute top-[210px] right-[10px] rotate-[-10deg] flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)] h-8">
                    <Image
                        src="/assets/icon-chat.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        730
                    </span>
                </div>
            </div>

            <div className="relative z-10 text-center max-w-[800px] mx-auto px-6">
                <h1 className="font-['Anton'] text-[96px] leading-[92.16px] tracking-[-3.84px] uppercase text-[#6849E1] mb-6">
                    TAKE OVER THE TIMELINE
                </h1>
                <p className="font-['Inter'] font-medium text-[24px] leading-[29.76px] tracking-[-0.48px] text-[#1A1A1A]/65 max-w-[692px] mx-auto mb-[60px]">
                    Ikuti rangkaian pelatihan digital kreatif terbesar dari
                    Multimedia Digital Engagement untuk kuasai keahlian masa
                    depan.
                </p>
                <div className="mb-[60px] flex w-full flex-col items-center justify-center gap-2 md:flex-row">
                    <Link
                        href={ctaLink}
                        className="bg-brand text-bg-main rounded-pill font-nav shadow-cta-btn flex items-center justify-center w-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:w-auto"
                    >
                        Daftar Sekarang
                    </Link>
                    <a
                        href="#services"
                        className="bg-pill-bg text-btn-secondary-text rounded-pill font-nav w-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-black/10 md:w-auto"
                    >
                        Lihat Detail
                    </a>
                </div>
            </div>

            {/* Image Blocks */}
            <div className="relative z-10 w-full max-w-[1200px] h-[304px] mx-auto hidden lg:block">
                <div className="absolute w-[264px] h-[264px] rounded-[32px] overflow-hidden left-[calc(50%-300px-132px)] top-1/2 -translate-y-1/2 rotate-[-3deg]">
                    <Image
                        src="/assets/image1.png"
                        alt="Portrait creative woman"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="absolute z-10 w-[264px] h-[264px] rounded-[32px] overflow-hidden left-[calc(50%-100px-132px)] top-[calc(50%-20px)] -translate-y-1/2 rotate-[3deg]">
                    <Image
                        src="/assets/image2.png"
                        alt="Portrait man with red cap"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="absolute z-20 w-[264px] h-[264px] rounded-[32px] overflow-hidden left-[calc(50%+100px-132px)] top-[calc(50%+20px)] -translate-y-1/2 rotate-[-3deg]">
                    <Image
                        src="/assets/image3.png"
                        alt="Portrait woman in pink top"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="absolute z-30 w-[264px] h-[264px] rounded-[32px] overflow-hidden left-[calc(50%+300px-132px)] top-1/2 -translate-y-1/2 rotate-[3deg]">
                    <Image
                        src="/assets/image1.png"
                        alt="Portrait man with sunglasses"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </section>
    );
}
