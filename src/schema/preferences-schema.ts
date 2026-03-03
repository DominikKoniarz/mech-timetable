import { z } from "zod/mini";

export const legacyPreferencesSchema = z.object({
    departmentName: z.string().check(z.minLength(1)),
    groups: z.array(z.string().check(z.minLength(1))),
});

export type LegacyPreferencesSchema = z.infer<typeof legacyPreferencesSchema>;

export const profilePreferencesSchema = z.object({
    name: z.string().check(z.minLength(1)),
    departmentName: z.string().check(z.minLength(1)),
    groups: z.array(z.string().check(z.minLength(1))),
});

export type ProfilePreferencesSchema = z.infer<typeof profilePreferencesSchema>;

export const preferencesSchema = z.object({
    profiles: z.array(profilePreferencesSchema).check(z.minLength(1)),
});

export type PreferencesSchema = z.infer<typeof preferencesSchema>;
