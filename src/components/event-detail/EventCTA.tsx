import Link from "next/link";

export default function EventCTA({ event }: { event: any }) {
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
                            Ready to{" "}
                            <span className="text-white/60">elevate</span> your
                            <br />
                            brand's visual identity?
                        </h2>

                        <p className="font-body mb-10 max-w-[500px] text-[16px] font-medium text-white/70 md:text-[18px]">
                            Daftarkan dirimu sekarang dan jadilah bagian dari
                            MUDENG event!
                        </p>

                        <Link
                            href={`/events/${event.slug}/register`}
                            className="font-body inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-10 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-black"
                        >
                            Daftar Event Ini
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
