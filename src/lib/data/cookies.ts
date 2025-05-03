import "server-only";

import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import {
    type PreferencesSchema,
    preferencesSchema,
} from "@/schema/preferences-schema";
import { cookies } from "next/headers";
import { env } from "@/env";

export const PREFERENCES_COOKIE_KEY = "USER_PREFERENCES" as const;

export const setUserPreferences = async (
    preferences: Omit<WelcomeFormSchema, "reCaptchaToken">,
) => {
    const preferencesString = JSON.stringify(
        filterPreferencesInput(preferences),
    );

    (await cookies()).set(PREFERENCES_COOKIE_KEY, preferencesString, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: "lax",
        secure: env.NEXT_PUBLIC_IS_PROD,
    });
};

export const getUserPreferences =
    async (): Promise<PreferencesSchema | null> => {
        const preferencesCookie = (await cookies()).get(PREFERENCES_COOKIE_KEY);
        if (!preferencesCookie) return null;

        const parsedJson = JSON.parse(preferencesCookie.value);
        if (!preferencesSchema.safeParse(parsedJson).success) return null;

        return parsedJson;
    };

export const filterPreferencesInput = (
    preferences: Omit<WelcomeFormSchema, "reCaptchaToken">,
): PreferencesSchema => {
    // filter out potential reCaptchaToken from the preferences object
    // if you are not aware you could pass it with the preferences object even if type is Omit<WelcomeFormSchema, "reCaptchaToken">
    // then you will leak it into the cookie
    return {
        departmentName: preferences.departmentName,
        laboratoryGroup: preferences.laboratoryGroup,
        computerLaboratoryGroup: preferences.computerLaboratoryGroup,
        projectGroup: preferences.projectGroup,
    };
};
