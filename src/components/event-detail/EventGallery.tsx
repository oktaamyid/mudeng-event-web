import { EventData } from "@/data/events";

export default function EventGallery({ event }: { event: EventData }) {
  return (
    <section className="pb-[100px] md:pb-[160px]" id="gallery">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {event.gallery.map((img, idx) => (
            <div
              key={idx}
              className="aspect-[4/3] w-full overflow-hidden rounded-[24px] md:aspect-auto md:h-[400px]"
            >
              <img
                src={img}
                alt={`Gallery image ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-start">
          <a
            href="#"
            className="font-body text-text-main inline-flex rounded-full bg-[#F2F4F7] px-8 py-3 text-sm font-medium transition-colors hover:bg-[#E4E7EC]"
          >
            Next Project
          </a>
        </div>
      </div>
    </section>
  );
}
