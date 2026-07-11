import Link from "next/link";
import { getActiveEvent } from "@/lib/actions/events";

export default async function Hero() {
  const { data: activeEvent } = await getActiveEvent();
  const ctaLink = activeEvent ? `/events/${activeEvent.slug}/register` : "#events";

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden pt-[100px] pb-[60px] lg:pt-[120px]"
      id="hero"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="assets/Background-Hero-Content.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="pointer-events-none absolute top-[40%] left-1/2 z-10 hidden h-[320px] w-[600px] -translate-x-1/2 -translate-y-1/2 lg:block xl:w-[900px]">
        <div className="shadow-badge absolute top-[10%] left-[10%] flex animate-bounce items-center gap-2 rounded-full bg-white px-4 py-2">
          <img
            className="h-3.5 w-3.5"
            src="assets/icon-eyes.png"
            alt=""
            width="14"
            height="14"
          />
          <span className="font-nav text-text-main text-sm font-bold">
            8600
          </span>
        </div>
        <div className="shadow-badge absolute top-[20%] right-[10%] flex animate-bounce items-center gap-2 rounded-full bg-white px-4 py-2 delay-100">
          <img
            className="h-3.5 w-3.5"
            src="assets/icon-heart.png"
            alt=""
            width="14"
            height="14"
          />
          <span className="font-nav text-text-main text-sm font-bold">
            1520
          </span>
        </div>
        <div className="shadow-badge absolute bottom-[20%] left-[15%] flex animate-bounce items-center gap-2 rounded-full bg-white px-4 py-2 delay-200">
          <img
            className="h-3.5 w-3.5"
            src="assets/icon-save.png"
            alt=""
            width="14"
            height="14"
          />
          <span className="font-nav text-text-main text-sm font-bold">
            1160
          </span>
        </div>
        <div className="shadow-badge absolute right-[15%] bottom-[10%] flex animate-bounce items-center gap-2 rounded-full bg-white px-4 py-2 delay-300">
          <img
            className="h-3.5 w-3.5"
            src="assets/icon-chat.png"
            alt=""
            width="14"
            height="14"
          />
          <span className="font-nav text-text-main text-sm font-bold">730</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
        <h1 className="font-display text-brand mb-6 text-4xl leading-tight font-normal tracking-[-1px] uppercase md:text-[48px] md:tracking-[-1.5px] lg:text-[72px] lg:tracking-[-2px] xl:text-[96px] xl:tracking-[-3.84px]">
          TAKE OVER THE TIMELINE
        </h1>
        <p className="font-body text-text-muted mx-auto mb-8 max-w-[692px] text-base leading-relaxed font-medium tracking-tight md:text-lg lg:text-2xl">
          Ikuti rangkaian pelatihan digital kreatif terbesar dari Multimedia
          Digital Engagement untuk kuasai keahlian masa depan.
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

      <div className="relative z-10 mx-auto flex h-auto w-full max-w-[1200px] flex-wrap justify-center gap-1.5 px-6 lg:block lg:h-[260px] lg:px-0 xl:h-[304px]">
        <div className="lg:rounded-card shadow-badge relative h-[120px] w-[120px] -rotate-3 overflow-hidden rounded-[20px] bg-white md:h-[140px] md:w-[140px] lg:absolute lg:top-1/2 lg:left-[calc(50%-210px-95px)] lg:h-[190px] lg:w-[190px] lg:-translate-y-1/2 xl:left-[calc(50%-300px-132px)] xl:h-[264px] xl:w-[264px]">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=512&h=512&fit=crop&crop=face"
            alt="Portrait creative woman by the sea"
            className="h-full w-full rounded-[28px] object-cover"
          />
        </div>
        <div className="lg:rounded-card shadow-badge relative z-10 h-[120px] w-[120px] rotate-3 overflow-hidden rounded-[20px] bg-white md:h-[140px] md:w-[140px] lg:absolute lg:top-[calc(50%-20px)] lg:left-[calc(50%-70px-95px)] lg:h-[190px] lg:w-[190px] lg:-translate-y-1/2 xl:left-[calc(50%-100px-132px)] xl:h-[264px] xl:w-[264px]">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=512&h=512&fit=crop&crop=face"
            alt="Portrait man with red cap"
            className="h-full w-full rounded-[28px] object-cover"
          />
        </div>
        <div className="lg:rounded-card shadow-badge relative z-20 h-[120px] w-[120px] -rotate-3 overflow-hidden rounded-[20px] bg-white md:h-[140px] md:w-[140px] lg:absolute lg:top-[calc(50%+20px)] lg:left-[calc(50%+70px-95px)] lg:h-[190px] lg:w-[190px] lg:-translate-y-1/2 xl:left-[calc(50%+100px-132px)] xl:h-[264px] xl:w-[264px]">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=512&h=512&fit=crop&crop=face"
            alt="Portrait woman in pink top"
            className="h-full w-full rounded-[28px] object-cover"
          />
        </div>
        <div className="lg:rounded-card shadow-badge relative z-30 h-[120px] w-[120px] rotate-3 overflow-hidden rounded-[20px] bg-white md:h-[140px] md:w-[140px] lg:absolute lg:top-1/2 lg:left-[calc(50%+210px-95px)] lg:h-[190px] lg:w-[190px] lg:-translate-y-1/2 xl:left-[calc(50%+300px-132px)] xl:h-[264px] xl:w-[264px]">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=512&h=512&fit=crop&crop=face"
            alt="Portrait man with white sunglasses"
            className="h-full w-full rounded-[28px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
