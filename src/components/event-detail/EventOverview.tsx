"use client";

import Link from "next/link";
import {
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";
import {
    User,
    Monitor,
    Globe,
    MapPin,
    FileText,
    Calendar,
    Clock,
    Award,
} from "lucide-react";
import type { EventInfoItem } from "@/components/EventInfoEditor";

// Per-event info card label fallback for legacy events
const categoryLabelMap: Record<string, string> = {
    "ui-craft": "Kategori:",
    "creative-craft": "Bidang:",
    "mucrex": "Jenis Kegiatan:",
};

function InfoRowIcon({ icon }: { icon?: string }) {
    const className = "h-4 w-4 text-[#7C7AEA]";
    switch (icon) {
        case "user":
            return <User className={className} />;
        case "monitor":
            return <Monitor className={className} />;
        case "globe":
            return <Globe className={className} />;
        case "map-pin":
            return <MapPin className={className} />;
        case "calendar":
            return <Calendar className={className} />;
        case "clock":
            return <Clock className={className} />;
        case "award":
            return <Award className={className} />;
        case "file-text":
        default:
            return <FileText className={className} />;
    }
}

export default function EventOverview({ event }: { event: any }) {
    const categoryLabel = categoryLabelMap[event.slug] || "Kategori:";

    const customInfoItems: EventInfoItem[] | undefined = Array.isArray(
        event.overview?.infoItems,
    ) && event.overview.infoItems.length > 0
        ? event.overview.infoItems
        : undefined;

    const fallbackInfoItems: EventInfoItem[] = [
        {
            label: "Nama Proker:",
            value: event.title?.toUpperCase() || "-",
            icon: "user",
        },
        {
            label: categoryLabel,
            value: event.category || event.service || "-",
            icon: "monitor",
        },
        {
            label: "Format:",
            value: event.slug === "mucrex" ? "Offline" : "Hybrid",
            icon: "globe",
        },
        ...(event.slug === "mucrex"
            ? [
                  {
                      label: "Lokasi:",
                      value: "Kampus B STT NF",
                      icon: "map-pin",
                  },
              ]
            : []),
        {
            label: "Fokus",
            value: event.focus || "Perancangan antarmuka digital",
            icon: "file-text",
        },
        {
            label: "Output",
            value: event.output || "Prototype & Portofolio UI/UX",
            icon: "calendar",
        },
    ];

    const displayInfoItems = customInfoItems || fallbackInfoItems;
    return (
        <section className="pt-[50px] pb-[15px] md:pt-[80px] md:pb-[20px] lg:pt-[120px] lg:pb-[30px]" id="overview">
            <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
                    {/* Left Column: Text Blocks */}
                    <StaggerContainer className="flex flex-col gap-10 lg:col-span-7 min-w-0 overflow-hidden" stagger={0.12}>
                        <StaggerItem>
                            <div>
                                <h2 className="font-body text-text-main mb-2 sm:mb-3 text-[20px] sm:text-[24px] font-bold md:text-[28px]">
                                    {event.overview?.title || "Project overview"}
                                </h2>
                                <div 
                                    className="font-body text-[14px] leading-[22px] sm:text-[15px] sm:leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px] [word-break:normal] break-words [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_p]:mb-3 last:[&_p]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: (event.overview?.description || event.description || "").replace(/&nbsp;|\u00A0/g, " ") }}
                                />
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            <div>
                                <h2 className="font-body text-text-main mb-2 sm:mb-3 text-[20px] sm:text-[24px] font-bold md:text-[28px]">
                                    {event.process?.title || "Project process"}
                                </h2>
                                <div 
                                    className="font-body text-[14px] leading-[22px] sm:text-[15px] sm:leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px] [word-break:normal] break-words [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_p]:mb-3 last:[&_p]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: (event.process?.description || "").replace(/&nbsp;|\u00A0/g, " ") }}
                                />
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            <div>
                                <h2 className="font-body text-text-main mb-2 sm:mb-3 text-[20px] sm:text-[24px] font-bold md:text-[28px]">
                                    {event.result?.title || "Final result"}
                                </h2>
                                <div 
                                    className="font-body text-[14px] leading-[22px] sm:text-[15px] sm:leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px] [word-break:normal] break-words [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_p]:mb-3 last:[&_p]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: (event.result?.description || "").replace(/&nbsp;|\u00A0/g, " ") }}
                                />
                            </div>
                        </StaggerItem>
                    </StaggerContainer>

                    {/* Right Column: Info Box */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <FadeSlideIn delay={0.3}>
                                <div className="flex flex-col gap-0 rounded-[20px] md:rounded-[24px] bg-[#7C7AEA]/10 p-5 sm:p-8">
                                    {displayInfoItems.map((item, idx) => {
                                        const isLast =
                                            idx === displayInfoItems.length - 1;
                                        return (
                                            <div
                                                key={`${item.label}-${idx}`}
                                                className={`flex items-start justify-between gap-4 ${
                                                    isLast
                                                        ? ""
                                                        : "border-divider mb-5 border-b pb-5"
                                                }`}
                                            >
                                                <div className="flex min-w-0 flex-col">
                                                    <span className="font-body text-text-main mb-1 text-sm font-medium">
                                                        {item.label}
                                                    </span>
                                                    <span className="font-body text-text-muted text-[15px] font-medium break-words">
                                                        {item.value}
                                                    </span>
                                                </div>
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                                                    <InfoRowIcon icon={item.icon} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="border-divider mt-6 border-t pt-5">
                                        {event.isRegistrationOpen !== false ? (
                                            <Link
                                                href={`/${event.slug}/register`}
                                                className="font-body inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#6849E1] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#5738CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6849E1] focus-visible:ring-offset-2"
                                            >
                                                Daftar Sekarang
                                            </Link>
                                        ) : (
                                            <span className="font-body inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#F4F4F5] px-6 py-3 text-sm font-semibold text-[#52525B]">
                                                Pendaftaran Ditutup
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </FadeSlideIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
