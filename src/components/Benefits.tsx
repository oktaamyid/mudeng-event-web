const benefitCards = [
    {
        image: "/event/assets/image3.png",
        tag: "Real momentum",
        title: "UI Craft",
        desc: "Pelatihan pembuatan desain antarmuka aplikasi dan website modern.",
    },
    {
        image: "/event/assets/image2.png",
        tag: "No more falling off",
        title: "Graphic Desain",
        desc: "Pelatihan eksklusif komunikasi visual dan desain grafis modern.",
    },
    {
        image: "/event/assets/image1.png",
        tag: "Never stuck again",
        title: "Photography",
        desc: "Pelatihan eksklusif teknik fotografi digital dan komposisi visual.",
    },
    {
        image: "/event/assets/image1.png",
        tag: "Growth with payoff",
        title: "Videography",
        desc: "Pelatihan eksklusif produksi video kreatif dan teknik sinematografi.",
    },
    {
        image: "/event/assets/digital-art.png",
        tag: "Likes, comments, saves",
        title: "Digital ART",
        desc: "Pelatihan eksklusif ilustrasi digital dan seni visual modern.",
    },
    {
        image: "/event/assets/motion.png",
        tag: "You're ready now",
        title: "Motion Graphic",
        desc: "Pelatihan eksklusif animasi grafis dan efek visual modern.",
    },
];

export default function Benefits() {
    return (
        <section className="benefits section-spacing" id="services">
            <div className="container px-4 lg:px-6 xl:px-[240px]">
                <div className="benefits__header">
                    <h2 className="benefits__heading">
                        You'll love
                        <br />
                        this course
                    </h2>
                    <p className="benefits__subtitle text-subtitle">
                        Pilih program intensif yang sesuai dengan minat dan
                        tujuan karir kamu di industri digital kreatif.
                    </p>
                </div>

                <div className="benefits__grid">
                    {benefitCards.map((card, i) => (
                        <div className="benefit-card" key={i}>
                            <div className="benefit-card__image">
                                <img src={card.image} alt={card.title} />
                            </div>
                            <div className="benefit-card__gradient"></div>
                            <div className="benefit-card__content">
                                <div className="benefit-card__tag">
                                    {card.tag}
                                </div>
                                <h3 className="benefit-card__title">
                                    {card.title}
                                </h3>
                                <p className="benefit-card__desc">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
