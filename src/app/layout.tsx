/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://mudeng.nurulfikri.ac.id/event"),
    title: {
        default: "MUDENG Event - Pelatihan & Workshop Multimedia",
        template: "%s | MUDENG Event",
    },
    description:
        "MUDENG Event adalah platform pendaftaran dan manajemen kelas interaktif, pelatihan, serta workshop multimedia untuk mengembangkan keahlian digital Anda.",
    keywords: [
        "mudeng",
        "nurul fikri",
        "sttnf",
        "stt terpadu nurul fikri",
        "ukm nurul fikri",
        "pelatihan IT",
        "workshop kreatif",
        "kelas UI/UX",
        "event desain",
        "bootcamp multimedia",
    ],
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
        title: "MUDENG Event - Pelatihan & Workshop Multimedia",
        description:
            "Platform pendaftaran dan manajemen kelas interaktif, pelatihan, serta workshop multimedia untuk mengembangkan keahlian digital Anda.",
        url: "https://mudeng.nurulfikri.ac.id/event",
        siteName: "MUDENG Event",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "https://cdn.mudeng.oktaa.my.id/seo/og-image.png",
                width: 1200,
                height: 630,
                alt: "MUDENG Event",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "MUDENG Event - Pelatihan & Workshop Multimedia",
        description:
            "Platform pendaftaran dan manajemen kelas interaktif, pelatihan, serta workshop multimedia untuk mengembangkan keahlian digital Anda.",
        images: ["https://cdn.mudeng.oktaa.my.id/seo/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
