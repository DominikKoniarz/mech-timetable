import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const SITE_NAME = "Mech Timetable";

function openGraphLocale(locale: Locale): string {
    return locale === "pl" ? "pl_PL" : "en_US";
}

function fullTitle(segment: string): string {
    return `${segment} | ${SITE_NAME}`;
}

export async function buildHomeMetadata(): Promise<Metadata> {
    const [t, locale] = await Promise.all([
        getTranslations("mainPage.metadata"),
        getLocale(),
    ]);
    const pathname = getPathname({ locale, href: "/" });

    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: pathname,
        },
        openGraph: {
            type: "website",
            locale: openGraphLocale(locale),
            siteName: SITE_NAME,
            title: fullTitle(title),
            description,
            url: pathname,
        },
        twitter: {
            card: "summary",
            title: fullTitle(title),
            description,
        },
    };
}

export async function buildWelcomeMetadata(): Promise<Metadata> {
    const [t, locale] = await Promise.all([
        getTranslations("welcomePage.metadata"),
        getLocale(),
    ]);
    const pathname = getPathname({ locale, href: "/welcome" });

    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: pathname,
            languages: Object.fromEntries(
                routing.locales.map((loc) => [
                    loc,
                    getPathname({ locale: loc, href: "/welcome" }),
                ]),
            ),
        },
        openGraph: {
            type: "website",
            locale: openGraphLocale(locale),
            siteName: SITE_NAME,
            title: fullTitle(title),
            description,
            url: pathname,
        },
        twitter: {
            card: "summary",
            title: fullTitle(title),
            description,
        },
    };
}
