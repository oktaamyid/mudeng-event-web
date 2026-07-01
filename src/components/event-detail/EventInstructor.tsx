import { EventData } from "@/data/events";

export default function EventInstructor({ event }: { event: EventData }) {
  return (
    <section className="py-[100px] md:py-[160px]" id="instructor">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="border-divider shadow-card flex flex-col items-center gap-10 rounded-[40px] border bg-white p-8 md:flex-row md:gap-[80px] md:p-16">
          <div className="h-[200px] w-[200px] flex-none overflow-hidden rounded-full border-4 border-[#f6f6fd] md:h-[300px] md:w-[300px]">
            <img
              src={event.instructor.avatar}
              alt={event.instructor.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="font-body text-brand text-sm font-semibold tracking-widest uppercase">
              Lead Instructor
            </span>
            <h2 className="font-display text-text-main text-[36px] leading-[40px] font-normal uppercase md:text-[50px] md:leading-[52px]">
              {event.instructor.name}
            </h2>
            <div className="font-body text-text-muted mb-4 text-[18px] font-semibold">
              {event.instructor.role}
            </div>
            <p className="font-body text-text-muted max-w-[500px] text-[16px] leading-[28px] font-medium md:text-[18px] md:leading-[32px]">
              "{event.instructor.bio}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
