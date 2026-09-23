"use server";

import { getDepartments } from "@/features/department/department-queries";
import { setUserPreferences } from "@/features/user/user-queries";
import { actionClient } from "@/lib/safe-action";
import { getServerWelcomeFormSchema } from "@/features/welcome/welcome-schema";
import { BadRequestError, ForbiddenError } from "@/types/errors";
import { verifyReCaptcha } from "@/lib/re-captcha";
import { env } from "@/env";

const submitWelcomeFormAction = actionClient
    .inputSchema(async () => {
        const departments = await getDepartments();

        return getServerWelcomeFormSchema(departments);
    })
    .action(async ({ parsedInput }) => {
        if (env.NEXT_PUBLIC_ENABLE_RECAPTCHA) {
            if (!parsedInput.reCaptchaToken) {
                throw new BadRequestError("Valid reCaptcha token is required");
            }

            const { success } = await verifyReCaptcha(
                parsedInput.reCaptchaToken,
            );

            if (!success) {
                throw new ForbiddenError("reCaptcha verification failed");
            }
        }

        await setUserPreferences(parsedInput);

        return { success: true };
    });

export default submitWelcomeFormAction;
