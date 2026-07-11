import { EventData } from "@/data/events";

export default function EventCurriculum({ event }: { event: any }) {
  return (
    <section className="bg-[#f8f8f8] py-[100px] md:py-[160px]" id="curriculum">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="mb-[80px] text-center">
          <h2 className="font-display text-text-main mb-4 text-[32px] leading-[34px] font-normal tracking-[-1px] uppercase md:text-[50px] md:leading-[52px]">
            CURRICULUM
          </h2>
          <p className="font-body text-text-muted mx-auto max-w-[600px] text-[18px] font-medium">
            Apa saja yang akan Anda pelajari selama program{" "}
            {event.details.duration} ini.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {event.curriculum?.map((item: any, idx: any) => (
            <div
              key={idx}
              className="border-divider rounded-[24px] border bg-white p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.03)] md:p-10"
            >
              <span className="font-body text-text-muted mb-6 inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-semibold">
                Week {item.week}
              </span>
              <h3 className="font-body text-text-main mb-3 text-[22px] leading-[28px] font-semibold">
                {item.title}
              </h3>
              <p className="font-body text-text-muted text-[16px] leading-[24px] font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
