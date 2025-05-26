"use server";

import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";
import { actionClient } from "@/lib/safe-action";
import { handleWelcomeSubmit } from "@/lib/welcome/handle-welcome-submit";
import { getServerWelcomeFormSchema } from "@/schema/welcome-form-schema";

const submitWelcomeFormAction = actionClient
    .schema(async () => {
        const [departmentsHtml] = await Promise.all([fetchDepartmentsList()]);

        const departments = parseDepartmentsList(departmentsHtml);

        return getServerWelcomeFormSchema(departments);
    })
    .action(async ({ parsedInput }) => {
        await handleWelcomeSubmit(parsedInput);

        return { success: true };
    });

export default submitWelcomeFormAction;
