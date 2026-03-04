import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { Department } from "@/types/departments";
import {
    getWelcomeFormSchema,
    type WelcomeFormSchema,
} from "@/schema/welcome-form-schema";
import submitWelcomeFormAction from "@/actions/welcome";
import { actionError } from "@/lib/action-error";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupsByFirstLetter } from "@/types/groups";
import {
    startTransition,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useDepartmentName from "@/views/welcome-page/hooks/use-department-name";

const useWelcomeForm = (
    departments: Department[],
    userPreferences: PreferencesSchema | null,
) => {
    const [isGettingReCaptcha, setIsGettingReCaptcha] = useState(false);
    const reCaptchaRef = useRef<ReCAPTCHA>(null);

    const t = useTranslations("welcomePage.form.validation");

    const { departmentName: departmentNameSearchParam, setDepartmentName } =
        useDepartmentName();

    const resetFormAndCaptcha = () => {
        reCaptchaRef.current?.reset();

        form.reset({
            reCaptchaToken: "",
            departmentName: form.getValues("departmentName"),
            groups: [],
        });
    };

    const { execute, isPending } = useAction(submitWelcomeFormAction, {
        onError: (error) => {
            actionError(error).default();
            resetFormAndCaptcha();
        },
        onSuccess: () => {
            resetFormAndCaptcha();
        },
    });

    const form = useForm<WelcomeFormSchema>({
        resolver: zodResolver(getWelcomeFormSchema(t, departments)),
        defaultValues: {
            reCaptchaToken: "",
            departmentName:
                departmentNameSearchParam ??
                userPreferences?.profiles[0]?.departmentName ??
                "",
            groups: [],
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const selectedDepartmentName = useWatch({
        control: form.control,
        name: "departmentName",
    });

    const resetForm = useCallback(
        (parsedGroups: GroupsByFirstLetter | null) => {
            form.setValue("reCaptchaToken", "");

            form.setValue("departmentName", form.getValues("departmentName"));

            form.setValue(
                "groups",
                Array(Object.keys(parsedGroups ?? {}).length).fill(""),
            );
        },
        [form],
    );

    // TODO: fix this
    // eslint-disable-next-line react-hooks/refs
    const onSubmit = form.handleSubmit(async (data) => {
        startTransition(() => {
            setIsGettingReCaptcha(true);
        });

        const token = await reCaptchaRef.current?.executeAsync();

        execute({
            ...data,
            reCaptchaToken: token ?? "",
        });

        // call after execute to be sure that action isPending is set to true
        startTransition(() => {
            setIsGettingReCaptcha(false);
        });
    });

    useEffect(() => {
        if (selectedDepartmentName) {
            setDepartmentName(selectedDepartmentName);
        }
    }, [selectedDepartmentName, setDepartmentName]);

    return {
        form,
        onSubmit,
        isPending: isPending || isGettingReCaptcha,
        reCaptchaRef,
        resetForm,
        selectedDepartmentName,
    };
};

export default useWelcomeForm;
