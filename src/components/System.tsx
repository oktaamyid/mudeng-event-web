import Link from "next/link"

const pills = [
  'Sistem Hybrid', 'Mentor Ahli', 'Software Industri',
  'Bahan Portofolio', 'Arah yang Jelas', 'Pembelajaran Santai',
  'Proyek Nyata', 'Fokus Skill', 'Konsistensi Mudah'
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

export default function System() {
  return (
    <section className="system section-spacing" id="system">
      <div className="container">
        <div className="system__heading">
          <h2 className="heading-h2">THE SYSTEM THAT PROVIDES</h2>
        </div>

        <div className="system__pills">
          {pills.map((label, i) => (
            <div className="system__pill" key={i}>
              <div className="system__pill-icon">
                <CheckIcon />
              </div>
              <span className="system__pill-label">{label}</span>
            </div>
          ))}
        </div>

        <p className="system__text text-subtitle">
          Belajar jadi lebih mudah karena kurikulum kami tersusun rapi dari dasar. Kamu akan dibimbing langkah demi langkah sampai berhasil membuat portofolio keren sendiri.
        </p>

        <div className="flex items-center justify-center gap-2 md:flex-row">
          <Link href="#cta" className="inline-block bg-brand !text-white font-body font-medium text-[16px] py-[13px] px-[28px] rounded-[100px] transition-transform hover:scale-105">Daftar Sekarang</Link>
          <Link href="#services" className="inline-block bg-brand-light text-text-muted font-body font-medium text-[16px] py-[13px] px-[28px] rounded-[100px] transition-transform hover:scale-105">Lihat Detail</Link>
        </div>
      </div>
    </section>
  )
}
