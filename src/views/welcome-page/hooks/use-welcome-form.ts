import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { Department } from "@/types/departments";
import submitWelcomeFormAction from "@/actions/welcome";
import { actionError } from "@/lib/action-error";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getWelcomeFormSchema } from "@/schema/welcome-form-schema";
import { GroupsByFirstLetter } from "@/types/groups";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const useWelcomeForm = (
    departments: Department[],
    userPreferences: PreferencesSchema | null,
    parsedGroups: GroupsByFirstLetter | null,
    departmentName: string | undefined,
) => {
    const [isGettingReCaptcha, setIsGettingReCaptcha] = useState(false);
    const reCaptchaRef = useRef<ReCAPTCHA>(null);

    const t = useTranslations("welcomePage.form.validation");

    const resetFormAndCaptcha = () => {
        reCaptchaRef.current?.reset();

        form.reset({
            reCaptchaToken: "",
            departmentName: form.getValues("departmentName"),
            groups: Array(Object.keys(parsedGroups ?? {}).length).fill(""),
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

    const form = useForm({
        resolver: zodResolver(
            getWelcomeFormSchema(t, departments, parsedGroups),
        ),
        defaultValues: {
            reCaptchaToken: "",
            departmentName:
                departmentName ?? userPreferences?.departmentName ?? "",
            groups: Array(Object.keys(parsedGroups ?? {}).length).fill(""),
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        form.reset({
            reCaptchaToken: "",
            departmentName: form.getValues("departmentName"),
            groups: Array(Object.keys(parsedGroups ?? {}).length).fill(""),
        });
    }, [parsedGroups, form]);

    const onSubmit = form.handleSubmit(async (data) => {
        setIsGettingReCaptcha(true);
        const token = await reCaptchaRef.current?.executeAsync();

        execute({
            ...data,
            reCaptchaToken: token ?? "",
        });

        // call after execute to be sure that action isPending is set to true
        setIsGettingReCaptcha(false);
    });

    return {
        form,
        onSubmit,
        isPending: isPending || isGettingReCaptcha,
        reCaptchaRef,
    };
};

export default useWelcomeForm;
