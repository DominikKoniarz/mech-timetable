import type { Department } from "@/types/departments";
import submitWelcomeFormAction from "@/actions/welcome";
import { actionError } from "@/lib/action-error";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	COMPUTER_LAB_GROUPS,
	getWelcomeFormSchema,
	LAB_GROUPS,
	PROJECT_GROUPS,
} from "@/schema/welcome-form-schema";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const useWelcomeForm = (departments: Department[]) => {
	const [isGettingReCaptcha, setIsGettingReCaptcha] = useState(false);
	const reCaptchaRef = useRef<ReCAPTCHA>(null);

	const t = useTranslations("welcomePage.form.validation");

	const resetFormAndCaptcha = () => {
		reCaptchaRef.current?.reset();

		form.reset({
			reCaptchaToken: "",
			departmentName: departments[0].name,
			laboratoryGroup: LAB_GROUPS.L01,
			computerLaboratoryGroup: COMPUTER_LAB_GROUPS.K01,
			projectGroup: PROJECT_GROUPS.P01,
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
		resolver: zodResolver(getWelcomeFormSchema(t, departments)),
		defaultValues: {
			reCaptchaToken: "",
			departmentName: departments[0].name,
			laboratoryGroup: LAB_GROUPS.L01,
			computerLaboratoryGroup: COMPUTER_LAB_GROUPS.K01,
			projectGroup: PROJECT_GROUPS.P01,
		},
		mode: "onBlur",
		reValidateMode: "onChange",
	});

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
