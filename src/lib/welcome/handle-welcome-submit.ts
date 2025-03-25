import "server-only";

import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import { BadRequestError, ForbiddenError } from "@/types/errors";
import { verifyReCaptcha } from "@/lib/re-captcha";
import { setUserPreferences } from "../data/cookies";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export const handleWelcomeSubmit = async (data: WelcomeFormSchema) => {
	if (!data.reCaptchaToken)
		throw new BadRequestError("Valid reCaptcha token is required");

	const { success } = await verifyReCaptcha(data.reCaptchaToken);

	if (!success) throw new ForbiddenError("reCaptcha verification failed");

	await setUserPreferences(data);

	redirect({ href: "/", locale: await getLocale() });
};
