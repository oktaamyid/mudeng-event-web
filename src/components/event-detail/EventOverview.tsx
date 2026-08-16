"use client";

import { EventData } from "@/data/events";
import {
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

// Per-event info card label for the second row
const categoryLabelMap: Record<string, string> = {
    "ui-craft": "Kategori:",
    "creative-craft": "Bidang:",
    "mucrex": "Jenis Kegiatan:",
};

export default function EventOverview({ event }: { event: any }) {
    const categoryLabel = categoryLabelMap[event.slug] || "Kategori:";
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
                                    className="font-body text-[14px] leading-[22px] sm:text-[15px] sm:leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px] break-words [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_p]:mb-3 last:[&_p]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: event.overview?.description || event.description }}
                                />
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            <div>
                                <h2 className="font-body text-text-main mb-2 sm:mb-3 text-[20px] sm:text-[24px] font-bold md:text-[28px]">
                                    {event.process?.title || "Project process"}
                                </h2>
                                <div 
                                    className="font-body text-[14px] leading-[22px] sm:text-[15px] sm:leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px] break-words [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_p]:mb-3 last:[&_p]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: event.process?.description || "" }}
                                />
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            <div>
                                <h2 className="font-body text-text-main mb-2 sm:mb-3 text-[20px] sm:text-[24px] font-bold md:text-[28px]">
                                    {event.result?.title || "Final result"}
                                </h2>
                                <div 
                                    className="font-body text-[14px] leading-[22px] sm:text-[15px] sm:leading-[24px] font-medium tracking-[-0.3px] text-[#1A1A1A]/65 md:text-[16px] md:leading-[26px] break-words [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_p]:mb-3 last:[&_p]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: event.result?.description || "" }}
                                />
                            </div>
                        </StaggerItem>
                    </StaggerContainer>

                    {/* Right Column: Info Box */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <FadeSlideIn delay={0.3}>
                                <div className="flex flex-col gap-0 rounded-[20px] md:rounded-[24px] bg-[#7C7AEA]/10 p-5 sm:p-8">
                                {/* Nama Proker */}
                                <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                    <div className="flex flex-col">
                                        <span className="font-body text-text-main mb-1 text-sm font-medium">
                                            Nama Proker:
                                        </span>
                                        <span className="font-body text-text-muted text-[15px] font-medium">
                                            {event.title?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                </div>

                                {/* Kategori */}
                                <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                    <div className="flex flex-col">
                                        <span className="font-body text-text-main mb-1 text-sm font-medium">
                                            {categoryLabel}
                                        </span>
                                        <span className="font-body text-text-muted text-[15px] font-medium">
                                            {event.category || event.service}
                                        </span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                    </div>
                                </div>

                                {/* Format */}
                                <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                    <div className="flex flex-col">
                                        <span className="font-body text-text-main mb-1 text-sm font-medium">
                                            Format:
                                        </span>
                                        <span className="font-body text-text-muted text-[15px] font-medium">
                                            {event.slug === "mucrex" ? "Offline" : "Hybrid"}
                                        </span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                                            <path d="M2 12h20"></path>
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* Lokasi - hanya untuk MUCREX */}
                                {event.slug === "mucrex" && (
                                <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                    <div className="flex flex-col">
                                        <span className="font-body text-text-main mb-1 text-sm font-medium">
                                            Lokasi:
                                        </span>
                                        <span className="font-body text-text-muted text-[15px] font-medium">
                                            Kampus B STT NF
                                        </span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>
                                </div>
                                )}

                                {/* Fokus */}
                                <div className="border-divider flex items-start justify-between border-b pb-5 mb-5">
                                    <div className="flex flex-col">
                                        <span className="font-body text-text-main mb-1 text-sm font-medium">
                                            Fokus
                                        </span>
                                        <span className="font-body text-text-muted text-[15px] font-medium">
                                            {event.focus || "Perancangan antarmuka digital"}
                                        </span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
                                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                            <path d="M3 15h6"></path>
                                            <path d="M3 18h6"></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* Output */}
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-body text-text-main mb-1 text-sm font-medium">
                                            Output
                                        </span>
                                        <span className="font-body text-text-muted text-[15px] font-medium">
                                            {event.output || "Prototype & Portofolio UI/UX"}
                                        </span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7AEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </div>
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
