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

    const updatePreferencesCookie = (preferences: PreferencesSchema) => {
        setCookie(
            PREFERENCES_COOKIE_KEY,
            JSON.stringify(preferences),
            PREFERENCES_COOKIE_OPTIONS,
        );
    };

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

        updatePreferencesCookie(newPreferences);

        const newProfileIndex = newPreferences.profiles.length - 1;

        return newProfileIndex;
    };

    const removeProfile = (profileIndex: number) => {
        if (!preferences) {
            return null;
        }

        if (preferences.profiles.length <= 1) {
            return null;
        }

        const profileExists =
            profileIndex >= 0 && profileIndex < preferences.profiles.length;

        if (!profileExists) {
            return null;
        }

        const newProfiles = preferences.profiles.filter(
            (_, index) => index !== profileIndex,
        );

        const newPreferences: PreferencesSchema = {
            profiles: newProfiles,
        };

        updatePreferencesCookie(newPreferences);

        return {
            updatedProfilesCount: newPreferences.profiles.length,
        };
    };

    const updateProfile = (
        profileIndex: number,
        updatedProfile: ProfilePreferencesSchema,
    ) => {
        if (!preferences) {
            return null;
        }

        const profileExists =
            profileIndex >= 0 && profileIndex < preferences.profiles.length;

        if (!profileExists) {
            return null;
        }

        const newProfiles = preferences.profiles.map((profile, index) => {
            if (index !== profileIndex) {
                return profile;
            }

            return updatedProfile;
        });

        const newPreferences: PreferencesSchema = {
            profiles: newProfiles,
        };

        updatePreferencesCookie(newPreferences);

        return {
            updatedProfileIndex: profileIndex,
        };
    };

    const revalidatePreferencesCookie = () => {
        revalidateCookiesState();
    };

    return {
        preferences,
        addProfile,
        removeProfile,
        updateProfile,
        revalidatePreferencesCookie,
    };
};

export default useUserPreferences;
