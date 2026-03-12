import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import {
    type PreferencesSchema,
    preferencesSchema,
} from "@/schema/preferences-schema";

export const filterPreferencesInput = (
    preferences: Omit<WelcomeFormSchema, "reCaptchaToken">,
    defaultProfileName: string,
): PreferencesSchema => {
    // filter out potential reCaptchaToken from the preferences object
    // if you are not aware you could pass it with the preferences object even if type is Omit<WelcomeFormSchema, "reCaptchaToken">
    // then you will leak it into the cookie
    return {
        profiles: [
            {
                name: defaultProfileName,
                departmentName: preferences.departmentName,
                groups: preferences.groups,
            },
        ],
    };
};

export const parseUserPreferencesCookie = (
    cookie: string | null,
): PreferencesSchema | null => {
    if (!cookie) return null;

    let parsedJson: unknown;

    try {
        parsedJson = JSON.parse(decodeURIComponent(cookie));
    } catch {
        return null;
    }

    const parseResult = preferencesSchema.safeParse(parsedJson);

    if (!parseResult.success) {
        return null;
    }

    return parseResult.data;
};
