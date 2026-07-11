const photo = "/assets/user.png";

export default function CTA() {
    return (
        <section id="cta" className="relative overflow-hidden pt-96 pb-32">
            {/* Object */}
            <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center px-6 md:flex md:px-16">
                <img
                    src={photo}
                    alt=""
                    draggable={false}
                    className="w-full max-w-[1600px] select-none"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto max-w-[820px] text-center">
                <h2 className="heading-h2-large mb-6">
                    LEARN BETTER
                    <br />
                    BUILD SMARTER
                </h2>

                <p className="text-subtitle mx-auto mb-10 max-w-[560px]">
                    Nggak perlu bingung lagi soal karir kreatif. Yuk, bikin
                    portofolio keren bareng MUDENG lewat bimbingan yang jelas
                    dan terarah.
                </p>

                <a
                    href="#"
                    className="bg-brand font-body inline-block rounded-[100px] px-[28px] py-[13px] text-[16px] font-medium !text-white transition-transform hover:scale-105"
                >
                    Daftar Sekarang
                </a>
            </div>
        </section>
    );
}
