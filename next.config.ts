import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    // logging: {
    //     fetches: {
    //         fullUrl: true,
    //     },
    // },
    // Use standalone output only when building for Docker
    output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,
    poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin({
    experimental: {
        // Provide the path to the messages that you're using in `AppConfig`
        createMessagesDeclaration: "./messages/en.json",
    },
});
export default withNextIntl(nextConfig);
