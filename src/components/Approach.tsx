const tools = [
    { name: "instagram", label: "Instagram", img: "/event/assets/logo-ig.png" },
    { name: "canva", label: "Canva", img: "/event/assets/logo-canva.png" },
    { name: "figma", label: "Figma", img: "/event/assets/logo-figma.png" },
    { name: "linkedin", label: "LinkedIn", img: "/event/assets/logo-linkedin.png" },
    { name: "capcut", label: "CapCut", img: "/event/assets/logo-capcut.png" },
    {
        name: "photoshop",
        label: "Photoshop",
        img: "/event/assets/logo-photoshop.png",
    },
    { name: "dribbble", label: "Dribbble", img: "/event/assets/logo-dribble.png" },
];

const benefits = [
    {
        title: "Kuasai Skill Global",
        desc: "Pelajari desain standar industri untuk portofolio yang bersaing.",
    },
    {
        title: "Mentor Expert",
        desc: "Bimbingan intensif dari para praktisi multimedia berpengalaman.",
    },
    {
        title: "Hybrid Learning",
        desc: "Kombinasi sesi online fleksibel dan pertemuan offline interaktif.",
    },
];

export default function Approach() {
    return (
        <section className="approach section-spacing" id="approach">
            <div className="container">
                <div className="approach__content">
                    <div className="approach__icons">
                        {tools.map((tool) => (
                            <div
                                className={`approach__icon approach__icon--${tool.name}`}
                                key={tool.name}
                            >
                                <img src={tool.img} alt={tool.label} />
                            </div>
                        ))}
                        <img
                            className="approach__deco approach__deco--arrow-1"
                            src="/event/assets/icon-arrow.png"
                            alt=""
                        />
                        <img
                            className="approach__deco approach__deco--cling-1"
                            src="/event/assets/icon-cling.png"
                            alt=""
                        />
                        <img
                            className="approach__deco approach__deco--tali"
                            src="/event/assets/icon-tali.png"
                            alt=""
                        />
                    </div>

                    <h2 className="approach__heading heading-h2">
                        MUDENG CREATIVE
                        <br />
                        POWERHOUSE
                    </h2>

                    <div className="approach__benefits">
                        {benefits.map((benefit, i) => (
                            <div className="approach__benefit" key={i}>
                                <h3 className="approach__benefit-title">
                                    {benefit.title}
                                </h3>
                                <p className="approach__benefit-desc">
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
