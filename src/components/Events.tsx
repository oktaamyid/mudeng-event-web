const events = [
  {
    number: '01',
    title: 'UI Craft',
    desc: 'Kelas intensif pembuatan desain antarmuka aplikasi dan website modern yang berfokus pada kemudahan pengguna.',
    image: '/assets/ui-craft.png',
    timeline: '4 Minggu',
    service: 'UI/UX Design',
    kickoff: 'Juli 2025'
  },
  {
    number: '02',
    title: 'Creative Craft',
    desc: 'Pelatihan pembuatan konten visual kreatif digital yang menarik perhatian dan berdampak luas di media sosial.',
    image: '/assets/creative-craft.png',
    timeline: '4 Minggu',
    service: 'UI/UX Design',
    kickoff: 'Juli 2025'
  },
  {
    number: '03',
    title: 'MUCREX',
    desc: 'Wadah pameran karya multimedia gabungan sekaligus pelatihan tingkat lanjut untuk menghasilkan portofolio siap kerja.',
    image: '/assets/mucrex.png',
    timeline: '4 Minggu',
    service: 'UI/UX Design',
    kickoff: 'Juli 2025'
  }
]

export default function Events() {
  return (
    <section className="events section-spacing" id="events">
      <div className="container">
        <div className="events__header">
          <h2 className="events__heading">SELECTED EVENTS<br />CRAFTED WITH PURPOSE</h2>
          <p className="events__subtitle">
            Ini adalah beberapa hasil nyata dari para peserta<br />yang telah mengikuti program kami sebelumnya.
          </p>
        </div>

        <div className="events__list">
          {events.map((event, i) => (
            <div className="event-card" key={i}>
              <img className="event-card__image" src={event.image} alt={`${event.title} Event`} />
              <div className="event-card__overlay"></div>
              <div className="event-card__blur-overlay"></div>
              <div className="event-card__top">
                <div className="event-card__header">
                  <span className="event-card__number">{event.number}</span>
                  <h3 className="event-card__title">{event.title}</h3>
                </div>
                <p className="event-card__desc">{event.desc}</p>
                <a href="#" className="event-card__btn">Event details</a>
              </div>
              <div className="event-card__meta">
                <div className="event-card__meta-row">
                  <span className="event-card__meta-label">Timeline</span>
                  <span className="event-card__meta-value">{event.timeline}</span>
                </div>
                <div className="event-card__meta-divider"></div>
                <div className="event-card__meta-row">
                  <span className="event-card__meta-label">Service</span>
                  <span className="event-card__meta-value">{event.service}</span>
                </div>
                <div className="event-card__meta-divider"></div>
                <div className="event-card__meta-row">
                  <span className="event-card__meta-label">Project Kickoff</span>
                  <span className="event-card__meta-value">{event.kickoff}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}