import type { Department } from "@/types/departments";
import {
    COMPUTER_LAB_GROUPS,
    LAB_GROUPS,
    PROJECT_GROUPS,
} from "@/types/groups";
import type { TFunction } from "@/types/i18n";
import { z } from "zod";

export const getWelcomeFormSchema = (
    t: TFunction<"welcomePage.form.validation">,
    departments: Department[],
) => {
    const departmentsNames = departments.map((department) => department.name);

    const welcomeFormSchema = z.object({
        reCaptchaToken: z.string(),
        departmentName: z.enum([departmentsNames[0], ...departmentsNames], {
            required_error: t("selectDepartment"),
            message: t("selectDepartment"),
        }),
        laboratoryGroup: z.nativeEnum(LAB_GROUPS, {
            invalid_type_error: t("selectLaboratoryGroup"),
            message: t("selectLaboratoryGroup"),
        }),
        computerLaboratoryGroup: z.nativeEnum(COMPUTER_LAB_GROUPS, {
            invalid_type_error: t("selectComputerLaboratoryGroup"),
            message: t("selectComputerLaboratoryGroup"),
        }),
        projectGroup: z.nativeEnum(PROJECT_GROUPS, {
            invalid_type_error: t("selectProjectGroup"),
            message: t("selectProjectGroup"),
        }),
    });

    return welcomeFormSchema;
};

export type WelcomeFormSchema = z.infer<
    ReturnType<typeof getWelcomeFormSchema>
>;
