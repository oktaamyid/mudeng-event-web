const tools = [
    { name: "instagram", label: "Instagram", img: "/assets/logo-ig.png" },
    { name: "canva", label: "Canva", img: "/assets/logo-canva.png" },
    { name: "figma", label: "Figma", img: "/assets/logo-figma.png" },
    { name: "linkedin", label: "LinkedIn", img: "/assets/logo-linkedin.png" },
    { name: "capcut", label: "CapCut", img: "/assets/logo-capcut.png" },
    {
        name: "photoshop",
        label: "Photoshop",
        img: "/assets/logo-photoshop.png",
    },
    { name: "dribbble", label: "Dribbble", img: "/assets/logo-dribble.png" },
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
                            src="/assets/icon-arrow.png"
                            alt=""
                        />
                        <img
                            className="approach__deco approach__deco--cling-1"
                            src="/assets/icon-cling.png"
                            alt=""
                        />
                        <img
                            className="approach__deco approach__deco--tali"
                            src="/assets/icon-tali.png"
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
