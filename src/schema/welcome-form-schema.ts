import type { Department } from "@/types/departments";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { TFunction } from "@/types/i18n";
import { z } from "zod";

export const getServerWelcomeFormSchema = (departments: Department[]) => {
    const departmentsNames = departments.map((department) => department.name);

    const serverWelcomeFormSchema = z.object({
        reCaptchaToken: z.string(),
        departmentName: z.enum([departmentsNames[0], ...departmentsNames]),
        groups: z.array(z.string().min(1)),
    });

    return serverWelcomeFormSchema;
};
export const getWelcomeFormSchema = (
    t: TFunction<"welcomePage.form.validation">,
    departments: Department[],
    parsedGroups: GroupsByFirstLetter | null,
) => {
    const departmentsNames = departments.map((department) => department.name);

    const welcomeFormSchema = z.object({
        reCaptchaToken: z.string(),
        departmentName: z.enum([departmentsNames[0], ...departmentsNames], {
            required_error: t("selectDepartment"),
            message: t("selectDepartment"),
        }),
        groups: z
            .array(
                z
                    .string({
                        invalid_type_error: t("selectGroup"),
                        required_error: t("selectGroup"),
                    })
                    .min(1, t("selectGroup")),
            )
            .min(Object.keys(parsedGroups ?? {}).length),
    });

    return welcomeFormSchema;
};

export type WelcomeFormSchema = z.infer<
    ReturnType<typeof getWelcomeFormSchema>
>;
