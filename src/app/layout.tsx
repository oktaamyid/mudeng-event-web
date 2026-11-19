import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
// import "@uploadthing/react/styles.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({
    weight: "400",
    variable: "--font-anton",
    subsets: ["latin"],
    display: "swap",
});

const inter = Inter({
    weight: ["400", "500", "600"],
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
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
            { url: "/event/favicon.ico" },
            { url: "/event/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/event/favicon.svg", type: "image/svg+xml" },
        ],
        apple: "/event/apple-touch-icon.png",
    },
    manifest: "/event/site.webmanifest",
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
    verification: {
        other: {
            "msvalidate.01": ["C3591A71AD0662B4BF4374B3130209A5"],
        },
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
            className={`${anton.variable} ${inter.variable} antialiased`}
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `if(history.scrollRestoration){history.scrollRestoration='manual'}`,
                    }}
                />
            </head>
            <body className="flex min-h-screen flex-col" suppressHydrationWarning>
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
