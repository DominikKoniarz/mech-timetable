import type { App } from "@/app/[locale]/api/[[...slugs]]/route";
import { env } from "@/env";
import { treaty } from "@elysiajs/eden";

export const client = treaty<App>(
    env.NEXT_PUBLIC_APP_URL
        ? `${env.NEXT_PUBLIC_APP_URL}`
        : "http://localhost:3000",
);
