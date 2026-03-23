import type { AddProfileFormSchema } from "@/schema/add-profile-form-schema";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useEffectEvent, useRef } from "react";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";

const useAddProfileFormReset = ({
    form,
    groupsByFirstLetter,
    isLoadingGroups,
}: {
    form: UseFormReturn<AddProfileFormSchema>;
    groupsByFirstLetter: GroupsByFirstLetter | null;
    isLoadingGroups: boolean;
}) => {
    const addProfileDialogOpen = useActionsMenuStore(
        (state) => state.addProfileDialogOpen,
    );

    const closeResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

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

    const resetOnClose = useEffectEvent((addProfileDialogOpen: boolean) => {
        if (!addProfileDialogOpen) {
            const timer = setTimeout(() => {
                form.reset({
                    profileName: "",
                    departmentName: "",
                    groups: [],
                });
            }, 300);

            closeResetTimerRef.current = timer;
        } else {
            if (closeResetTimerRef.current) {
                clearTimeout(closeResetTimerRef.current);
                closeResetTimerRef.current = null;
            }
        }
    });

    useEffect(() => {
        resetOnClose(addProfileDialogOpen);
    }, [addProfileDialogOpen]);
};

export default useAddProfileFormReset;
