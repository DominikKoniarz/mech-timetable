import "server-only";

import type { WelcomeFormSchema } from "@/features/welcome/welcome-schema";
import type { PreferencesSchema } from "@/features/user/user-schema";
import { cookies } from "next/headers";
import {
    PREFERENCES_COOKIE_KEY,
    PREFERENCES_COOKIE_OPTIONS,
} from "@/features/user/user-constants";
import {
    filterPreferencesInput,
    parseUserPreferencesCookie,
} from "@/features/user/user-cookie-helpers";
import { getTranslations } from "next-intl/server";

export async function setUserPreferences(
    preferences: Omit<WelcomeFormSchema, "reCaptchaToken">,
) {
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
}

export async function getUserPreferences(): Promise<PreferencesSchema | null> {
    const preferencesCookie = (await cookies()).get(PREFERENCES_COOKIE_KEY);

    return parseUserPreferencesCookie(preferencesCookie?.value ?? null);
}
