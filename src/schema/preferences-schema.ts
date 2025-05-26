import { z } from "zod";

export const preferencesSchema = z.object({
    departmentName: z.string().min(1),
    groups: z.array(z.string().min(1)),
});

export type PreferencesSchema = z.infer<typeof preferencesSchema>;
