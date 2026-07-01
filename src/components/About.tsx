export default function About() {
  return (
    <section className="py-[160px] text-center" id="about">
      <div className="mx-auto max-w-360 px-6 lg:px-[240px]">
        <h2 className="font-display text-brand mb-6 text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-[42px] lg:text-[72px] lg:leading-[72px]">
          MUDENG IS A MODERN CREATIVE
        </h2>
        <p className="font-body text-text-muted mx-auto mb-[60px] max-w-[720px] text-base font-medium md:text-[18px]">
          MUDENG adalah wadah kreatif modern yang fokus mengembangkan keahlian
          multimedia melalui pelatihan interaktif guna mempersiapkan talenta
          digital masa depan yang siap kerja.
        </p>

        <div className="mb-[60px] flex flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-0">
          <div className="md:after:bg-divider relative min-w-[160px] flex-none px-6 text-center md:after:absolute md:after:top-0 md:after:right-0 md:after:bottom-0 md:after:w-[1px] md:after:content-['']">
            <div className="font-body text-stat mb-2 text-[40px] leading-[48px] font-medium tracking-[-2.2px]">
              500<span>+</span>
            </div>
            <div className="font-body text-footer-muted text-[17px] leading-[27px] font-medium tracking-[-0.63px]">
              Peserta Berpartisipasi
            </div>
          </div>
          <div className="md:after:bg-divider relative min-w-[160px] flex-none px-6 text-center md:after:absolute md:after:top-0 md:after:right-0 md:after:bottom-0 md:after:w-[1px] md:after:content-['']">
            <div className="font-body text-stat mb-2 text-[40px] leading-[48px] font-medium tracking-[-2.2px]">
              3
            </div>
            <div className="font-body text-footer-muted text-[17px] leading-[27px] font-medium tracking-[-0.63px]">
              Kategori Pelatihan Utama
            </div>
          </div>
          <div className="md:after:bg-divider relative min-w-[160px] flex-none px-6 text-center md:after:absolute md:after:top-0 md:after:right-0 md:after:bottom-0 md:after:w-[1px] md:after:content-['']">
            <div className="font-body text-stat mb-2 text-[40px] leading-[48px] font-medium tracking-[-2.2px]">
              10<span>+</span>
            </div>
            <div className="font-body text-footer-muted text-[17px] leading-[27px] font-medium tracking-[-0.63px]">
              Mentor Berpengalaman
            </div>
          </div>
          <div className="relative min-w-[160px] flex-none px-6 text-center">
            <div className="font-body text-stat mb-2 text-[40px] leading-[48px] font-medium tracking-[-2.2px]">
              100<span>%</span>
            </div>
            <div className="font-body text-footer-muted text-[17px] leading-[27px] font-medium tracking-[-0.63px]">
              Berorientasi Portofolio
            </div>
          </div>
        </div>

        <div className="rounded-card relative mx-auto aspect-[1200/650] w-full max-w-[1200px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=650&fit=crop"
            alt="MUDENG creative workshop video preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-[2.5px] transition-colors duration-200 hover:bg-white/40">
            <svg
              viewBox="0 0 24 24"
              className="ml-[3px] h-[22px] w-[22px] fill-white"
            >
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
