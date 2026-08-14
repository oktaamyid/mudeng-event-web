"use client";

import { EventData } from "@/data/events";
import Link from "next/link";
import {
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

const slugOrder = ["ui-craft", "creative-craft", "mucrex"];

// Map slug to local gallery images
const localGalleryMap: Record<string, string[]> = {
    "ui-craft": [
        "/event/assets/ui-craft1.png",
        "/event/assets/ui-craft2.png",
        "/event/assets/ui-craft3.png",
        "/event/assets/ui-craft4.png",
    ],
    "creative-craft": [
        "/event/assets/creative-craftt1.png",
        "/event/assets/creative-craftt2.png",
        "/event/assets/creative-craftt3.png",
        "/event/assets/creative-craftt4.png",
    ],
    "mucrex": [
        "/event/assets/mucrexx1.png",
        "/event/assets/mucrexx2.png",
        "/event/assets/mucrexx3.png",
        "/event/assets/mucrexx4.png",
    ],
};

export default function EventGallery({ event }: { event: any }) {
    // Determine next event
    const currentIdx = slugOrder.indexOf(event.slug);
    const nextSlug =
        currentIdx >= 0 && currentIdx < slugOrder.length - 1
            ? slugOrder[currentIdx + 1]
            : slugOrder[0];

    // Use local gallery images if available, fallback to database
    const galleryImages = localGalleryMap[event.slug] || event.gallery || [];

    return (
        <section className="pb-25 md:pb-40" id="gallery">
            <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.1}>
                    {galleryImages.map((img: string, idx: number) => (
                        <StaggerItem key={idx}>
                            <div className="aspect-4/3 w-full overflow-hidden rounded-[16px] sm:rounded-[24px] md:aspect-auto md:h-100">
                                <img
                                    src={img}
                                    alt={`Gallery image ${idx + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeSlideIn delay={0.4}>
                    <div className="mt-12 flex justify-start">
                        <Link
                            href={`/${nextSlug}`}
                            className="font-body text-text-main inline-flex rounded-full bg-[#7C7AEA]/10 px-8 py-3 text-sm font-medium transition-colors hover:bg-[#7C7AEA]/15"
                        >
                            Next Project
                        </Link>
                    </div>
                </FadeSlideIn>
            </div>
        </section>
    );
}
