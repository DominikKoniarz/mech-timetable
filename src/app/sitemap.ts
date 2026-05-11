import type { MetadataRoute } from "next";
import { env } from "@/env";

// NOT USING next-intl functions here bc there is/was some issue with createNavigation()

const BASE_URL = env.NEXT_PUBLIC_APP_URL.endsWith("/")
    ? env.NEXT_PUBLIC_APP_URL.slice(0, -1)
    : `${env.NEXT_PUBLIC_APP_URL}`;

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
            alternates: {
                languages: {
                    pl: `${BASE_URL}`,
                    en: `${BASE_URL}`,
                },
            },
        },
        {
            url: `${BASE_URL}/witaj`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
            alternates: {
                languages: {
                    pl: `${BASE_URL}/witaj`,
                    en: `${BASE_URL}/welcome`,
                },
            },
        },
    ];
}
