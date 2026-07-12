import Link from "next/link";
import Image from "next/image";
export default async function Hero({ event: activeEvent }: { event: any }) {
    const ctaLink = activeEvent ? `/${activeEvent.slug}/register` : "#events";

    return (
        <section
            className="relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden pt-25 pb-[60px] md:pt-[160px] md:pb-[100px]"
            id="hero"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/event/assets/Background-Hero-Content.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center top"
                    priority
                />
            </div>

            {/* Floating Badges */}
            <div className="pointer-events-none absolute top-[40%] left-1/2 z-20 hidden h-[320px] w-[900px] -translate-x-1/2 -translate-y-1/2 lg:block">
                <div className="absolute top-[10px] left-[30px] flex h-8 rotate-[-10deg] items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]">
                    <Image
                        src="/event/assets/icon-eyes.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        8600
                    </span>
                </div>
                <div className="absolute top-[200px] left-0 flex h-8 rotate-[10deg] items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]">
                    <Image
                        src="/event/assets/icon-heart.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        1520
                    </span>
                </div>
                <div className="absolute top-[30px] right-0 flex h-8 rotate-[10deg] items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]">
                    <Image
                        src="/event/assets/icon-save.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        1160
                    </span>
                </div>
                <div className="absolute top-[210px] right-[10px] flex h-8 rotate-[-10deg] items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_10px_rgba(26,26,26,0.1)]">
                    <Image
                        src="/event/assets/icon-chat.png"
                        alt=""
                        width="14"
                        height="14"
                    />
                    <span className="text-base font-medium text-[#1A1A1A]/65">
                        730
                    </span>
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
                <h1 className="mb-6 font-['Anton'] text-[96px] leading-[92.16px] tracking-[-3.84px] text-[#6849E1] uppercase">
                    {activeEvent?.title || "TAKE OVER THE TIMELINE"}
                </h1>
                <p className="mx-auto mb-[60px] max-w-[692px] font-['Inter'] text-[24px] leading-[29.76px] font-medium tracking-[-0.48px] text-[#1A1A1A]/65">
                    {activeEvent?.subtitle ||
                        "Ikuti rangkaian pelatihan digital kreatif terbesar dari Multimedia Digital Engagement untuk kuasai keahlian masa depan."}
                </p>
                <div className="mb-[60px] flex w-full flex-col items-center justify-center gap-2 md:flex-row">
                    <Link
                        href={ctaLink}
                        className="bg-brand !text-white rounded-pill font-nav shadow-cta-btn flex w-full items-center justify-center px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:w-auto"
                    >
                        Daftar Sekarang
                    </Link>
                    <Link
                        href="/#events"
                        className="bg-pill-bg text-btn-secondary-text rounded-pill font-nav w-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-black/10 md:w-auto"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>

            {/* Image Blocks */}
            <div className="relative z-10 mx-auto hidden h-[304px] w-full max-w-[1200px] lg:block">
                <div className="absolute top-1/2 left-[calc(50%-300px-132px)] h-[264px] w-[264px] -translate-y-1/2 rotate-[-3deg] overflow-hidden rounded-[32px]">
                    <Image
                        src="/event/assets/image1.png"
                        alt="Portrait creative woman"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="absolute top-[calc(50%-20px)] left-[calc(50%-100px-132px)] z-10 h-[264px] w-[264px] -translate-y-1/2 rotate-[3deg] overflow-hidden rounded-[32px]">
                    <Image
                        src="/event/assets/image2.png"
                        alt="Portrait man with red cap"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="absolute top-[calc(50%+20px)] left-[calc(50%+100px-132px)] z-20 h-[264px] w-[264px] -translate-y-1/2 rotate-[-3deg] overflow-hidden rounded-[32px]">
                    <Image
                        src="/event/assets/image3.png"
                        alt="Portrait woman in pink top"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="absolute top-1/2 left-[calc(50%+300px-132px)] z-30 h-[264px] w-[264px] -translate-y-1/2 rotate-[3deg] overflow-hidden rounded-[32px]">
                    <Image
                        src="/event/assets/image1.png"
                        alt="Portrait man with sunglasses"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </section>
    );
}
