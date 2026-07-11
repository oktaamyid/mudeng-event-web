const modules = [
    {
        number: "01",
        title: "UI Craft",
        desc: "Kuasai dasar desain antarmuka aplikasi dan website yang rapi serta nyaman digunakan.",
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
        lessons: [
            "Pengenalan dasar UI/UX Design",
            "Cara riset kebutuhan pengguna",
            "Membuat kerangka desain awal",
            "Memilih kombinasi warna dan huruf",
            "Praktek membuat desain di Figma",
            "Membuat komponen desain yang rapi",
            "Menyusun desain portofolio pertama",
        ],
        tags: [
            { label: "Figma", color: "var(--color-badge-red)" },
            { label: "App Design", color: "var(--color-badge-blue)" },
            { label: "Portofolio", color: "var(--color-badge-green)" },
        ],
        headerClass: "",
        iconClass: "",
    },
    {
        number: "02",
        title: "Graphic Desain",
        desc: "Pelajari seni visual untuk komunikasi brand yang berdampak dan menarik bagi audiens.",
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        ),
        lessons: [
            "Membedah brief & konsep ide visual",
            "Psikologi warna dalam desain branding",
            "Menguasai tipografi dalam desain",
            "Teknik pembuatan logo & identitas visual",
            "Prinsip tata letak & komposisi grid",
            "Desain kemasan & materi promosi",
            "Merancang portofolio profesional",
        ],
        tags: [
            { label: "Layout", color: "var(--color-badge-red)" },
            { label: "Sosmed", color: "var(--color-badge-orange)" },
            { label: "Branding", color: "var(--color-badge-blue)" },
        ],
        headerClass: "",
        iconClass: "",
    },
    {
        number: "03",
        title: "Photography",
        desc: "Gunakan kamera untuk menangkap cerita dan menciptakan karya visual yang menakjubkan.",
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
            </svg>
        ),
        lessons: [
            "Memahami dasar-dasar eksposur",
            "Menguasai komposisi dan teknik pembingkaian",
            "Menggunakan teknik pencahayaan",
            "Teknik pengambilan gambar",
            "Menstabilkan kamera dan teknik handheld",
            "Dasar workflow editing di Lightroom/Photoshop",
            "Mempersiapkan karya untuk kurasi dan pameran",
        ],
        tags: [
            { label: "Teknik", color: "var(--color-badge-green)" },
            { label: "Editing", color: "var(--color-badge-orange)" },
            { label: "Idea", color: "var(--color-badge-red)" },
        ],
        headerClass: "curriculum-card__header--alt",
        iconClass: "curriculum-card__icon--alt",
    },
];

export default function Curriculum() {
    return (
        <section className="curriculum section-spacing" id="curriculum">
            <div className="container">
                <div className="curriculum__header">
                    <p className="curriculum__subtitle text-subtitle">
                        Kuasai berbagai keahlian digital kreatif mulai dari
                        desain antarmuka, pembuatan konten visual, hingga
                        kolaborasi proyek multimedia.
                    </p>
                    <h2 className="curriculum__heading">
                        What this
                        <br />
                        teaches you
                    </h2>
                </div>

                <div className="curriculum__grid">
                    {modules.map((mod, i) => (
                        <div className="curriculum-card" key={i}>
                            <div
                                className={`curriculum-card__header ${mod.headerClass}`}
                            >
                                <div className="curriculum-card__top">
                                    <div
                                        className={`curriculum-card__icon ${mod.iconClass}`}
                                    >
                                        {mod.icon}
                                    </div>
                                    <span className="curriculum-card__number">
                                        {mod.number}
                                    </span>
                                </div>
                                <div className="curriculum-card__info">
                                    <h3 className="curriculum-card__title">
                                        {mod.title}
                                    </h3>
                                    <p className="curriculum-card__desc">
                                        {mod.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="curriculum-card__details">
                                <div className="curriculum-card__lessons-title">
                                    What you'll learn
                                </div>
                                <div className="curriculum-card__lessons">
                                    {mod.lessons.map((lesson, j) => (
                                        <div
                                            className="curriculum-card__lesson"
                                            key={j}
                                        >
                                            <span className="curriculum-card__lesson-num">
                                                {j + 1}.
                                            </span>{" "}
                                            {lesson}
                                        </div>
                                    ))}
                                </div>
                                <div className="curriculum-card__tags-title">
                                    Key themes
                                </div>
                                <div className="curriculum-card__tags">
                                    {mod.tags.map((tag, k) => (
                                        <div className="tag-pill" key={k}>
                                            <div
                                                className="tag-pill__icon"
                                                style={{
                                                    background: tag.color,
                                                }}
                                            ></div>{" "}
                                            {tag.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Banner */}
                <div className="curriculum__banner">
                    <div className="">
                        <img src="/assets/mask-group.svg" alt="" />
                    </div>
                    <div className="curriculum__banner-text">
                        <div className="curriculum__banner-title">
                            Sudah siap tingkatkan skill Kamu?
                        </div>
                        <div className="curriculum__banner-desc">
                            Pelatihan ini dirancang praktis agar Kamu bisa
                            langsung praktek membuat karya portofolio.
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:flex-row">
                        <a
                            href="#cta"
                            className="bg-brand font-body inline-block rounded-[100px] px-[28px] py-[13px] text-[16px] font-medium !text-white transition-transform hover:scale-105"
                        >
                            Daftar Sekarang
                        </a>
                        <a
                            href="#services"
                            className="bg-brand-light text-text-main font-body inline-block rounded-[100px] px-[28px] py-[13px] text-[16px] font-medium transition-transform hover:scale-105"
                        >
                            Lihat Detail
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
