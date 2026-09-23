import type { Department } from "@/types/departments";
import type { TFunction } from "@/types/i18n";
import { z } from "zod/mini";

export const getEditProfileFormSchema = (
    t: TFunction<"editProfileDialog.validation">,
    departments: Department[],
) => {
    const departmentsNames = departments.map((department) => department.name);

    const editProfileFormSchema = z.object({
        profileName: z
            .string({
                error: t("profileNameRequired"),
            })
            .check(
                z.minLength(1, {
                    error: t("profileNameRequired"),
                }),
                z.maxLength(32, {
                    error: t("profileNameMaxLength"),
                }),
            ),
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
            .check(z.minLength(1)),
    });

    return editProfileFormSchema;
};

export type EditProfileFormSchema = z.infer<
    ReturnType<typeof getEditProfileFormSchema>
>;
