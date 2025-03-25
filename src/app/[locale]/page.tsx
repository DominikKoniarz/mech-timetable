import { redirect } from "@/i18n/routing";
import { getUserPreferences } from "@/lib/data/cookies";
import { getLocale } from "next-intl/server";

export default async function Home() {
	const preferences = await getUserPreferences();

	if (!preferences) redirect({ href: "/welcome", locale: await getLocale() });

	// now fetch by preferences and filter out the data
	return JSON.stringify(preferences);
}
