import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
	const handleI18Routing = createMiddleware(routing);
	const response = handleI18Routing(request);

	return response;
}

export const config = {
	// Match only internationalized pathnames
	matcher: [
		// "/",
		// "/(pl|en)/:path*",
		// "/:path*",
		// "/((?!api|_next|_vercel|.*\\..*).*)",
		"/((?!api|_next|_vercel|.*\\..*).*)",
	],
};
