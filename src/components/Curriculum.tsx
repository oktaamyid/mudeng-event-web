export default function Curriculum() {
  return (
    <section className="py-[160px]" id="curriculum">
      <div className="mx-auto max-w-360 px-0">
        <div className="mb-12 flex flex-col items-center px-6 text-center md:items-start md:text-left lg:px-[120px] xl:px-[240px]">
          <p className="font-body text-text-muted mb-4 max-w-[700px] text-base font-medium md:text-lg">
            Kuasai berbagai keahlian digital kreatif mulai dari desain
            antarmuka, pembuatan konten visual, hingga kolaborasi proyek
            multimedia.
          </p>
          <h2 className="font-display text-brand text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-[42px] lg:text-[72px] lg:leading-[72px]">
            What this
            <br />
            teaches you
          </h2>
        </div>

        <div className="mb-[80px] grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Card 1 */}
          <div className="shadow-card flex flex-col overflow-hidden rounded-[32px] bg-white">
            <div className="flex min-h-[304px] flex-col justify-between rounded-[28px] bg-[#6849E1] p-8">
              <div className="flex items-start justify-between">
                <div className="shadow-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#6849E1]">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="font-body text-base font-medium text-white/65">
                  01
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="font-body mb-2 text-[24px] leading-[34.56px] font-semibold tracking-[-0.96px] text-white md:text-[32px]">
                  UI Craft
                </h3>
                <p className="font-body text-lg leading-[22.32px] font-medium tracking-[-0.36px] text-white/65">
                  Kuasai dasar desain antarmuka aplikasi dan website yang rapi
                  serta nyaman digunakan.
                </p>
              </div>
            </div>
            <div className="border-divider flex flex-1 flex-col border-t p-8">
              <div className="text-text-muted mb-3 text-base font-medium">
                What you'll learn
              </div>
              <div className="mb-6 flex flex-col gap-1.5">
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">1.</span>{" "}
                  Pengenalan dasar UI/UX Design
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">2.</span> Cara
                  riset kebutuhan pengguna
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">3.</span>{" "}
                  Membuat kerangka desain awal
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">4.</span>{" "}
                  Memilih kombinasi warna dan huruf
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">5.</span>{" "}
                  Praktek membuat desain di Figma
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">6.</span>{" "}
                  Membuat komponen desain yang rapi
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">7.</span>{" "}
                  Menyusun desain portofolio pertama
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-text-muted mb-3 text-base font-medium">
                  Key themes
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-red h-3.5 w-3.5 rounded-full"></div>{" "}
                    Figma
                  </div>
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-blue h-3.5 w-3.5 rounded-full"></div>{" "}
                    App Design
                  </div>
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-green h-3.5 w-3.5 rounded-full"></div>{" "}
                    Portofolio
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="shadow-card flex flex-col overflow-hidden rounded-[32px] bg-white">
            <div className="flex min-h-[304px] flex-col justify-between rounded-[28px] bg-[#7C7AEA] p-8">
              <div className="flex items-start justify-between">
                <div className="shadow-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#7C7AEA]">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="font-body text-base font-medium text-white/65">
                  02
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="font-body mb-2 text-[24px] leading-[34.56px] font-semibold tracking-[-0.96px] text-white md:text-[32px]">
                  Creative Craft
                </h3>
                <p className="font-body text-lg leading-[22.32px] font-medium tracking-[-0.36px] text-white/65">
                  Pelajari cara membuat konten visual kreatif yang menarik dan
                  disukai banyak orang.
                </p>
              </div>
            </div>
            <div className="border-divider flex flex-1 flex-col border-t p-8">
              <div className="text-text-muted mb-3 text-base font-medium">
                What you'll learn
              </div>
              <div className="mb-6 flex flex-col gap-1.5">
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">1.</span> Dasar
                  kreativitas visual digital
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">2.</span> Cara
                  mencari ide konten segar
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">3.</span>{" "}
                  Membuat desain grafis menarik
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">4.</span> Trik
                  editing video sederhana
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">5.</span>{" "}
                  Praktek membuat konten di Canva
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">6.</span>{" "}
                  Menata layout konten media sosial
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">7.</span>{" "}
                  Menyusun strategi visual yang konsisten
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-text-muted mb-3 text-base font-medium">
                  Key themes
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-red h-3.5 w-3.5 rounded-full"></div>{" "}
                    Hooks
                  </div>
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-orange h-3.5 w-3.5 rounded-full"></div>{" "}
                    Formats
                  </div>
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-blue h-3.5 w-3.5 rounded-full"></div>{" "}
                    Messaging
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="shadow-card mx-auto flex w-full flex-col overflow-hidden rounded-[32px] bg-white md:col-span-2 md:w-1/2 xl:col-span-1 xl:w-full">
            <div className="flex min-h-[304px] flex-col justify-between rounded-[28px] bg-[#00BFFF] p-8">
              <div className="flex items-start justify-between">
                <div className="shadow-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#00BFFF]">
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
                  </svg>
                </div>
                <span className="font-body text-base font-medium text-white/65">
                  03
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="font-body mb-2 text-[24px] leading-[34.56px] font-semibold tracking-[-0.96px] text-white md:text-[32px]">
                  MUCREX
                </h3>
                <p className="font-body text-lg leading-[22.32px] font-medium tracking-[-0.36px] text-white/65">
                  Gabungkan seluruh keahlian multimedia Kamu ke dalam proyek
                  nyata dan pameran karya.
                </p>
              </div>
            </div>
            <div className="border-divider flex flex-1 flex-col border-t p-8">
              <div className="text-text-muted mb-3 text-base font-medium">
                What you'll learn
              </div>
              <div className="mb-6 flex flex-col gap-1.5">
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">1.</span>{" "}
                  Penggabungan berbagai media digital
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">2.</span>{" "}
                  Manajemen proyek kreatif kelompok
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">3.</span>{" "}
                  Mengolah aset visual tingkat lanjut
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">4.</span>{" "}
                  Mempersiapkan karya untuk ekshibisi
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">5.</span> Cara
                  presentasi hasil karya digital
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">6.</span>{" "}
                  Evaluasi karya bersama mentor ahli
                </div>
                <div className="text-text-main flex gap-3 text-base leading-[23px]">
                  <span className="text-text-muted min-w-[20px]">7.</span>{" "}
                  Memoles portofolio standar industri
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-text-muted mb-3 text-base font-medium">
                  Key themes
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-green h-3.5 w-3.5 rounded-full"></div>{" "}
                    Growth
                  </div>
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-orange h-3.5 w-3.5 rounded-full"></div>{" "}
                    Scaling
                  </div>
                  <div className="bg-pill-bg rounded-pill text-text-main flex items-center gap-2 px-4 py-1.5 text-base font-medium">
                    <div className="bg-badge-red h-3.5 w-3.5 rounded-full"></div>{" "}
                    Results
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="shadow-card flex flex-col items-center justify-between gap-6 rounded-[32px] bg-[#0a0a0a] p-8 text-center md:p-12 lg:flex-row lg:items-center lg:gap-10 lg:text-left">
          <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 lg:mx-0">
            <svg viewBox="0 0 24 24" fill="white" className="h-8 w-8">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-body mb-2 text-[24px] font-semibold text-white md:text-[32px]">
              Sudah siap tingkatkan skill Kamu?
            </div>
            <div className="font-body mx-auto max-w-[600px] text-base font-medium text-white/65 md:text-lg lg:mx-0">
              Pelatihan ini dirancang praktis agar Kamu bisa langsung praktek
              membuat karya portofolio.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            <a
              href="#cta"
              className="bg-brand text-bg-main rounded-pill font-nav shadow-cta-btn w-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:w-auto"
            >
              Daftar Sekarang
            </a>
            <a
              href="#services"
              className="rounded-pill font-nav w-full bg-white/10 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 md:w-auto"
            >
              Lihat Detail
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
