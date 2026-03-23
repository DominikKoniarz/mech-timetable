import type { PreferencesSchema } from "@/schema/preferences-schema";
import {
    PREFERENCES_COOKIE_KEY,
    PREFERENCES_COOKIE_OPTIONS,
} from "@/constants/cookies";
import { getCookie, setCookie } from "cookies-next/client";
import { parseUserPreferencesCookie } from "@/lib/data/cookies/cookies-helpers";

export const setUserPreferencesOnTheClient = (
    preferences: PreferencesSchema,
) => {
    const preferencesString = JSON.stringify(preferences);

    setCookie(
        PREFERENCES_COOKIE_KEY,
        preferencesString,
        PREFERENCES_COOKIE_OPTIONS,
    );
};

export const getUserPreferencesOnTheClient = (): PreferencesSchema | null => {
    const preferencesCookie = getCookie(PREFERENCES_COOKIE_KEY);
    return parseUserPreferencesCookie(preferencesCookie ?? null);
};
