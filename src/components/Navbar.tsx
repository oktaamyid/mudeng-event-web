import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4"
      id="navbar"
    >
      <div className="rounded-pill bg-white/75 p-1 backdrop-blur-md">
        <div className="bg-bg-main rounded-pill shadow-nav flex h-[53px] items-center gap-10 p-[5px_5px_5px_10px]">
          <Link href="/" className="flex items-center gap-2.5">
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
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/#about"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              href="/#system"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              Process
            </Link>
            <Link
              href="/#events"
              className="font-nav text-nav-link hover:text-text-main text-sm font-medium transition-colors duration-300"
            >
              Event
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Show when="signed-out">
              <SignInButton>
                <button className="bg-stat text-white rounded-pill font-nav shadow-nav px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-brand">
                  Daftar Sekarang
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="flex h-10 w-10 flex-col justify-center gap-1.5 p-2 md:hidden"
            id="hamburgerBtn"
            aria-label="Menu"
          >
            <span className="bg-text-main block h-0.5 w-full rounded-full"></span>
            <span className="bg-text-main block h-0.5 w-full rounded-full"></span>
            <span className="bg-text-main block h-0.5 w-full rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="bg-bg-main shadow-card border-divider absolute top-full right-4 left-4 mt-2 hidden flex-col gap-4 rounded-2xl border p-4"
        id="mobileMenu"
      >
        <Link
          href="/#about"
          className="font-nav text-nav-link text-sm font-medium"
        >
          About
        </Link>
        <Link
          href="/#services"
          className="font-nav text-nav-link text-sm font-medium"
        >
          Services
        </Link>
        <Link
          href="/#system"
          className="font-nav text-nav-link text-sm font-medium"
        >
          Process
        </Link>
        <Link
          href="/#events"
          className="font-nav text-nav-link text-sm font-medium"
        >
          Event
        </Link>
        <Show when="signed-out">
          <div className="flex flex-col gap-2 mt-2">
            <SignInButton>
              <button className="bg-stat text-white rounded-pill font-nav px-6 py-3 text-center text-sm font-medium transition-colors hover:bg-brand">
                Daftar Sekarang
              </button>
            </SignInButton>
          </div>
        </Show>
        <Show when="signed-in">
          <div className="mt-2 flex justify-center">
            <UserButton />
          </div>
        </Show>
      </div>
    </nav>
  );
}
