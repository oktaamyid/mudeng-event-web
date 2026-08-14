"use client";

import { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

/* ─────────────────────────────────────────────
   Semi-Circle Gallery
   Photos arranged in a semicircle (180°) at the top,
   from left → top → right, matching visual-user2.png
   ───────────────────────────────────────────── */

interface OrbitArcGalleryProps {
    images: string[];
    radius?: number;
    speed?: number;
}

// Semicircle+: extends below sides for full U coverage
const ARC_START = 150;  // bottom-left
const ARC_END = 390;    // bottom-right
const ARC_RANGE = ARC_END - ARC_START; // 240°
const FADE_ZONE = 25;

export default function OrbitArcGallery({
    images,
    radius = 46,
    speed = 0.006,
}: OrbitArcGalleryProps) {
    const [offset, setOffset] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const angleStep = ARC_RANGE / images.length;

    useAnimationFrame((_time, delta) => {
        if (!isPaused) {
            setOffset((prev) => (prev + speed * delta) % ARC_RANGE);
        }
    });

    return (
        <div
            ref={containerRef}
            className="relative mx-auto w-full"
            style={{
                height: 0,
                paddingBottom: `${radius + 16}%`, // taller to show bottom sides of arc
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {images.map((src, idx) => {
                const angle = ARC_START + ((idx * angleStep + offset) % ARC_RANGE);
                const radian = (angle * Math.PI) / 180;

                // Position: center at bottom-center of container
                // x: 50% + radius * cos(angle)
                // y: 100% + radius * sin(angle)  ← sin is negative for upper half
                const x = 50 + radius * Math.cos(radian);
                const y = 100 + radius * Math.sin(radian);

                // Tilt follows arc: left=-22°, center=0°, right=+22°
                const tiltDeg = ((angle - 270) / 90) * 22;

                // Fade at edges
                const distFromStart = angle - ARC_START;
                const distFromEnd = ARC_END - angle;
                const opacity = Math.min(1, distFromStart / FADE_ZONE, distFromEnd / FADE_ZONE);

                return (
                    <div
                        key={idx}
                        className="absolute"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: `translate(-50%, -50%) rotate(${tiltDeg}deg)`,
                            opacity: Math.max(0, opacity),
                            willChange: "transform, opacity",
                            zIndex: 10,
                        }}
                    >
                        <div
                            className="overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                            style={{
                                width: "clamp(120px, 14vw, 200px)",
                                aspectRatio: "4 / 5",
                            }}
                        >
                            <img
                                src={src}
                                alt={`Event photo ${idx + 1}`}
                                className="h-full w-full object-cover"
                                draggable={false}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
