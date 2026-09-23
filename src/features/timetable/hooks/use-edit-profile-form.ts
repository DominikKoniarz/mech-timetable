import type { Department } from "@/types/departments";
import type { ProfilePreferencesSchema } from "@/features/user/user-schema";
import {
    getEditProfileFormSchema,
    type EditProfileFormSchema,
} from "@/features/timetable/timetable-edit-profile-schema";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserPreferences from "@/features/user/hooks/use-user-preferences";
import { useInvalidateTimetableCacheByIndex } from "@/features/timetable/hooks/use-fetch-timetable";

const getDefaultValues = (
    profile: ProfilePreferencesSchema | null,
): EditProfileFormSchema => {
    if (!profile) {
        return {
            profileName: "",
            departmentName: "",
            groups: [],
        };
    }

    return {
        profileName: profile.name,
        departmentName: profile.departmentName,
        groups: profile.groups,
    };
};

const useEditProfileForm = ({
    departments,
    profileIndex,
    profile,
    onSuccess,
}: {
    departments: Department[];
    profileIndex: number;
    profile: ProfilePreferencesSchema | null;
    onSuccess: () => void;
}) => {
    const t = useTranslations("editProfileDialog.validation");

    const { updateProfile } = useUserPreferences();

    const { invalidate } = useInvalidateTimetableCacheByIndex();

    const form = useForm<EditProfileFormSchema>({
        resolver: zodResolver(getEditProfileFormSchema(t, departments)),
        defaultValues: getDefaultValues(profile),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const selectedDepartmentName = useWatch({
        control: form.control,
        name: "departmentName",
    });

    const onSubmit = form.handleSubmit((data) => {
        if (profileIndex === null) {
            return;
        }

        const result = updateProfile(profileIndex, {
            name: data.profileName,
            departmentName: data.departmentName,
            groups: data.groups,
        });

        if (!result) {
            return;
        }

        onSuccess();
        invalidate(profileIndex);
    });

    return {
        form,
        onSubmit,
        selectedDepartmentName,
    };
};

export default useEditProfileForm;
