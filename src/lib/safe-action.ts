import { env } from "@/env";
import {
	BadRequestError,
	ForbiddenError,
	UnauthorizedError,
} from "@/types/errors";
import { getTranslations } from "next-intl/server";
import { createSafeActionClient } from "next-safe-action";

const logActionError = (error: Error) => {
	const log = () =>
		console.log(
			`${new Date().toLocaleString()} Server action error: ${error.message}`,
			error.stack
		);

	const isServerError = () => {
		return (
			!(error instanceof BadRequestError) &&
			!(error instanceof UnauthorizedError) &&
			!(error instanceof ForbiddenError)
		);
	};

	if (env.NEXT_PUBLIC_IS_DEV) log();

	// Log only server (500) errors in production
	if (env.NEXT_PUBLIC_IS_PROD && isServerError()) log();
};

export const actionClient = createSafeActionClient({
	handleServerError: async (error) => {
		logActionError(error);

		if (error instanceof BadRequestError) {
			return error.message;
		}

		if (error instanceof UnauthorizedError) {
			return error.message;
		}

		if (error instanceof ForbiddenError) {
			return error.message;
		}

		const t = await getTranslations("safeAction");

		return t("internalServerError");
	},
	defaultValidationErrorsShape: "flattened",
});
