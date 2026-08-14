"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    // Scroll to top or hash target on every route change
    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            // URL has a hash (e.g., /#approach) — wait for DOM then scroll to section
            const scrollToHash = () => {
                const id = hash.slice(1);
                const element = document.getElementById(id);
                if (element) {
                    if (lenisRef.current) {
                        lenisRef.current.scrollTo(element, { offset: -80, immediate: true });
                    } else {
                        element.scrollIntoView({ behavior: "instant", block: "start" });
                    }
                }
            };
            // Small delay to let Next.js hydrate the new page
            const timer = setTimeout(scrollToHash, 100);
            return () => clearTimeout(timer);
        } else {
            // No hash — scroll to top
            if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
            }
        }
    }, [pathname]);

    // Handle anchor/hash link clicks — Lenis needs to scroll to the target
    const handleAnchorClick = useCallback((e: MouseEvent) => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        const anchor = (e.target as HTMLElement).closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        // Match hash links like "/#about", "#about", "/some-page/#section"
        const hashMatch = href.match(/^(\/[^#]*)?(#[a-zA-Z0-9_-]+)$/);
        if (!hashMatch) return;

        const linkPath = hashMatch[1] || "/"; // e.g., "/" or "/ui-craft"
        const hash = hashMatch[2];            // e.g., "#about"
        const id = hash.slice(1);             // e.g., "about"

        // If the link targets a different page, let Next.js handle navigation
        const currentPath = window.location.pathname;
        const normalizedLinkPath = linkPath.replace(/\/$/, "") || "/";
        const normalizedCurrentPath = currentPath.replace(/\/$/, "") || "/";

        if (normalizedLinkPath !== normalizedCurrentPath) {
            // Different page — don't intercept, let router navigate
            return;
        }

        // Same page — smooth scroll to section
        const element = document.getElementById(id);
        if (!element) return;

        e.preventDefault();
        lenis.scrollTo(element, { offset: -80, duration: 1.3 });
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleAnchorClick);
        return () => document.removeEventListener("click", handleAnchorClick);
    }, [handleAnchorClick]);

    // Lenis smooth scroll — desktop only
    useEffect(() => {
        const isInteractiveRoute = 
            pathname.includes("/dashboard") || 
            pathname.includes("/admin") || 
            pathname.includes("/register");

        if (!isDesktop || isInteractiveRoute) {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            return;
        }

        const lenis = new Lenis({
            duration: 1.3,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1,
        });

        lenisRef.current = lenis;

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [isDesktop, pathname]);

    return <>{children}</>;
}
