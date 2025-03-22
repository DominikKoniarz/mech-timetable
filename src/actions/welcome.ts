"use server";

import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";
import { actionClient } from "@/lib/safe-action";
import { getWelcomeFormSchema } from "@/schema/welcome-form-schema";
import { getTranslations } from "next-intl/server";

const submitWelcomeFormAction = actionClient
	.schema(async () => {
		const [t, departmentsHtml] = await Promise.all([
			getTranslations("welcomePage.form.validation"),
			fetchDepartmentsList(),
		]);

		const departments = parseDepartmentsList(departmentsHtml);

		return getWelcomeFormSchema(t, departments);
	})
	.action(async ({ parsedInput }) => {
		console.log(parsedInput);
	});

export default submitWelcomeFormAction;
