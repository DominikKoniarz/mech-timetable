import QueryClientProvider from "@/components/providers/query-client-provider";
import { CookiesNextProvider } from "cookies-next";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

type Props = {
    children: React.ReactNode;
};

export default function Providers({ children }: Props) {
    return (
        <NextIntlClientProvider>
            <ThemeProvider
                defaultTheme="dark"
                // attribute="class" // causes blinking
                enableSystem
                disableTransitionOnChange
            >
                <NuqsAdapter>
                    <CookiesNextProvider pollingOptions={{ enabled: false }}>
                        <QueryClientProvider>{children}</QueryClientProvider>
                    </CookiesNextProvider>
                </NuqsAdapter>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}
