export default function Approach() {
  return (
    <section
      className="relative overflow-visible pt-[160px] pb-[240px]"
      id="approach"
    >
      <div className="mx-auto max-w-360 px-0">
        <div className="relative text-center">
          <div className="pointer-events-none absolute -top-[100px] -right-[60px] -bottom-[140px] -left-[60px] hidden md:block">
            <div className="rounded-icon absolute -top-[10px] left-[26%] flex h-[88px] w-[88px] -rotate-[10deg] items-center justify-center overflow-hidden bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)]">
              <img
                className="h-[65%] w-[65%] object-contain"
                src="assets/logo-ig.png"
                alt="Instagram"
              />
            </div>
            <div className="rounded-icon absolute -top-[30px] right-[24%] flex h-[88px] w-[88px] rotate-[10deg] items-center justify-center overflow-hidden bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)]">
              <img
                className="h-[65%] w-[65%] object-contain"
                src="assets/logo-canva.png"
                alt="Canva"
              />
            </div>

            <div className="rounded-icon absolute top-[35%] left-0 flex h-[96px] w-[96px] rotate-[5deg] items-center justify-center overflow-hidden bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)]">
              <img
                className="h-[65%] w-[65%] object-contain"
                src="assets/logo-figma.png"
                alt="Figma"
              />
            </div>
            <div className="rounded-icon absolute top-[25%] right-[100px] flex h-[96px] w-[96px] -rotate-[5deg] items-center justify-center overflow-hidden bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)]">
              <img
                className="h-[65%] w-[65%] object-contain"
                src="assets/logo-linkedin.png"
                alt="LinkedIn"
              />
            </div>

            <div className="rounded-icon absolute -bottom-[10px] left-[12%] flex h-[88px] w-[88px] rotate-[10deg] items-center justify-center overflow-hidden bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)]">
              <img
                className="h-[65%] w-[65%] object-contain"
                src="assets/logo-capcut.png"
                alt="CapCut"
              />
            </div>
            <div className="rounded-icon absolute -bottom-[50px] left-1/2 -ml-[44px] flex h-[88px] w-[88px] items-center justify-center overflow-hidden bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)]">
              <img
                className="h-[65%] w-[65%] object-contain"
                src="assets/logo-photoshop.png"
                alt="Photoshop"
              />
            </div>
            <div className="rounded-icon absolute right-[12%] bottom-0 flex h-[88px] w-[88px] -rotate-[5deg] items-center justify-center overflow-hidden bg-white shadow-[0px_12px_20px_0px_rgba(26,26,26,0.1)]">
              <img
                className="h-[65%] w-[65%] object-contain"
                src="assets/logo-dribble.png"
                alt="Dribbble"
              />
            </div>

            <img
              className="pointer-events-none absolute top-[40%] left-[16%] w-[80px] rotate-[15deg] opacity-70"
              src="assets/icon-arrow.png"
              alt=""
            />
            <img
              className="pointer-events-none absolute bottom-[10px] left-[45%] w-[90px] -rotate-[5deg] opacity-70"
              src="assets/icon-cling.png"
              alt=""
            />
            <img
              className="pointer-events-none absolute top-[22%] right-[14%] w-[100px] rotate-[5deg] opacity-70"
              src="assets/icon-tali.png"
              alt=""
            />
          </div>

          <h2 className="font-display text-brand mb-10 px-4 text-center text-[32px] leading-[34px] font-normal tracking-[-2px] uppercase md:text-[40px] md:leading-[42px] lg:text-[72px] lg:leading-[72px]">
            MUDENG CREATIVE
            <br />
            POWERHOUSE
          </h2>

          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-12 px-4 md:flex-row">
            <div className="max-w-[280px] text-center">
              <h3 className="text-btn-secondary-text mb-2 text-2xl font-semibold tracking-[-0.48px]">
                Kuasai Skill Global
              </h3>
              <p className="text-text-muted text-lg leading-[22.32px] font-medium tracking-[-0.36px]">
                Pelajari desain standar industri untuk portofolio yang bersaing.
              </p>
            </div>
            <div className="max-w-[280px] text-center">
              <h3 className="text-btn-secondary-text mb-2 text-2xl font-semibold tracking-[-0.48px]">
                Mentor Expert
              </h3>
              <p className="text-text-muted text-lg leading-[22.32px] font-medium tracking-[-0.36px]">
                Bimbingan intensif dari para praktisi multimedia berpengalaman.
              </p>
            </div>
            <div className="max-w-[280px] text-center">
              <h3 className="text-btn-secondary-text mb-2 text-2xl font-semibold tracking-[-0.48px]">
                Hybrid Learning
              </h3>
              <p className="text-text-muted text-lg leading-[22.32px] font-medium tracking-[-0.36px]">
                Kombinasi sesi online fleksibel dan pertemuan offline
                interaktif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
