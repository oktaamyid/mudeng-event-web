import { EventData } from "@/data/events";
import Link from "next/link";

export default function EventGallery({ event }: { event: EventData }) {
    return (
        <section className="pb-25 md:pb-40" id="gallery">
            <div className="mx-auto max-w-360 px-6 lg:px-30 xl:px-60">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {event.gallery?.map((img, idx) => (
                        <div
                            key={idx}
                            className="aspect-4/3 w-full overflow-hidden rounded-[24px] md:aspect-auto md:h-100"
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
                    <Link
                        href="/#events"
                        className="font-body text-text-main inline-flex rounded-full bg-[#F2F4F7] px-8 py-3 text-sm font-medium transition-colors hover:bg-[#E4E7EC]"
                    >
                        Lihat Event Lainnya
                    </Link>
                </div>
            </div>
        </section>
    );
}
