import type { App } from "@/app/[locale]/api/[[...slugs]]/route";
import { env } from "@/env";
import { treaty } from "@elysiajs/eden";

export const client = treaty<App>(
    process.env.NEXT_PUBLIC_VERCEL_URL
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000",
);

// TODO: remove later after final release
console.log(process.env.NEXT_PUBLIC_VERCEL_URL, env.NEXT_PUBLIC_VERCEL_URL);
