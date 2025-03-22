import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

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
		formats: null,
	};
});
