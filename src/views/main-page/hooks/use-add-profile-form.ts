import type { Department } from "@/types/departments";
import {
    getAddProfileFormSchema,
    type AddProfileFormSchema,
} from "@/schema/add-profile-form-schema";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserPreferences from "@/hooks/use-user-preferences";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";

const useAddProfileForm = (
    departments: Department[],
    onOpenChange: (open: boolean) => void,
) => {
    const t = useTranslations("addProfileDialog.validation");

    const { addProfile } = useUserPreferences();

    const setProfileIndex = useMainPageStore((store) => store.setProfileIndex);

    const form = useForm<AddProfileFormSchema>({
        resolver: zodResolver(getAddProfileFormSchema(t, departments)),
        defaultValues: {
            profileName: "",
            departmentName: "",
            groups: [],
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const selectedDepartmentName = useWatch({
        control: form.control,
        name: "departmentName",
    });

    const onSubmit = form.handleSubmit((data) => {
        const newProfileIndex = addProfile({
            name: data.profileName,
            departmentName: data.departmentName,
            groups: data.groups,
        });

        if (newProfileIndex === null) {
            return;
        }

        onOpenChange(false);

        setTimeout(() => {
            setProfileIndex(newProfileIndex);
        }, 0);
    });

    return {
        form,
        onSubmit,
        selectedDepartmentName,
    };
};

export default useAddProfileForm;
