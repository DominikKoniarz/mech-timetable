import type { Department } from "@/types/departments";
import {
    getAddProfileFormSchema,
    type AddProfileFormSchema,
} from "@/schema/add-profile-form-schema";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useAddProfileForm = (
    departments: Department[],
    onOpenChange: (open: boolean) => void,
) => {
    const t = useTranslations("addProfileDialog.validation");

    const form = useForm<AddProfileFormSchema>({
        resolver: zodResolver(getAddProfileFormSchema(t, departments)),
        defaultValues: {
            profileName: "",
            departmentName: "",
            groups: [],
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const selectedDepartmentName = useWatch({
        control: form.control,
        name: "departmentName",
    });

    const onSubmit = form.handleSubmit((data) => {
        console.log("Add profile submit:", data);
        onOpenChange(false);
    });

    return {
        form,
        onSubmit,
        selectedDepartmentName,
    };
};

export default useAddProfileForm;
