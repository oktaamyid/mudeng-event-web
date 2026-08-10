"use client";

import React from "react";
import { motion, type Variants, type Transition } from "framer-motion";

/* ─────────────────────────────────────────────
   Shared defaults
   ───────────────────────────────────────────── */

const springTransition: Transition = {
    type: "spring",
    stiffness: 80,
    damping: 18,
};

const defaultViewport = { once: true, amount: 0.3 };

/* ─────────────────────────────────────────────
   1. TextReveal — Fade + Blur, staggered per line
   ───────────────────────────────────────────── */

const textRevealContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const textRevealLine: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(8px)",
        y: 18,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            ...springTransition,
            duration: 0.8,
        },
    },
};

interface TextRevealProps {
    children: React.ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
    delay?: number;
    /** If true, triggers on load instead of on scroll */
    onLoad?: boolean;
}

export function TextReveal({
    children,
    className,
    as = "div",
    delay = 0,
    onLoad = false,
}: TextRevealProps) {
    const Tag = motion[as] as any;

    const lines = React.Children.toArray(children).filter(
        (child) => !(React.isValidElement(child) && child.type === "br"),
    );

    return (
        <Tag
            className={className}
            variants={textRevealContainer}
            initial="hidden"
            {...(onLoad
                ? { animate: "visible" }
                : { whileInView: "visible", viewport: defaultViewport })}
            transition={{ staggerChildren: 0.15, delayChildren: delay }}
        >
            {lines.map((line, i) => (
                <motion.span
                    key={i}
                    variants={textRevealLine}
                    style={{ display: "block" }}
                >
                    {line}
                </motion.span>
            ))}
        </Tag>
    );
}

/* ─────────────────────────────────────────────
   2. FadeSlideIn — Fade + translateY/X
   ───────────────────────────────────────────── */

interface FadeSlideInProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    delay?: number;
    duration?: number;
    onLoad?: boolean;
    style?: React.CSSProperties;
}

export function FadeSlideIn({
    children,
    className,
    direction = "up",
    distance = 30,
    delay = 0,
    duration = 0.8,
    onLoad = false,
    style,
}: FadeSlideInProps) {
    const axis = direction === "up" || direction === "down" ? "y" : "x";
    const sign =
        direction === "down" || direction === "right" ? -distance : distance;

    return (
        <motion.div
            className={className}
            style={style}
            initial={{
                opacity: 0,
                [axis]: sign,
            }}
            {...(onLoad
                ? {
                      animate: { opacity: 1, [axis]: 0 },
                  }
                : {
                      whileInView: { opacity: 1, [axis]: 0 },
                      viewport: defaultViewport,
                  })}
            transition={{
                ...springTransition,
                duration,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   3. StaggerContainer — Staggers children
   ───────────────────────────────────────────── */

const staggerContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const staggerItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ...springTransition,
            duration: 0.7,
        },
    },
};

interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
    onLoad?: boolean;
}

export function StaggerContainer({
    children,
    className,
    stagger = 0.1,
    delay = 0,
    onLoad = false,
}: StaggerContainerProps) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
            initial="hidden"
            {...(onLoad
                ? { animate: "visible" }
                : { whileInView: "visible", viewport: defaultViewport })}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
    style,
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <motion.div
            className={className}
            style={style}
            variants={staggerItemVariants}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   4. ScaleRotateIn — Scale + Rotate + Fade
   ───────────────────────────────────────────── */

interface ScaleRotateInProps {
    children: React.ReactNode;
    className?: string;
    rotate?: number;
    scale?: number;
    delay?: number;
    onLoad?: boolean;
    style?: React.CSSProperties;
}

export function ScaleRotateIn({
    children,
    className,
    rotate = 8,
    scale = 0.8,
    delay = 0,
    onLoad = false,
    style,
}: ScaleRotateInProps) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{
                opacity: 0,
                scale,
                rotate,
            }}
            {...(onLoad
                ? {
                      animate: { opacity: 1, scale: 1, rotate: 0 },
                  }
                : {
                      whileInView: { opacity: 1, scale: 1, rotate: 0 },
                      viewport: defaultViewport,
                  })}
            transition={{
                ...springTransition,
                duration: 0.9,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   5. FloatingBadge — Float in from direction
   ───────────────────────────────────────────── */

interface FloatingBadgeProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    fromX?: number;
    fromY?: number;
}

export function FloatingBadge({
    children,
    className,
    delay = 0,
    fromX = 0,
    fromY = 30,
}: FloatingBadgeProps) {
    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                x: fromX,
                y: fromY,
                scale: 0.8,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                ...springTransition,
                duration: 1.0,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   6. ScaleIn — Simple scale + fade
   ───────────────────────────────────────────── */

interface ScaleInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    onLoad?: boolean;
    scale?: number;
}

export function ScaleIn({
    children,
    className,
    delay = 0,
    onLoad = false,
    scale = 0.95,
}: ScaleInProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale }}
            {...(onLoad
                ? { animate: { opacity: 1, scale: 1 } }
                : {
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: defaultViewport,
                  })}
            transition={{
                ...springTransition,
                duration: 0.8,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   7. PopIn — Scale pop for pills/icons
   ───────────────────────────────────────────── */

export function PopIn({
    children,
    className,
    delay = 0,
    onLoad = false,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    onLoad?: boolean;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.6 }}
            {...(onLoad
                ? { animate: { opacity: 1, scale: 1 } }
                : {
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: defaultViewport,
                  })}
            transition={{
                type: "spring",
                stiffness: 140,
                damping: 14,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
