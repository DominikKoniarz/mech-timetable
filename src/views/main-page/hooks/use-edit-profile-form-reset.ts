import type { EditProfileFormSchema } from "@/schema/edit-profile-form-schema";
import type { ProfilePreferencesSchema } from "@/schema/preferences-schema";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useEffectEvent, useLayoutEffect, useRef } from "react";

const useEditProfileFormReset = ({
    dialogOpen,
    form,
    groupsByFirstLetter,
    isLoadingGroups,
    selectedDepartmentName,
    initialProfile,
}: {
    dialogOpen: boolean;
    form: UseFormReturn<EditProfileFormSchema>;
    groupsByFirstLetter: GroupsByFirstLetter | null;
    isLoadingGroups: boolean;
    selectedDepartmentName: string;
    initialProfile: ProfilePreferencesSchema;
}) => {
    const skipFirstResetRef = useRef(true);
    const closeResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const resetGroups = useEffectEvent(
        (
            groupsByFirstLetter: GroupsByFirstLetter | null,
            selectedDepartmentName: string,
        ) => {
            if (skipFirstResetRef.current) {
                skipFirstResetRef.current = false;

                if (selectedDepartmentName === initialProfile.departmentName) {
                    return;
                }
            }

            if (!selectedDepartmentName) {
                form.setValue("groups", []);
                return;
            }

            // when groups for selected department are loaded, set groups to empty array with length of groups by first letter
            if (groupsByFirstLetter) {
                form.setValue(
                    "groups",
                    Array(Object.keys(groupsByFirstLetter ?? {}).length).fill(
                        "",
                    ),
                );
            } else {
                form.setValue("groups", []);
            }
        },
    );

    useEffect(() => {
        if (!dialogOpen || isLoadingGroups) return;

        resetGroups(groupsByFirstLetter, selectedDepartmentName);
    }, [
        groupsByFirstLetter,
        isLoadingGroups,
        selectedDepartmentName,
        dialogOpen,
    ]);

    const resetOnClose = useEffectEvent((editProfileDialogOpen: boolean) => {
        if (!editProfileDialogOpen) {
            const timer = setTimeout(() => {
                form.reset({
                    profileName: initialProfile.name,
                    departmentName: initialProfile.departmentName,
                    groups: initialProfile.groups,
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
        resetOnClose(dialogOpen);
    }, [dialogOpen]);

    // reset skipFirstResetRef when dialog is closed
    // to prevent skipping reset when dialog is opened again
    useLayoutEffect(() => {
        return () => {
            skipFirstResetRef.current = true;
        };
    });
};

export default useEditProfileFormReset;
