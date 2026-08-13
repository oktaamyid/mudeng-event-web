import { EventData } from "@/data/events";

export default function EventCurriculum({ event }: { event: any }) {
    return (
        <section
            className="bg-[#f8f8f8] py-[50px] sm:py-[80px] md:py-[160px]"
            id="curriculum"
        >
            <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="mb-[40px] sm:mb-[60px] md:mb-[80px] text-center">
                    <h2 className="font-display text-text-main mb-4 text-[32px] leading-[34px] font-normal tracking-[-1px] uppercase md:text-[50px] md:leading-[52px]">
                        CURRICULUM
                    </h2>
                    <p className="font-body text-text-muted mx-auto max-w-[600px] text-[18px] font-medium">
                        Apa saja yang akan Anda pelajari selama program{" "}
                        {event.details.duration} ini.
                    </p>
                </div>

                <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                    {event.curriculum?.map((item: any, idx: any) => {
                        const mode = idx < 2 ? "Online" : "Offline";
                        return (
                        <div
                            key={idx}
                            className="border-divider rounded-[16px] sm:rounded-[24px] border bg-white p-5 sm:p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.03)] md:p-10"
                        >
                            <div className="mb-6 flex items-center gap-2 flex-wrap">
                                <span className="font-body text-text-muted inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-semibold">
                                    Week {item.week}
                                </span>
                                <span className={`font-body inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${
                                    mode === "Online"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-blue-100 text-blue-700"
                                }`}>
                                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                                        mode === "Online" ? "bg-emerald-500" : "bg-blue-500"
                                    }`}></span>
                                    {mode}
                                </span>
                            </div>
                            <h3 className="font-body text-text-main mb-3 text-[22px] leading-[28px] font-semibold">
                                {item.title}
                            </h3>
                            <p className="font-body text-text-muted text-[16px] leading-[24px] font-medium">
                                {item.description}
                            </p>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
