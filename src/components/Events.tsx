import Link from "next/link";

export default function Events() {
  const events = [
    {
      id: "01",
      slug: "ui-craft",
      title: "UI Craft",
      desc: "Kelas intensif pembuatan desain antarmuka aplikasi dan website modern yang berfokus pada kemudahan pengguna.",
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1440&h=650&fit=crop",
    },
    {
      id: "02",
      slug: "creative-craft",
      title: "Creative Craft",
      desc: "Pelatihan pembuatan konten visual kreatif digital yang menarik perhatian dan berdampak luas di media sosial.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=650&fit=crop",
    },
    {
      id: "03",
      slug: "mucrex",
      title: "MUCREX",
      desc: "Wadah pameran karya multimedia gabungan sekaligus pelatihan tingkat lanjut untuk menghasilkan portofolio siap kerja.",
      image:
        "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1440&h=650&fit=crop",
    },
  ];

  return (
    <section className="py-[160px]" id="events">
      <div className="mx-auto max-w-360 px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-brand text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-[42px] lg:text-[72px] lg:leading-[72px]">
            SELECTED EVENTS
            <br />
            CRAFTED WITH PURPOSE
          </h2>
          <p className="font-body text-text-muted max-w-[672px] text-left text-[24px] leading-[29.76px] font-medium md:text-right">
            Ini adalah beberapa hasil nyata dari para peserta
            <br className="hidden md:block" />
            yang telah mengikuti program kami sebelumnya.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {events.map((evt, idx) => (
            <div
              key={idx}
              className="group relative h-[500px] w-full overflow-hidden rounded-[32px] bg-[#0a0a0a] md:h-[650px]"
            >
              <img
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={evt.image}
                alt={evt.title}
              />

              <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-[350px] bg-gradient-to-b from-transparent via-black/95 to-black"></div>

              <div
                className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[350px] backdrop-blur-[50px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.50) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 100%)",
                }}
              ></div>

              <div className="absolute top-[24px] left-[24px] z-30 max-w-[450px] md:top-[36px] md:left-[36px]">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="font-body text-[39px] leading-[44px] font-medium text-white/60">
                    {evt.id}
                  </span>
                  <h3 className="font-body text-[32px] leading-[34.56px] font-semibold text-white">
                    {evt.title}
                  </h3>
                </div>
                <p className="font-body mb-5 max-w-[440px] text-[15px] leading-[23.2px] font-medium text-white/85">
                  {evt.desc}
                </p>
                <Link
                  href={`/events/${evt.slug}`}
                  className="font-body inline-flex h-[49px] w-[200px] items-center justify-center rounded-[30px] bg-[#F8F9FA] text-[17px] leading-[27px] font-medium text-black shadow-[0px_6px_20px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] md:w-[250px]"
                >
                  Event details
                </Link>
              </div>

              <div className="absolute right-[24px] bottom-[24px] z-30 w-[calc(100%-48px)] md:right-[36px] md:bottom-[36px] md:w-[670px]">
                <div className="flex items-center justify-between py-[7px]">
                  <span className="font-body text-[15px] leading-[27px] font-medium text-white/70 md:text-[17px]">
                    Timeline
                  </span>
                  <span className="font-body text-right text-[15px] leading-[27px] font-medium text-white md:text-[17px]">
                    4 Minggu
                  </span>
                </div>
                <div className="h-[1px] w-full bg-white/15"></div>
                <div className="flex items-center justify-between py-[7px]">
                  <span className="font-body text-[15px] leading-[27px] font-medium text-white/70 md:text-[17px]">
                    Service
                  </span>
                  <span className="font-body text-right text-[15px] leading-[27px] font-medium text-white md:text-[17px]">
                    UI/UX Design
                  </span>
                </div>
                <div className="h-[1px] w-full bg-white/15"></div>
                <div className="flex items-center justify-between py-[7px]">
                  <span className="font-body text-[15px] leading-[27px] font-medium text-white/70 md:text-[17px]">
                    Project Kickoff
                  </span>
                  <span className="font-body text-right text-[15px] leading-[27px] font-medium text-white md:text-[17px]">
                    Juli 2025
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
