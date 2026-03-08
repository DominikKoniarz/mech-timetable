import "server-only";

import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import {
    legacyPreferencesSchema,
    type PreferencesSchema,
    preferencesSchema,
} from "@/schema/preferences-schema";
import { cookies } from "next/headers";
import { env } from "@/env";
import {
    PREFERENCES_COOKIE_KEY,
    PREFERENCES_COOKIE_MAX_AGE_SECONDS,
} from "@/constants/cookies";

export const setUserPreferences = async (
    preferences: Omit<WelcomeFormSchema, "reCaptchaToken">,
) => {
    const preferencesString = JSON.stringify(
        filterPreferencesInput(preferences),
    );

    (await cookies()).set(PREFERENCES_COOKIE_KEY, preferencesString, {
        path: "/",
        maxAge: PREFERENCES_COOKIE_MAX_AGE_SECONDS,
        httpOnly: true,
        sameSite: "lax",
        secure: env.NEXT_PUBLIC_IS_PROD,
    });
};

export const getUserPreferences =
    async (): Promise<PreferencesSchema | null> => {
        const preferencesCookie = (await cookies()).get(PREFERENCES_COOKIE_KEY);
        if (!preferencesCookie) return null;

        let parsedJson: unknown;

        try {
            parsedJson = JSON.parse(preferencesCookie.value);
        } catch {
            return null;
        }

        const legacyParseResult = legacyPreferencesSchema.safeParse(parsedJson);

        if (legacyParseResult.success) {
            return {
                profiles: [
                    {
                        name: "Profile 1", // TODO: translate this
                        departmentName: legacyParseResult.data.departmentName,
                        groups: legacyParseResult.data.groups,
                    },
                ],
            };
        }

        const parseResult = preferencesSchema.safeParse(parsedJson);
        if (!parseResult.success) return null;

        return parseResult.data;
    };

export const filterPreferencesInput = (
    preferences: Omit<WelcomeFormSchema, "reCaptchaToken">,
): PreferencesSchema => {
    // filter out potential reCaptchaToken from the preferences object
    // if you are not aware you could pass it with the preferences object even if type is Omit<WelcomeFormSchema, "reCaptchaToken">
    // then you will leak it into the cookie
    return {
        profiles: [
            {
                name: "Profile 1", // TODO: translate this
                departmentName: preferences.departmentName,
                groups: preferences.groups,
            },
        ],
    };
};
