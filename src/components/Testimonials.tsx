const testimonials = [
  {
    text: "Dulu bingung bikin layout web. Setelah ikut kelas UI Craft, sekarang paham workflow riset user sampai bikin komponen matang di Figma",
    name: 'Bayu',
    avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Bayu',
    rotation: 'testimonial-card--rotate-neg10'
  },
  {
    text: "Materinya daging banget! Membuka mata tentang pentingnya pentingnya komposisi grid dan psikologi warna untuk branding.",
    name: 'Raihan',
    avatar: 'https://ui-avatars.com/api/?background=f&color=fff&name=Raihan',
    rotation: 'testimonial-card--rotate-pos10'
  },
  {
    text: "Event multimedia paling worth it! Gabungan materi UI Craft dan teknik  visual lainnya jadi modal kuat buat nyusun portofolio pertama.",
    name: 'Siti',
    avatar: 'https://ui-avatars.com/api/?background=ft78kmn&color=fff&name=Siti',
    rotation: 'testimonial-card--rotate-neg10'
  },
  {
    text: "Sesi Videography seru parah! Trik angle dinamis dan dasar  editing video dikupas habis, sangat mudah dipahami pemula.",
    name: 'Nurul H.',
    avatar: 'https://ui-avatars.com/api/?background=75h5w3&color=fff&name=Nurul+H.',
    rotation: 'testimonial-card--rotate-neg5'
  },
  {
    text: "Belajar segitiga eksposur dan teknik teknik komposisi di sini sangat membantu. Hasil foto produk saya sekarang jauh lebih estetik dan profesional!",
    name: 'Zahra F.',
    avatar: 'https://ui-avatars.com/api/?background=98ibnh&color=fff&name=Zahra+F.',
    rotation: 'testimonial-card--rotate-pos5'
  }
]

export default function Testimonials() {
  return (
    <section className="testimonials section-spacing" id="testimonials">
      <div className="container">
        <div className="testimonials__heading">
          <h2 className="heading-h2" style={{ textAlign: 'center' }}>Real stories<br />from creators</h2>
        </div>

        <div className="testimonials__scattered">
          {/* Decorative icons */}
          <img src="/assets/icon-arrow2.png" alt="" className="testimonials__deco testimonials__deco--arrow" aria-hidden="true" />
          <img src="/assets/icon-cling.png" alt="" className="testimonials__deco testimonials__deco--bling" aria-hidden="true" />

          {/* Row 1: 3 cards */}
          <div className="testimonials__row">
            {testimonials.slice(0, 3).map((t, i) => (
              <div className={`testimonial-card ${t.rotation}`} key={i}>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    <img src={t.avatar} alt={t.name} />
                  </div>
                  <span className="testimonial-card__name">{t.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 2 cards */}
          <div className="testimonials__row testimonials__row--bottom">
            {testimonials.slice(3).map((t, i) => (
              <div className={`testimonial-card ${t.rotation}`} key={i}>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    <img src={t.avatar} alt={t.name} />
                  </div>
                  <span className="testimonial-card__name">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
