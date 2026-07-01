export default function System() {
  return (
    <section className="py-[160px]" id="system">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="mb-[60px] text-center">
          <h2 className="font-display text-brand text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-[42px] lg:text-[72px] lg:leading-[72px]">
            THE SYSTEM THAT PROVIDES
          </h2>
        </div>

        <div className="mx-auto mb-[60px] flex max-w-[1280px] flex-col flex-wrap items-center justify-center gap-3 md:flex-row md:items-start">
          {/* Pills */}
          {[
            "Sistem Hybrid",
            "Mentor Ahli",
            "Software Industri",
            "Bahan Portofolio",
            "Arah yang Jelas",
            "Pembelajaran Santai",
            "Proyek Nyata",
            "Fokus Skill",
            "Konsistensi Mudah",
          ].map((label, i) => (
            <div
              key={i}
              className="bg-pill-bg rounded-btn flex h-[72px] w-full max-w-[400px] items-center gap-4 p-2 pr-6 md:h-[96px] md:w-auto md:pr-8"
            >
              <div className="bg-icon-bg shadow-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-full md:h-20 md:w-20">
                <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="font-body text-btn-secondary-text text-[18px] leading-[34.56px] font-semibold tracking-[-0.96px] whitespace-nowrap md:text-[24px] lg:text-[32px]">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-body text-text-muted mx-auto mb-10 max-w-[661px] text-center text-base font-medium md:text-lg">
          Belajar jadi lebih mudah karena kurikulum kami tersusun rapi dari
          dasar. Kamu akan dibimbing langkah demi langkah sampai berhasil
          membuat portofolio keren sendiri.
        </p>

        <div className="flex flex-col justify-center gap-2 md:flex-row">
          <a
            href="#cta"
            className="bg-brand text-bg-main rounded-pill font-nav shadow-cta-btn px-8 py-4 text-center text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Daftar Sekarang
          </a>
          <a
            href="#services"
            className="bg-pill-bg text-btn-secondary-text rounded-pill font-nav px-8 py-4 text-center text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-black/10"
          >
            Lihat Detail
          </a>
        </div>
      </div>
    </section>
  );
}
