"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	COMPUTER_LAB_GROUPS,
	getWelcomeFormSchema,
	LAB_GROUPS,
	PROJECT_GROUPS,
} from "@/schema/welcome-form-schema";
import { useTranslations } from "next-intl";
import { Department } from "@/types/departments";
import { Form } from "@/components/ui/form";
import WelcomeSelects from "./welcome-selects";
import SubmitButton from "./submit-button";

type Props = {
	departments: Department[];
};

export default function WelcomeForm({ departments }: Props) {
	const t = useTranslations("welcomePage.form.validation");

	const form = useForm({
		resolver: zodResolver(getWelcomeFormSchema(t, departments)),
		defaultValues: {
			departmentName: departments[0].name,
			laboratoryGroup: LAB_GROUPS.L01,
			computerLaboratoryGroup: COMPUTER_LAB_GROUPS.K01,
			projectGroup: PROJECT_GROUPS.P01,
		},
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	return (
		<form className="w-fit mt-10 space-y-4">
			<Form {...form}>
				<WelcomeSelects departments={departments} />
				<SubmitButton />
			</Form>
		</form>
	);
}
