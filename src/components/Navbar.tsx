"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const logoMain = "https://cdn.mudeng.oktaa.my.id/logo/logo-mudeng.svg";
const logoSmall = "/assets/logo-monogram.svg";

const navLinks = [
  { label: "ABOUT", href: "#about", sectionId: "about" },
  { label: "SERVICES", href: "#services", sectionId: "services" },
  { label: "PROCESS", href: "#approach", sectionId: "approach" },
  { label: "EVENT", href: "#events", sectionId: "events" },
];

const pillStyle = {
  background: "rgba(255, 255, 255, 0.08)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4)",
};

const contactBtnStyle = {
  background: "linear-gradient(160deg, rgba(102,103,228,1) 0%, rgba(102,103,228,0.8) 100%)",
  boxShadow: "0 10px 20px rgba(31, 81, 218, 0.3), inset 0 2px 4px rgba(255,255,255,0.3)",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("MUDENG");
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
    function handleScroll() {
      // Logic for active section detection
      const sections = navLinks.map((link) => document.getElementById(link.sectionId));
      const scrollPosition = window.scrollY + 20; // offset for navbar height

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          const navLink = navLinks.find((link) => link.sectionId === section.id);
          if (navLink) setActiveSection(navLink.label);
        }
      }

      if (isMobile) {
        setIsCompact(true);
        return;
      }
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (diff > 5 && currentY > 60) {
        setIsCompact(true);
      } else if (diff < -5 || currentY <= 60) {
        setIsCompact(false);
      }
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 transition-all duration-500 ease-in-out"
      style={{
        width: typeof window !== 'undefined' && window.innerWidth < 768
          ? "calc(100% - 2rem)"
          : isCompact
            ? "fit-content"
            : "calc(100% - 2rem)",
        maxWidth: "1152px",
      }}
    >
      <div
        className="grid items-center px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl transition-all duration-500"
        style={{
          ...pillStyle,
          gridTemplateColumns: isCompact ? "1fr" : "auto 1fr auto"
        }}
      >
        <img
          src={logoMain}
          alt="MUDENG"
          className="object-contain shrink-0"
          style={{ height: "20px", width: "auto", display: isCompact ? "none" : "block" }}
        />

        <div className="flex items-center justify-center">
          <div
            className="flex items-center gap-3 transition-all duration-300 overflow-hidden"
            style={{
              opacity: isCompact ? 1 : 0,
              maxWidth: isCompact ? (isMobile ? "100%" : "fit-content") : "0px",
              width: isCompact && isMobile ? "100%" : undefined,
              pointerEvents: isCompact ? "auto" : "none",
              justifyContent: isMobile ? "space-between" : "flex-start",
            }}
          >
            <div className="flex items-center gap-3 shrink-0">
              <img src={logoMain} alt="MUDENG" style={{ height: "20px", width: "auto", flexShrink: 0 }} />
              <span className="flex items-center gap-2 min-w-0">
                <span className="w-px h-4 bg-[#434655]/30 shrink-0" />
                <span className="text-nav-link text-sm font-semibold tracking-wide whitespace-nowrap">
                  {activeSection}
                </span>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-brand opacity-80" />
                  <span className="relative h-2 w-2 rounded-full bg-brand" />
                </span>
              </span>
            </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-nav-link md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
          </div>

          <div
            className="hidden md:flex items-center gap-6 transition-all duration-300 overflow-hidden"
            style={{
              opacity: isCompact ? 0 : 1,
              maxWidth: isCompact ? "0px" : "600px",
              pointerEvents: isCompact ? "none" : "auto",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-base pb-1 whitespace-nowrap transition-colors duration-300 ease-out group ${activeSection === link.label
                  ? "!text-brand font-bold"
                  : "!text-nav-link font-medium hover:!text-brand"
                  }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand origin-center transition-transform duration-300 ease-out ${activeSection === link.label
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </Link>
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-end"
          style={{ display: isCompact && !isMobile ? "none" : "flex" }}
        >
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:flex items-center justify-center px-8 py-2.5 rounded-full !text-white text-xs font-bold tracking-[1.2px] whitespace-nowrap relative overflow-hidden transition-all duration-300 border border-[#6667E4] group z-10 hover:border-[#0082FF] ${isCompact ? "hidden" : ""}`}
            style={{ ...contactBtnStyle, background: isCompact ? "transparent" : contactBtnStyle.background }}
          >
            <span className="absolute inset-0 bg-[#0082FF] rounded-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-all duration-300 ease-out -z-10 group-hover:shadow-[0_0_30px_rgba(0,130,255,0.8),_inset_0_0_15px_rgba(255,255,255,0.4)]" />
            <span className="transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
              DAFTAR SEKARANG
            </span>
          </a>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden mt-2 rounded-2xl border border-white/40 backdrop-blur-xl p-4"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)",
            boxShadow: "0 8px 32px rgba(31, 81, 218, 0.2)",
          }}
        >
           {navLinks.map((link) => (
             <Link
               key={link.label}
               href={link.href}
               className={`block py-3 text-base transition-colors ${activeSection === link.label ? "text-brand font-bold" : "text-nav-link font-medium"}`}
               onClick={() => setIsOpen(false)}
             >
               {link.label}
             </Link>
           ))}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 px-6 py-2.5 rounded-full !text-white text-xs font-bold tracking-[1.2px] text-center"
            style={contactBtnStyle}
            onClick={() => setIsOpen(false)}
          >
            DAFTAR SEKARANG
          </a>
        </div>
      )}
    </nav>
  );
}