import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    /*
     * Serverside Environment variables, not available on the client.
     * Will throw if you access these variables on the client.
     */
    server: {
        NODE_ENV: z.string(),
        RECAPTCHA_SECRET_KEY: z.string().min(1),
    },
    /*
     * Environment variables available on the client (and server).
     *
     * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
     */
    client: {
        NEXT_PUBLIC_IS_DEV: z.boolean(),
        NEXT_PUBLIC_IS_PROD: z.boolean(),
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
        NEXT_PUBLIC_ENABLE_RECAPTCHA: z
            .string()
            .transform((val) => val === "true"),
        NEXT_PUBLIC_VERCEL_URL: z.url().optional(),
    },
    /*
     * Due to how Next.js bundles environment variables on Edge and Client,
     * we need to manually destructure them to make sure all are included in bundle.
     *
     * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
     */
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_IS_DEV: process.env.NODE_ENV === "development",
        NEXT_PUBLIC_IS_PROD: process.env.NODE_ENV === "production",
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        NEXT_PUBLIC_ENABLE_RECAPTCHA: process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA,
        NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    },
});
