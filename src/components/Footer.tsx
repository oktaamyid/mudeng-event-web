import Link from "next/link";

export default function Footer() {
    const footerLinks = [
        {
            title: "Menu",
            items: [
                { label: "About", href: "/#about" },
                { label: "Benefits", href: "/#benefits" },
                { label: "Curriculum", href: "/#curriculum" },
                { label: "Events", href: "/#events" },
            ],
        },
        {
            title: "Support & Partnership",
            items: [
                { label: "FAQ", href: "/#faq" },
                { label: "Email", href: "mailto:mudeng@nurulfikri.ac.id" },
                {
                    label: "WhatsApp",
                    href: "https://chat.whatsapp.com/LOrUMOHuLMY3ftHmz6dovF?mode=gi_t",
                },
                {
                    label: "Ratecard",
                    href: "https://drive.google.com/file/d/1pW9ctakAwqCbqEgsRINSo16ZenppoW0x/view",
                },
                { label: "Support Us", href: "https://saweria.co/mudeng" },
            ],
        },
        {
            title: "Social Media",
            items: [
                {
                    label: "Instagram",
                    href: "https://www.instagram.com/mudengsttnf/",
                },
                {
                    label: "TikTok",
                    href: "https://www.tiktok.com/@mudeng.sttnf",
                },
                {
                    label: "YouTube",
                    href: "https://www.youtube.com/@MultimediaDigitalEngagementSTT",
                },
                { label: "Linktree", href: "https://linktr.ee/mudengsttnf" },
            ],
        },
    ];

    return (
        <footer className="border-divider border-t pt-[40px] sm:pt-[60px] md:pt-[80px]" id="footer">
            <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
                <div className="mb-8 flex flex-col justify-between gap-8 sm:mb-10 sm:gap-10 md:flex-row">
                    <div className="flex max-w-[300px] flex-col gap-3 sm:max-w-[270px] sm:gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="/event/assets/Navbar-logo.png"
                                alt="MUDENG"
                                width="42"
                                height="42"
                                className="rounded-full"
                            />
                            <img
                                src="https://cdn.mudeng.oktaa.my.id/logo/logo-element.png"
                                alt="MUDENG"
                                height="14"
                                className="h-[14px] w-auto"
                            />
                        </div>
                        <p className="font-body text-text-muted text-sm leading-[20.42px] font-medium sm:text-base">
                            MUDENG membantu kreator membangun konten dengan
                            kejelasan, konsistensi, dan tujuan.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:flex-wrap md:gap-[120px]">
                        {footerLinks.map((column, i) => (
                            <div
                                key={i}
                                className={`flex flex-col ${
                                    i === footerLinks.length - 1
                                        ? "col-span-2 md:col-span-1"
                                        : ""
                                }`}
                            >
                                <div className="font-body text-text-main mb-3 text-[15px] font-semibold sm:text-base md:mb-4">
                                    {column.title}
                                </div>
                                <div
                                    className={
                                        i === footerLinks.length - 1
                                            ? "grid grid-cols-2 gap-x-6 gap-y-1.5 md:flex md:flex-col md:gap-2.5"
                                            : "flex flex-col gap-1.5 md:gap-2.5"
                                    }
                                >
                                    {column.items.map((item, j) => (
                                        <a
                                            key={j}
                                            href={item.href}
                                            target={
                                                item.href.startsWith("http")
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel={
                                                item.href.startsWith("http")
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="font-body text-text-muted hover:text-brand inline-flex min-h-[36px] items-center text-sm font-medium transition-colors duration-200 md:min-h-0 md:text-base"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-divider mt-8 flex flex-row items-center justify-between gap-4 border-t pt-5 pb-7 text-xs sm:mt-10 sm:py-5 sm:text-base">
                    <span className="font-body text-text-muted font-medium">
                        © {new Date().getFullYear()}, All Rights Reserved
                    </span>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/#hero"
                            className="font-body text-text-muted hover:text-brand inline-flex min-h-[36px] items-center font-medium transition-colors duration-200 md:min-h-0"
                        >
                            Back To Top
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
