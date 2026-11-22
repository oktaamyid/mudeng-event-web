"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Google Forms-style header card containing the event registration title
 * and description, with automatic collapse/expand for very long text.
 */
export function FormDescriptionCard({
    title,
    html,
    fallbackText = "Lengkapi data di bawah ini untuk mendaftar event.",
}: {
    title: string;
    html?: string | null;
    fallbackText?: string;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const normalizedHtml = (html || "").replace(/&nbsp;|\u00A0/g, " ");
    const hasHtml = Boolean(
        normalizedHtml && normalizedHtml.replace(/<[^>]*>/g, "").trim() !== "",
    );

    useEffect(() => {
        if (!hasHtml) return;
        const el = contentRef.current;
        if (!el) return;

        const checkOverflow = () => {
            setIsOverflowing(el.scrollHeight > 192);
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [html, hasHtml]);

    return (
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm sm:rounded-3xl">
            {/* Google Forms-style top accent bar */}
            <div className="h-2 w-full bg-[#6849E1] sm:h-2.5" />

            <div className="p-4 sm:px-10 sm:py-7">
                <h1 className="font-display text-2xl tracking-tight text-gray-900 break-words sm:text-4xl">
                    Register to <span className="text-[#6849E1]">{title}</span>
                </h1>

                <div className="mt-3 border-t border-gray-100 pt-3 sm:mt-4 sm:pt-4">
                    {hasHtml ? (
                        <>
                            <div className="relative">
                                <div
                                    ref={contentRef}
                                    className={`overflow-hidden text-[13.5px] leading-relaxed text-gray-600 [word-break:normal] break-words transition-[max-height] duration-300 sm:text-[15px] [&_a]:font-medium [&_a]:text-[#6849E1] [&_a]:underline hover:[&_a]:text-[#5738CC] [&_b]:font-semibold [&_b]:text-gray-900 [&_em]:italic [&_i]:italic [&_li]:mb-1 [&_ol]:my-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-2.5 last:[&_p]:mb-0 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:list-disc ${
                                        isOverflowing && !isExpanded
                                            ? "max-h-[160px] sm:max-h-[180px]"
                                            : "max-h-[2000px]"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: normalizedHtml,
                                    }}
                                />

                                {isOverflowing && !isExpanded && (
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
                                )}
                            </div>

                            {isOverflowing && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsExpanded((prev) => !prev)
                                    }
                                    className="mt-2 inline-flex min-h-[36px] cursor-pointer items-center gap-1 py-1 text-xs font-semibold text-[#6849E1] hover:underline"
                                >
                                    {isExpanded ? (
                                        <>
                                            Tampilkan lebih ringkas
                                            <ChevronUp className="h-3.5 w-3.5" />
                                        </>
                                    ) : (
                                        <>
                                            Baca selengkapnya
                                            <ChevronDown className="h-3.5 w-3.5" />
                                        </>
                                    )}
                                </button>
                            )}
                        </>
                    ) : (
                        <p className="text-sm text-gray-600 sm:text-[15px]">
                            {fallbackText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
