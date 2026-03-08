import type { App } from "@/app/[locale]/api/[[...slugs]]/route";
import { env } from "@/env";
import { treaty } from "@elysiajs/eden";

export const client = treaty<App>(
    env.NEXT_PUBLIC_VERCEL_URL
        ? `${env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000", // TODO: use typesafe env variable
);
