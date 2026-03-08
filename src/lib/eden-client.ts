import type { App } from "@/app/[locale]/api/[[...slugs]]/route";
import { treaty } from "@elysiajs/eden";

export const client = treaty<App>(
    process.env.NEXT_PUBLIC_VERCEL_URL
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000", // TODO: use typesafe env variable
);
