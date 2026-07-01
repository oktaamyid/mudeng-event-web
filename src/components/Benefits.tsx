export default function Benefits() {
  return (
    <section className="py-[160px]" id="services">
      <div className="mx-auto max-w-360 px-0">
        <div className="mb-12 flex flex-col items-start justify-between gap-10 px-4 md:flex-row md:items-end md:px-[240px]">
          <h2 className="font-display text-brand max-w-[400px] text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-[42px] lg:text-[72px] lg:leading-[72px]">
            MUDENG PROCESS AND SERVICES
          </h2>
          <p className="font-body text-text-muted max-w-[672px] text-left text-base font-medium md:text-right md:text-lg">
            Setiap kelas dilengkapi dengan metode pembelajaran yang terstruktur,
            mentorship, dan kesempatan mengerjakan real-project untuk memastikan
            kamu siap terjun ke dunia industri kreatif.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="shadow-card group relative h-[360px] cursor-pointer overflow-hidden rounded-[24px] border-4 border-white transition-transform duration-300 hover:scale-[1.02] md:h-[420px] lg:h-[480px] xl:h-[560px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop"
                alt="UI/UX Design Service"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[224px] bg-gradient-to-b from-transparent to-[#1a1a1a]/80"></div>
            <div className="pointer-events-none absolute right-8 bottom-8 left-8 z-10">
              <div className="font-body text-text-card-tag mb-1.5 text-[16px] leading-[19.84px] font-medium tracking-[-0.32px]">
                Interactive Course
              </div>
              <h3 className="font-body mb-3 text-[20px] leading-[24px] font-semibold tracking-[-0.96px] text-white md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[34.56px]">
                UI/UX Design Masterclass
              </h3>
              <p className="font-body text-text-card-tag text-[16px] leading-[20px] font-medium tracking-[-0.36px] lg:text-[18px] lg:leading-[22.32px]">
                Belajar merancang antarmuka digital yang intuitif dan menarik
                menggunakan metodologi riset pengguna.
              </p>
            </div>
          </div>

          <div className="shadow-card group relative h-[360px] cursor-pointer overflow-hidden rounded-[24px] border-4 border-white transition-transform duration-300 hover:scale-[1.02] md:h-[420px] lg:h-[480px] xl:h-[560px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1574717024453-354056aaddfa?w=600&h=800&fit=crop"
                alt="Videography Service"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[224px] bg-gradient-to-b from-transparent to-[#1a1a1a]/80"></div>
            <div className="pointer-events-none absolute right-8 bottom-8 left-8 z-10">
              <div className="font-body text-text-card-tag mb-1.5 text-[16px] leading-[19.84px] font-medium tracking-[-0.32px]">
                Practical Workshop
              </div>
              <h3 className="font-body mb-3 text-[20px] leading-[24px] font-semibold tracking-[-0.96px] text-white md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[34.56px]">
                Creative Videography
              </h3>
              <p className="font-body text-text-card-tag text-[16px] leading-[20px] font-medium tracking-[-0.36px] lg:text-[18px] lg:leading-[22.32px]">
                Pahami teknik pengambilan gambar, pencahayaan, dan editing untuk
                membuat video yang sinematik.
              </p>
            </div>
          </div>

          <div className="shadow-card group relative h-[360px] cursor-pointer overflow-hidden rounded-[24px] border-4 border-white transition-transform duration-300 hover:scale-[1.02] md:h-[420px] lg:h-[480px] xl:h-[560px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=800&fit=crop"
                alt="Graphic Design Service"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[224px] bg-gradient-to-b from-transparent to-[#1a1a1a]/80"></div>
            <div className="pointer-events-none absolute right-8 bottom-8 left-8 z-10">
              <div className="font-body text-text-card-tag mb-1.5 text-[16px] leading-[19.84px] font-medium tracking-[-0.32px]">
                Bootcamp Program
              </div>
              <h3 className="font-body mb-3 text-[20px] leading-[24px] font-semibold tracking-[-0.96px] text-white md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[34.56px]">
                Graphic Design & Branding
              </h3>
              <p className="font-body text-text-card-tag text-[16px] leading-[20px] font-medium tracking-[-0.36px] lg:text-[18px] lg:leading-[22.32px]">
                Kuasai seni komunikasi visual dan bangun identitas brand yang
                kuat dengan aset grafis profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
