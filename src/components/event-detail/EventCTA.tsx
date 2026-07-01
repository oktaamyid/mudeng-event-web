export default function EventCTA() {
  return (
    <section className="py-[100px] md:py-[160px]" id="cta">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-[40px] bg-[#0A0B10] p-10 text-center md:p-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-[#6849E1]/20 to-blue-900/30"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00BFFF]"></span>
              <span className="font-body text-xs font-semibold tracking-widest text-white uppercase">
                GET STARTED
              </span>
            </div>

            <h2 className="font-display mb-6 max-w-[800px] text-[40px] leading-[44px] font-normal tracking-tight text-white md:text-[64px] md:leading-[68px]">
              Ready to <span className="text-white/60">elevate</span> your
              <br />
              brand's visual identity?
            </h2>

            <p className="font-body mb-10 max-w-[500px] text-[16px] font-medium text-white/70 md:text-[18px]">
              Choose the perfect membership plan today to unlock elite design
              services and start scaling your brand identity.
            </p>

            <div className="flex w-full max-w-[400px] items-center rounded-full bg-white p-2 shadow-lg">
              <div className="flex flex-1 flex-col items-start pl-4">
                <span className="text-text-muted font-body text-[10px] font-medium">
                  Email us:
                </span>
                <input
                  type="email"
                  placeholder="hello@pixello.com"
                  className="font-body text-text-main w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
              <button className="font-body rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black">
                Email us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
