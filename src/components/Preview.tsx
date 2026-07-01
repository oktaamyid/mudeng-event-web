export default function Preview() {
  return (
    <section className="py-[160px]" id="preview">
      <div className="mx-auto max-w-360 px-6 text-center lg:px-[120px] xl:px-[240px]">
        <h2 className="font-display text-brand mx-auto mb-12 max-w-[1000px] text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-[42px] lg:text-[72px] lg:leading-[72px]">
          MUDENG PROVIDES PRACTICAL TRAINING TO BOOST YOUR CREATIVE DIGITAL
          SKILL
        </h2>

        <div className="shadow-card relative mx-auto mb-10 aspect-video w-full max-w-[900px] overflow-hidden rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=500&fit=crop"
            alt="MUDENG training preview video"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-[2.5px] transition-colors duration-200 hover:bg-white/40">
            <svg
              viewBox="0 0 24 24"
              className="ml-[3px] h-[22px] w-[22px] fill-white"
            >
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          </div>
        </div>

        <p className="font-body text-text-muted mx-auto max-w-[672px] text-base font-medium md:text-lg">
          Program ini dibuat agar proses belajar multimedia terasa lebih
          sederhana, jelas, dan mudah Kamu ikuti sampai menghasilkan karya
          nyata.
        </p>
      </div>
    </section>
  );
}
