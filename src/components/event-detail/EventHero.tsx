import { EventData } from "@/data/events";

export default function EventHero({ event }: { event: EventData }) {
  return (
    <section className="pt-[160px] pb-10" id="hero">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="mx-auto mb-16 flex max-w-[800px] flex-col items-center text-center">
          <div className="font-body mb-6 inline-flex items-center justify-center rounded-full bg-[#6849E1] px-4 py-1.5 text-sm font-medium text-white">
            {event.badge}
          </div>

          <h1 className="font-display text-brand mb-6 text-[60px] leading-[60px] font-normal tracking-[-4px] uppercase md:text-[100px] md:leading-[100px] lg:text-[140px] lg:leading-[140px]">
            {event.title}
          </h1>

          <p className="font-body text-text-muted max-w-[600px] text-[18px] leading-[28px] font-medium md:text-[20px] md:leading-[32px]">
            {event.subtitle}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="aspect-[21/9] w-full overflow-hidden rounded-[32px] md:h-[600px]">
          <img
            src={event.mainImage}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
