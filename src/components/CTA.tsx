export default function CTA() {
  return (
    <section
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden py-[180px] text-center md:min-h-[700px]"
      id="cta"
    >
      {/* Background Images */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=370&fit=crop"
          alt=""
          className="absolute top-[8%] left-[5%] h-[220px] w-[180px] -rotate-[22deg] rounded-[30px] object-cover opacity-90"
        />
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
          alt=""
          className="absolute top-[2%] right-[20%] h-[200px] w-[200px] rotate-[5deg] rounded-[30px] object-cover opacity-90"
        />
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=350&h=300&fit=crop"
          alt=""
          className="absolute top-[35%] right-[2%] h-[155px] w-[180px] rotate-[22deg] rounded-[30px] object-cover opacity-90"
        />
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=350&h=300&fit=crop"
          alt=""
          className="absolute bottom-[15%] left-[3%] h-[145px] w-[170px] -rotate-[15deg] rounded-[30px] object-cover opacity-90"
        />
        <img
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=350&h=300&fit=crop"
          alt=""
          className="absolute bottom-[2%] left-[25%] h-[145px] w-[170px] rotate-[10deg] rounded-[30px] object-cover opacity-90"
        />
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=370&fit=crop"
          alt=""
          className="absolute right-[5%] bottom-[5%] h-[220px] w-[180px] rotate-[15deg] rounded-[30px] object-cover opacity-90"
        />
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=370&fit=crop"
          alt=""
          className="absolute top-[5%] left-[28%] h-[200px] w-[160px] rotate-[12deg] rounded-[30px] object-cover opacity-90"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[600px] flex-col items-center px-4">
        <h2 className="font-display mb-6 text-center text-[40px] leading-[42px] font-normal text-[#7254E3] uppercase md:text-[72px] md:leading-[72px]">
          LEARN BETTER
          <br />
          BUILD SMARTER
        </h2>
        <p className="font-body mx-auto mb-8 max-w-[587px] text-center text-[18px] leading-[24px] font-medium text-[#1a1a1a]/65 md:text-[24px] md:leading-[29.76px]">
          Nggak perlu bingung lagi soal karir kreatif. Yuk, bikin portofolio
          keren bareng MUDENG lewat bimbingan yang jelas dan terarah.
        </p>
        <a
          href="#"
          className="font-body inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#6667E4] to-[#6667E4]/80 px-5 py-2.5 text-[14px] leading-[23.25px] font-medium text-white shadow-[0px_10px_20px_rgba(31,81,218,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_14px_28px_rgba(31,81,218,0.4)]"
        >
          Daftar Sekarang
        </a>
      </div>
    </section>
  );
}
