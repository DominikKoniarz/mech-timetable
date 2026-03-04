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
    title: "Mech Timetable",
    // description:
    // "Timetable for Faculty of Mechanical Engineering of CUT - a tool for students | by Dominik Koniarz",
    keywords: [
        "timetable",
        "schedule",
        "mechanical engineering",
        "student tools",
    ],
    authors: {
        name: "Dominik Koniarz",
        url: "https://github.com/DominikKoniarz",
    },
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
