import "server-only";

import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import { BadRequestError, ForbiddenError } from "@/types/errors";
import { verifyReCaptcha } from "@/lib/re-captcha";

export const handleWelcomeSubmit = async (data: WelcomeFormSchema) => {
	if (!data.reCaptchaToken)
		throw new BadRequestError("Valid reCaptcha token is required");

	const { success } = await verifyReCaptcha(data.reCaptchaToken);

	if (!success) throw new ForbiddenError("reCaptcha verification failed");

	console.log(data);
};
