"use client";

import { Department } from "@/types/departments";
import { Form } from "@/components/ui/form";
import WelcomeSelects from "./welcome-selects";
import SubmitButton from "./submit-button";
import useWelcomeForm from "../hooks/use-welcome-form";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/env";

type Props = {
	departments: Department[];
};

export default function WelcomeForm({ departments }: Props) {
	const { form, onSubmit, isPending, reCaptchaRef } =
		useWelcomeForm(departments);

	return (
		<form className="w-fit mt-10 space-y-4" onSubmit={onSubmit}>
			<Form {...form}>
				<ReCAPTCHA
					className="hidden"
					size="invisible"
					sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
					ref={reCaptchaRef}
				/>
				<WelcomeSelects departments={departments} />
				<SubmitButton isPending={isPending} />
			</Form>
		</form>
	);
}
