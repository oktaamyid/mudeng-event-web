import { EventData } from "@/data/events";

export default function EventOverview({ event }: { event: any }) {
    return (
        <section className="py-[100px] md:py-[160px]" id="overview">
            <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-[100px]">
                    {/* Left Column: Text Blocks */}
                    <div className="flex flex-col gap-10 lg:col-span-8">
                        <div>
                            <h2 className="font-body text-text-main mb-4 text-[28px] font-semibold md:text-[32px]">
                                {event.overview?.title || "Program overview"}
                            </h2>
                            <p className="font-body text-text-muted text-[16px] leading-[28px] font-medium md:text-[18px]">
                                {event.overview?.description ||
                                    event.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-body text-text-main mb-4 text-[28px] font-semibold md:text-[32px]">
                                {event.process?.title || "Learning process"}
                            </h2>
                            <p className="font-body text-text-muted text-[16px] leading-[28px] font-medium md:text-[18px]">
                                {event.process?.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-body text-text-main mb-4 text-[28px] font-semibold md:text-[32px]">
                                {event.result?.title || "Final result"}
                            </h2>
                            <p className="font-body text-text-muted text-[16px] leading-[28px] font-medium md:text-[18px]">
                                {event.result?.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Info Box */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 flex flex-col gap-6 rounded-[24px] bg-[#F8F9FB] p-8">
                            <div className="border-divider flex items-start justify-between border-b pb-4">
                                <div className="flex flex-col">
                                    <span className="font-body text-text-main mb-1 text-sm font-medium">
                                        Instructor:
                                    </span>
                                    <span className="font-body text-text-muted text-[15px] font-medium">
                                        {event.instructor}
                                    </span>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                            </div>

                            <div className="border-divider flex items-start justify-between border-b pb-4">
                                <div className="flex flex-col">
                                    <span className="font-body text-text-main mb-1 text-sm font-medium">
                                        Category:
                                    </span>
                                    <span className="font-body text-text-muted text-[15px] font-medium">
                                        {event.category}
                                    </span>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                        <path d="M3 15h6"></path>
                                        <path d="M3 18h6"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="border-divider flex items-start justify-between border-b pb-4">
                                <div className="flex flex-col">
                                    <span className="font-body text-text-main mb-1 text-sm font-medium">
                                        Duration:
                                    </span>
                                    <span className="font-body text-text-muted text-[15px] font-medium">
                                        {event.duration}
                                    </span>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="3"
                                            y="4"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="16"
                                            y1="2"
                                            x2="16"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="8"
                                            y1="2"
                                            x2="8"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="3"
                                            y1="10"
                                            x2="21"
                                            y2="10"
                                        ></line>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-start justify-between">
                                <div className="flex flex-col">
                                    <span className="font-body text-text-main mb-1 text-sm font-medium">
                                        Start Date:
                                    </span>
                                    <span className="font-body text-text-muted text-[15px] font-medium">
                                        {event.kickoffDate}
                                    </span>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
