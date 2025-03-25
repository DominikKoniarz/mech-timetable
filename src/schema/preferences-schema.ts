import { z } from "zod";

export const preferencesSchema = z.object({
	departmentName: z.string().min(1),
	laboratoryGroup: z.string().min(1),
	computerLaboratoryGroup: z.string().min(1),
	projectGroup: z.string().min(1),
});

export type PreferencesSchema = z.infer<typeof preferencesSchema>;
