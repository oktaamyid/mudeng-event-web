"use client";

import { useRef, useEffect, useCallback } from "react";

interface SeamlessLoopVideoProps {
    src: string;
    /** Classes applied to the wrapper div (positioning, pointer-events, etc.) */
    className?: string;
    /** Extra classes applied to both <video> elements (e.g. object-position) */
    videoClassName?: string;
}

/**
 * Seamless looping video using a dual-video crossfade technique.
 * Two identical <video> elements are stacked; when one nears its end,
 * the other fades in from the beginning — eliminating the visible
 * "jump" that the native `loop` attribute produces.
 *
 * The wrapper div does NOT inject any `position` class or style —
 * pass the positioning you need through `className` (e.g. "absolute inset-0 …").
 * The only requirement is that the wrapper (or a nearby ancestor) is a
 * positioned element so the inner videos' `absolute inset-0` works.
 */
export default function SeamlessLoopVideo({
    src,
    className = "",
    videoClassName = "",
}: SeamlessLoopVideoProps) {
    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);
    const isAActiveRef = useRef(true);
    const swappingRef = useRef(false);

    // Crossfade timing (seconds / ms)
    const FADE_MS = 800;
    const BUFFER_S = 0.85; // begin crossfade this many seconds before end

    const crossfade = useCallback(() => {
        if (swappingRef.current) return;
        swappingRef.current = true;

        const videoA = videoARef.current;
        const videoB = videoBRef.current;
        if (!videoA || !videoB) return;

        const current = isAActiveRef.current ? videoA : videoB;
        const next = isAActiveRef.current ? videoB : videoA;

        // Prepare & play the next video from the start
        next.currentTime = 0;
        next.play().catch(() => {});

        // Crossfade opacity
        next.style.opacity = "1";
        current.style.opacity = "0";

        isAActiveRef.current = !isAActiveRef.current;

        // After the fade completes, pause + reset the old video
        setTimeout(() => {
            current.pause();
            current.currentTime = 0;
            swappingRef.current = false;
        }, FADE_MS + 200);
    }, []);

    useEffect(() => {
        const videoA = videoARef.current;
        const videoB = videoBRef.current;
        if (!videoA || !videoB) return;

        // Initialise
        videoA.style.opacity = "1";
        videoB.style.opacity = "0";
        videoA.play().catch(() => {});

        const handleTimeUpdate = () => {
            const active = isAActiveRef.current ? videoA : videoB;
            if (
                active.duration &&
                active.currentTime >= active.duration - BUFFER_S
            ) {
                crossfade();
            }
        };

        videoA.addEventListener("timeupdate", handleTimeUpdate);
        videoB.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            videoA.removeEventListener("timeupdate", handleTimeUpdate);
            videoB.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [crossfade]);

    const transitionStyle: React.CSSProperties = {
        transition: `opacity ${FADE_MS}ms ease-in-out`,
    };

    const videoClasses = `absolute inset-0 h-full w-full object-cover ${videoClassName}`.trim();

    return (
        <div className={className}>
            <video
                ref={videoARef}
                src={src}
                muted
                playsInline
                preload="auto"
                className={videoClasses}
                style={{ ...transitionStyle, opacity: 1 }}
            />
            <video
                ref={videoBRef}
                src={src}
                muted
                playsInline
                preload="auto"
                className={videoClasses}
                style={{ ...transitionStyle, opacity: 0 }}
            />
        </div>
    );
}
