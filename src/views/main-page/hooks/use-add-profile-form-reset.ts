import type { AddProfileFormSchema } from "@/schema/add-profile-form-schema";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useEffectEvent } from "react";

const useAddProfileFormReset = ({
    form,
    groupsByFirstLetter,
    isLoadingGroups,
}: {
    form: UseFormReturn<AddProfileFormSchema>;
    groupsByFirstLetter: GroupsByFirstLetter | null;
    isLoadingGroups: boolean;
}) => {
    const resetGroups = useEffectEvent(
        (parsedGroups: GroupsByFirstLetter | null) => {
            form.setValue(
                "groups",
                Array(Object.keys(parsedGroups ?? {}).length).fill(""),
            );
        },
    );

    useEffect(() => {
        if (isLoadingGroups) return;

        if (groupsByFirstLetter) {
            resetGroups(groupsByFirstLetter);
        } else {
            form.setValue("groups", []);
        }
    }, [groupsByFirstLetter, isLoadingGroups, form]);
};

export default useAddProfileFormReset;
