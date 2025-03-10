import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (
        !locale ||
        !routing.locales.includes(locale as (typeof routing.locales)[number])
    ) {
        locale = routing.defaultLocale;
    }

    let messages;

    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch {
        console.error(`No messages found for locale: ${locale}`);
        messages = {};
    }

    return {
        locale,
        messages,
    };
});
