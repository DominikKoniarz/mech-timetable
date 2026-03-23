import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import type { PreferencesSchema } from "@/schema/preferences-schema";
import { cookies } from "next/headers";
import {
    PREFERENCES_COOKIE_KEY,
    PREFERENCES_COOKIE_OPTIONS,
} from "@/constants/cookies";
import {
    filterPreferencesInput,
    parseUserPreferencesCookie,
} from "@/lib/data/cookies/cookies-helpers";
import { getTranslations } from "next-intl/server";

export const setUserPreferences = async (
    preferences: Omit<WelcomeFormSchema, "reCaptchaToken">,
) => {
    const t = await getTranslations();

    const newPreferences = filterPreferencesInput(
        preferences,
        t("mainPage.actionMenu.defaultProfileName"),
    );

    const preferencesString = JSON.stringify(newPreferences);

    (await cookies()).set(
        PREFERENCES_COOKIE_KEY,
        preferencesString,
        PREFERENCES_COOKIE_OPTIONS,
    );
};

export const getUserPreferences =
    async (): Promise<PreferencesSchema | null> => {
        const preferencesCookie = (await cookies()).get(PREFERENCES_COOKIE_KEY);

        return parseUserPreferencesCookie(preferencesCookie?.value ?? null);
    };
