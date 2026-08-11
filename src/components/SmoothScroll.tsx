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

    // Scroll to top on every route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        }
    }, [pathname]);

    // Handle anchor/hash link clicks — Lenis needs to scroll to the target
    const handleAnchorClick = useCallback((e: MouseEvent) => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        const target = (e.target as HTMLElement).closest("a");
        if (!target) return;

        const href = target.getAttribute("href");
        if (!href) return;

        // Match hash links like "/#about", "#about", "/event/#about"
        const hashMatch = href.match(/#([a-zA-Z0-9_-]+)$/);
        if (!hashMatch) return;

        const id = hashMatch[1];
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
        if (!isDesktop) {
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
    }, [isDesktop]);

    return <>{children}</>;
}
