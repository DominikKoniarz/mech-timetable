import type {
    PreferencesSchema,
    ProfilePreferencesSchema,
} from "@/schema/preferences-schema";
import {
    PREFERENCES_COOKIE_KEY,
    PREFERENCES_COOKIE_OPTIONS,
    PREFERENCES_MAX_PROFILES_COUNT,
} from "@/constants/cookies";
import { parseUserPreferencesCookie } from "@/lib/data/cookies/cookies-helpers";
import { useReactiveCookiesNext } from "cookies-next/client";

const useUserPreferences = () => {
    const { getCookie, setCookie, revalidateCookiesState } =
        useReactiveCookiesNext();

    const rawPreferences = getCookie(PREFERENCES_COOKIE_KEY);

    const preferences = parseUserPreferencesCookie(rawPreferences ?? null);

    const addProfile = (profile: ProfilePreferencesSchema) => {
        if (!preferences) {
            return null;
        }

        if (preferences.profiles.length >= PREFERENCES_MAX_PROFILES_COUNT) {
            return null;
        }

        const newPreferences: PreferencesSchema = {
            profiles: [...preferences.profiles, profile],
        };

        setCookie(
            PREFERENCES_COOKIE_KEY,
            JSON.stringify(newPreferences),
            PREFERENCES_COOKIE_OPTIONS,
        );

        const newProfileIndex = newPreferences.profiles.length - 1;

        return newProfileIndex;
    };

    const revalidatePreferencesCookie = () => {
        revalidateCookiesState();
    };

    return { preferences, addProfile, revalidatePreferencesCookie };
};

export default useUserPreferences;
