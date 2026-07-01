export default function Testimonials() {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <svg key={i} className="text-badge-orange h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    ));

  return (
    <section className="py-[160px]" id="testimonials">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="mb-[60px] text-center">
          <h2 className="font-display text-brand text-center text-[40px] leading-[42px] font-normal tracking-[-2px] uppercase lg:text-[72px] lg:leading-[72px]">
            Real stories
            <br />
            from creators
          </h2>
        </div>

        <div className="relative">
          <img
            src="assets/icon-arrow2.png"
            alt=""
            className="pointer-events-none absolute top-[10px] -left-[50px] hidden w-[150px] rotate-[15deg] opacity-20 lg:block"
            aria-hidden="true"
          />
          <img
            src="assets/icon-cling.png"
            alt=""
            className="pointer-events-none absolute -top-[40px] right-0 hidden w-[100px] rotate-[15deg] opacity-20 lg:block"
            aria-hidden="true"
          />

          {/* Row 1 */}
          <div className="relative z-10 mb-6 flex flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:flex-nowrap md:gap-0 lg:-mb-[30px]">
            <div className="shadow-card flex w-full shrink-0 flex-col gap-4 rounded-[32px] bg-white p-7 text-left transition-transform duration-300 md:-mx-[10px] md:w-[280px] lg:-mx-[15px] lg:w-[300px] lg:-rotate-[10deg] lg:hover:z-10 lg:hover:scale-[1.03] lg:hover:rotate-0">
              <div className="flex gap-1">{stars}</div>
              <p className="font-body text-text-muted flex-1 text-[15px] leading-[22px] font-medium">
                This course made consistency feel realistic. Instead of guessing
                every time, I now follow a process that actually fits my
                routine.
              </p>
              <div className="mt-auto flex items-center gap-2.5">
                <div className="bg-pill-bg h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://i.pravatar.cc/128?img=12"
                    alt="Jordan P."
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-body text-text-main text-[14px] font-medium">
                  Jordan P.
                </span>
              </div>
            </div>

            <div className="shadow-card flex w-full shrink-0 flex-col gap-4 rounded-[32px] bg-white p-7 text-left transition-transform duration-300 md:-mx-[10px] md:w-[280px] lg:-mx-[15px] lg:w-[300px] lg:rotate-[10deg] lg:hover:z-10 lg:hover:scale-[1.03] lg:hover:rotate-0">
              <div className="flex gap-1">{stars}</div>
              <p className="font-body text-text-muted flex-1 text-[15px] leading-[22px] font-medium">
                I finally understand what to post and why it works. Tokko gave
                me structure without making content feel forced or overwhelming.
              </p>
              <div className="mt-auto flex items-center gap-2.5">
                <div className="bg-pill-bg h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://i.pravatar.cc/128?img=32"
                    alt="Alex R."
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-body text-text-main text-[14px] font-medium">
                  Alex R.
                </span>
              </div>
            </div>

            <div className="shadow-card flex w-full shrink-0 flex-col gap-4 rounded-[32px] bg-white p-7 text-left transition-transform duration-300 md:-mx-[10px] md:w-[280px] lg:-mx-[15px] lg:w-[300px] lg:-rotate-[10deg] lg:hover:z-10 lg:hover:scale-[1.03] lg:hover:rotate-0">
              <div className="flex gap-1">{stars}</div>
              <p className="font-body text-text-muted flex-1 text-[15px] leading-[22px] font-medium">
                They helped me stop overthinking content and start posting with
                confidence. Everything feels simpler and easier to stick with.
              </p>
              <div className="mt-auto flex items-center gap-2.5">
                <div className="bg-pill-bg h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://i.pravatar.cc/128?img=47"
                    alt="Sofia K."
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-body text-text-main text-[14px] font-medium">
                  Sofia K.
                </span>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative z-20 flex flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:flex-nowrap md:gap-0">
            <div className="shadow-card flex w-full shrink-0 flex-col gap-4 rounded-[32px] bg-white p-7 text-left transition-transform duration-300 md:-mx-[10px] md:w-[280px] lg:-mx-[15px] lg:w-[300px] lg:-rotate-[5deg] lg:hover:z-10 lg:hover:scale-[1.03] lg:hover:rotate-0">
              <div className="flex gap-1">{stars}</div>
              <p className="font-body text-text-muted flex-1 text-[15px] leading-[22px] font-medium">
                Tokko gave me clarity. I don't waste time guessing what to post
                anymore, and that alone made a huge difference for me.
              </p>
              <div className="mt-auto flex items-center gap-2.5">
                <div className="bg-pill-bg h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://i.pravatar.cc/128?img=60"
                    alt="Lena M."
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-body text-text-main text-[14px] font-medium">
                  Lena M.
                </span>
              </div>
            </div>

            <div className="shadow-card flex w-full shrink-0 flex-col gap-4 rounded-[32px] bg-white p-7 text-left transition-transform duration-300 md:-mx-[10px] md:w-[280px] lg:-mx-[15px] lg:w-[300px] lg:rotate-[5deg] lg:hover:z-10 lg:hover:scale-[1.03] lg:hover:rotate-0">
              <div className="flex gap-1">{stars}</div>
              <p className="font-body text-text-muted flex-1 text-[15px] leading-[22px] font-medium">
                The biggest change for me was confidence. I know what I'm doing
                now, and my content reflects that in a much more consistent way.
              </p>
              <div className="mt-auto flex items-center gap-2.5">
                <div className="bg-pill-bg h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://i.pravatar.cc/128?img=68"
                    alt="Emily T."
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-body text-text-main text-[14px] font-medium">
                  Emily T.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
