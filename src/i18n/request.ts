import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { unstable_cache } from "next/cache";

const getMessages = unstable_cache(
    async (locale: string) => {
        let messages;

        try {
            messages = (await import(`../../messages/${locale}.json`)).default;
        } catch {
            console.error(`No messages found for locale: ${locale}`);
            messages = {};
        }

        return messages;
    },
    undefined,
    { revalidate: undefined },
);

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    const messages = await getMessages(locale);

    return {
        locale,
        messages,
        formats: null,
    };
});
