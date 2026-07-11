import Image from "next/image";
import React from "react";

const menus = [
  {
    title: 'Menu',
    links: [
      { label: 'Approach', href: '#approach' },
      { label: 'Instructor', href: '#about' },
      { label: 'Curriculum', href: '#curriculum' },
      { label: 'Pricing', href: '#cta' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Email Us', href: '#' },
      { label: 'Telegram', href: '#' },
      { label: 'Live chat', href: '#' },
      { label: 'Help Center', href: '#' }
    ]
  },
  {
    title: 'Follow',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'TikTok', href: '#' },
      { label: 'YouTube', href: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Free Lesson', href: '#' },
      { label: 'Course Guide', href: '#' },
      { label: 'Community', href: '#' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-nav-outer pt-[100px] pb-[40px]" id="footer">
      <div className="container mx-auto">
        {/* Menu columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[40px] mb-[60px]">
          {menus.map((menu, i) => (
            <div key={i}>
              <div className="font-nav !font-bold text-[16px] uppercase tracking-[1px] mb-[16px] text-text-main">{menu.title}</div>
              <ul className="space-y-[10px]">
                {menu.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-[16px] text-text-muted hover:!text-brand transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo/desc + Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-[40px] mb-[40px]">
          <div className="max-w-[400px]">
            <div className="flex items-center gap-[12px] mb-[16px]">
              <Image src="https://cdn.mudeng.oktaa.my.id/logo/logo-mudeng.svg" alt="MUDENG" width={32} height={32} className="w-auto" />
            </div>
            <p className="text-[16px] leading-[24px] text-footer-muted">
              MUDENG membantu kreator membangun konten dengan kejelasan, konsistensi, dan tujuan.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="font-nav font-bold text-[16px] mb-[16px] text-text-main">Don't miss updates</div>
            <div className="flex items-center bg-[#f4f4f7] rounded-full p-[6px] pl-[24px] w-full lg:w-[380px]">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent outline-none text-[16px] text-text-main placeholder:text-text-muted min-w-0"
              />
              <button className="flex-shrink-0 !bg-brand text-white text-[16px] font-medium py-[12px] px-[24px] rounded-full whitespace-nowrap transition-transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-divider pt-[24px] flex flex-col md:flex-row items-center justify-between gap-[24px]">
          <span className="text-[16px] text-text-muted">© 2026, All Rights Reserved</span>
          <div className="flex items-center gap-[12px]">
            <a href="#" className="text-[16px] text-text-muted hover:!text-brand transition-colors">Privacy Policy</a>
            <span className="w-[4px] h-[4px] rounded-full bg-[#cccccc]"></span>
            <a href="#hero" className="text-[16px] text-text-muted hover:!text-brand transition-colors">Back To Top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}