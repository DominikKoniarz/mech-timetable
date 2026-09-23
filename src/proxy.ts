import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
    const handleI18Routing = createMiddleware(routing);
    const response = handleI18Routing(request);

    if (!request.url.includes("/maintanance")) {
        return NextResponse.redirect(new URL("/maintanance", request.url));
    }

    return response;
}

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // "/",
        // "/(pl|en)/:path*",
        // "/:path*",
        // "/((?!api|_next|_vercel|.*\\..*).*)",
        "/((?!_next|_vercel|.*\\..*).*)",
    ],
};
