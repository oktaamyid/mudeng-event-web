/* eslint-disable @next/next/no-page-custom-font */
import { ClerkProvider } from "@clerk/nextjs";
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
    metadataBase: new URL("https://mudeng.unf.ac.id/event"),
    title: {
        default: "Mudeng Event",
        template: "%s | Mudeng Event",
    },
    description:
        "Mudeng Event - Elite creative subscription and workshops to elevate your digital presence and portfolio.",
    keywords: [
        "mudeng",
        "event",
        "workshop",
        "creative",
        "design",
        "portfolio",
    ],
    openGraph: {
        title: "Mudeng Event",
        description:
            "Elite creative subscription and workshops to elevate your digital presence.",
        url: "https://mudeng.unf.ac.id/event",
        siteName: "Mudeng Event",
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mudeng Event",
        description:
            "Elite creative subscription and workshops to elevate your digital presence.",
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
            <body className="flex min-h-full flex-col">
                <ClerkProvider>{children}</ClerkProvider>
            </body>
        </html>
    );
}
