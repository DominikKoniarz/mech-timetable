import type { Department } from "@/types/departments";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { TFunction } from "@/types/i18n";
import { z } from "zod/mini";

export const getServerWelcomeFormSchema = (departments: Department[]) => {
    const departmentsNames = departments.map((department) => department.name);

    const serverWelcomeFormSchema = z.object({
        reCaptchaToken: z.string(),
        departmentName: z.enum([departmentsNames[0], ...departmentsNames]),
        groups: z.array(z.string().check(z.minLength(1))),
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
            error: t("selectDepartment"),
        }),
        groups: z
            .array(
                z
                    .string({
                        error: t("selectGroup"),
                    })
                    .check(
                        z.minLength(1, {
                            error: t("selectGroup"),
                        }),
                    ),
            )
            .check(z.minLength(Object.keys(parsedGroups ?? {}).length)),
    });

    return welcomeFormSchema;
};

export type WelcomeFormSchema = z.infer<
    ReturnType<typeof getWelcomeFormSchema>
>;
