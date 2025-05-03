import {
    COMPUTER_LAB_GROUPS,
    LAB_GROUPS,
    PROJECT_GROUPS,
} from "@/types/groups";
import { z } from "zod";

export const preferencesSchema = z.object({
    departmentName: z.string().min(1),
    laboratoryGroup: z.nativeEnum(LAB_GROUPS),
    computerLaboratoryGroup: z.nativeEnum(COMPUTER_LAB_GROUPS),
    projectGroup: z.nativeEnum(PROJECT_GROUPS),
});

export type PreferencesSchema = z.infer<typeof preferencesSchema>;
