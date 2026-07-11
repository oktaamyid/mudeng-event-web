export default function Preview() {
    return (
        <section className="preview section-spacing" id="preview">
            <div className="container">
                <h2 className="preview__heading">
                    MUDENG PROVIDES PRACTICAL TRAINING TO BOOST YOUR CREATIVE
                    DIGITAL SKILL
                </h2>

                <div className="preview__video">
                    <video
                        src="/videos/boost-digital-skill.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    />
                </div>

                <p className="preview__desc text-subtitle">
                    Program ini dibuat agar proses belajar multimedia terasa
                    lebih sederhana, jelas, dan mudah Kamu ikuti sampai
                    menghasilkan karya nyata.
                </p>
            </div>
        </section>
    );
}
