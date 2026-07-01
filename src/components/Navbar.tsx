export default function Navbar() {
  return (
    <nav
      className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4"
      id="navbar"
    >
      <div className="rounded-pill bg-white/75 p-1 backdrop-blur-md">
        <div className="bg-bg-main rounded-pill shadow-nav flex h-[53px] items-center gap-10 p-[5px_5px_5px_10px]">
          <a href="/" className="flex items-center gap-2.5">
            <img
              className="h-[42px] w-[42px] rounded-full object-contain"
              src="/assets/Navbar-logo.png"
              alt="MUDENG Logo"
              width="42"
              height="42"
            />
            <img
              className="hidden h-[14px] w-auto object-contain sm:block"
              src="/assets/Mudeng-Elements.png"
              alt="MUDENG"
              height="14"
            />
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <a
              href="/#about"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              About
            </a>
            <a
              href="/#services"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="/#system"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              Process
            </a>
            <a
              href="/#events"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              Event
            </a>
          </div>

          <a
            href="/#cta"
            className="bg-text-main text-bg-main rounded-pill font-nav shadow-nav hidden px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:block"
          >
            Daftar Sekarang
          </a>

          {/* Mobile Hamburger */}
          <button
            className="flex h-10 w-10 flex-col justify-center gap-1.5 p-2 md:hidden"
            id="hamburgerBtn"
            aria-label="Menu"
          >
            <span className="bg-text-main block h-[2px] w-full rounded-full"></span>
            <span className="bg-text-main block h-[2px] w-full rounded-full"></span>
            <span className="bg-text-main block h-[2px] w-full rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="bg-bg-main shadow-card border-divider absolute top-full right-4 left-4 mt-2 hidden flex-col gap-4 rounded-2xl border p-4"
        id="mobileMenu"
      >
        <a
          href="/#about"
          className="font-nav text-nav-link text-sm font-medium"
        >
          About
        </a>
        <a
          href="/#services"
          className="font-nav text-nav-link text-sm font-medium"
        >
          Services
        </a>
        <a
          href="/#system"
          className="font-nav text-nav-link text-sm font-medium"
        >
          Process
        </a>
        <a
          href="/#events"
          className="font-nav text-nav-link text-sm font-medium"
        >
          Event
        </a>
        <a
          href="/#cta"
          className="bg-text-main text-bg-main rounded-pill font-nav mt-2 px-6 py-3 text-center text-sm font-semibold"
        >
          Daftar Sekarang
        </a>
      </div>
    </nav>
  );
}
