export default function Footer() {
  const footerLinks = [
    {
      title: "Menu",
      items: [
        { label: "About", href: "/#about" },
        { label: "Services", href: "/#services" },
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
        { label: "Instagram", href: "https://www.instagram.com/mudengsttnf/" },
        { label: "TikTok", href: "https://www.tiktok.com/@mudeng.sttnf" },
        {
          label: "YouTube",
          href: "https://www.youtube.com/@MultimediaDigitalEngagementSTT",
        },
        { label: "Linktree", href: "https://linktr.ee/mudengsttnf" },
      ],
    },
  ];

  return (
    <footer className="border-divider border-t pt-[80px]" id="footer">
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="mb-10 flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex max-w-[270px] flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/Navbar-logo.png"
                alt="MUDENG"
                width="42"
                height="42"
                className="rounded-full"
              />
              <img
                src="/assets/Mudeng-Elements.png"
                alt="MUDENG"
                height="14"
                className="h-[14px] w-auto"
              />
            </div>
            <p className="font-body text-text-muted text-base leading-[20.42px] font-medium">
              MUDENG membantu kreator membangun konten dengan kejelasan,
              konsistensi, dan tujuan.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 md:gap-[120px]">
            {footerLinks.map((column, i) => (
              <div key={i} className="flex flex-col">
                <div className="font-body text-text-main mb-4 text-base font-semibold">
                  {column.title}
                </div>
                <div className="flex flex-col gap-2.5">
                  {column.items.map((item, j) => (
                    <a
                      key={j}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-body text-text-muted hover:text-brand text-base font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-divider mt-10 flex flex-col items-center justify-between gap-4 border-t py-5 text-center sm:flex-row sm:gap-0 sm:text-left">
          <span className="font-body text-text-muted text-base font-medium">
            © {new Date().getFullYear()}, All Rights Reserved
          </span>
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="font-body text-text-muted hover:text-brand text-base font-medium transition-colors duration-200"
            >
              Back To Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
