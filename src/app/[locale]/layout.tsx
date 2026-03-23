import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import Providers from "@/components/providers/providers";
import "../globals.css";

const inter = Inter({
    subsets: ["latin", "latin-ext"],
    style: ["italic", "normal"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://mt.dominikkoniarz.pl"),
    title: {
        default: "Mech Timetable | Faculty of Mechanical Engineering PK",
        template: "%s | Mech Timetable",
    },
    description:
        "Unofficial timetable tool for students of the Faculty of Mechanical Engineering at Cracow University of Technology. Quickly browse classes, groups and schedules.",
    keywords: [
        "Mech Timetable",
        "Cracow University of Technology",
        "Politechnika Krakowska",
        "Faculty of Mechanical Engineering",
        "Wydzial Mechaniczny PK",
        "PK timetable",
        "timetable",
        "schedule",
        "mechanical engineering",
        "class schedule",
        "student planner",
        "student tools",
        "pk plan zajęć",
        "pk plan",
        "mech pk plan",
    ],
    authors: [
        {
            name: "Dominik Koniarz",
            url: "https://github.com/DominikKoniarz",
        },
    ],
    creator: "Dominik Koniarz",
    publisher: "Dominik Koniarz",
    // alternates: {
    //     canonical: "/",
    // },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        // googleBot: {
        //     index: true,
        //     follow: true,
        //     "max-image-preview": "large",
        //     "max-snippet": -1,
        //     "max-video-preview": -1,
        // },
    },
    // TODO: cover this
    // openGraph: {
    //     type: "website",
    //     locale: "en_US",
    //     siteName: "Mech Timetable",
    //     title: "Mech Timetable | Faculty of Mechanical Engineering PK",
    //     description:
    //         "Timetable and schedule browser for students of the Faculty of Mechanical Engineering at Cracow University of Technology.",
    //     url: "/",
    // },
    // twitter: {
    //     card: "summary_large_image",
    //     title: "Mech Timetable | Faculty of Mechanical Engineering PK",
    //     description:
    //         "Timetable and schedule browser for students of the Faculty of Mechanical Engineering at Cracow University of Technology.",
    // },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const locale = await getLocale();

    if (!routing.locales.includes(locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <Providers>
                    {children}
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
