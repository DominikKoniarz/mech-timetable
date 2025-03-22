import {
	BadRequestError,
	ForbiddenError,
	UnauthorizedError,
} from "@/types/errors";
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

	if (process.env.NODE_ENV === "development") log();

	// Log only server (500) errors in production
	if (process.env.NODE_ENV === "production" && isServerError()) log();
};

export const actionClient = createSafeActionClient({
	handleServerError: (error) => {
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

		return "Internal server error occured! Please try again later.";
	},
	defaultValidationErrorsShape: "flattened",
});
