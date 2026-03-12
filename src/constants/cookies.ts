import { env } from "@/env";

export const PREFERENCES_COOKIE_KEY = "NEXT_USER_PREFERENCES" as const;
export const PREFERENCES_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

export const PREFERENCES_MAX_PROFILES_COUNT = 3;

export const PREFERENCES_COOKIE_OPTIONS = {
    path: "/",
    maxAge: PREFERENCES_COOKIE_MAX_AGE_SECONDS,
    httpOnly: false,
    sameSite: "lax" as const,
    secure: env.NEXT_PUBLIC_IS_PROD,
};
