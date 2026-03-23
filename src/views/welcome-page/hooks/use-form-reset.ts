import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { UseFormReturn } from "react-hook-form";
import type { Department } from "@/types/departments";
import type { PreferencesSchema } from "@/schema/preferences-schema";
import { useEffect, useEffectEvent } from "react";

const useFormReset = ({
    form,
    groupsByFirstLetter,
    departments,
    userPreferences,
    isLoadingGroups,
}: {
    form: UseFormReturn<WelcomeFormSchema>;
    groupsByFirstLetter: GroupsByFirstLetter | null;
    departments: Department[];
    userPreferences: PreferencesSchema | null;
    isLoadingGroups: boolean;
}) => {
    const resetForm = useEffectEvent(
        (parsedGroups: GroupsByFirstLetter | null) => {
            form.setValue("reCaptchaToken", "");

            form.setValue("departmentName", form.getValues("departmentName"));

            form.setValue(
                "groups",
                Array(Object.keys(parsedGroups ?? {}).length).fill(""),
            );
        },
    );

    const resetFormDepartmentName = useEffectEvent(() => {
        const departmentName =
            userPreferences?.profiles.at(0)?.departmentName ??
            departments.at(0)?.name ??
            null;

        if (departmentName) {
            form.setValue("departmentName", departmentName);
        }
    });

    useEffect(() => {
        if (isLoadingGroups) return;

        if (groupsByFirstLetter) {
            resetForm(groupsByFirstLetter);
        } else {
            resetFormDepartmentName();
        }
    }, [groupsByFirstLetter, isLoadingGroups]);
};

export default useFormReset;
