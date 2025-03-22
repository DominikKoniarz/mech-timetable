"use client";

import { Department } from "@/types/departments";
import { Form } from "@/components/ui/form";
import WelcomeSelects from "./welcome-selects";
import SubmitButton from "./submit-button";
import useWelcomeForm from "../_hooks/use-welcome-form";

type Props = {
	departments: Department[];
};

export default function WelcomeForm({ departments }: Props) {
	const { form, onSubmit, isPending } = useWelcomeForm(departments);

	return (
		<form className="w-fit mt-10 space-y-4" onSubmit={onSubmit}>
			<Form {...form}>
				<WelcomeSelects departments={departments} />
				<SubmitButton isPending={isPending} />
			</Form>
		</form>
	);
}
