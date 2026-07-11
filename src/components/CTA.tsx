const photo = "/assets/user.png";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative pt-96 pb-32 overflow-hidden"
    >
      {/* Object */}
      <div className="absolute inset-x-0 top-0 hidden md:flex justify-center px-6 md:px-16 pointer-events-none">
        <img
          src={photo}
          alt=""
          draggable={false}
          className="
            w-full
            max-w-[1600px]
            select-none
          "
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-[820px] text-center">
        <h2 className="heading-h2-large mb-6">
          LEARN BETTER
          <br />
          BUILD SMARTER
        </h2>

        <p className="text-subtitle max-w-[560px] mx-auto mb-10">
          Nggak perlu bingung lagi soal karir kreatif. Yuk, bikin portofolio
          keren bareng MUDENG lewat bimbingan yang jelas dan terarah.
        </p>

        <a href="#" className="inline-block bg-brand !text-white font-body font-medium text-[16px] py-[13px] px-[28px] rounded-[100px] transition-transform hover:scale-105">
          Daftar Sekarang
        </a>
      </div>
    </section>
  );
}