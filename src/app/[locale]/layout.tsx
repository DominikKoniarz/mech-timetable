import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Link, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { FaGithub } from "react-icons/fa6";
import "../globals.css";

const inter = Inter({
	subsets: ["latin", "latin-ext"],
	style: ["italic", "normal"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Mech Timetable",
	description: "Mech Timetable by Dominik Koniarz",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const locale = await getLocale();

	if (!routing.locales.includes(locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className}`}>
				<NextIntlClientProvider>
					<ThemeProvider
						defaultTheme="system"
						// attribute="class" // causes blinking
						enableSystem
						disableTransitionOnChange
					>
						<header className="w-full bg-background p-3  border-b mb-2 border-border justify-between flex flex-row items-center">
							<Link
								href="/welcome"
								className="p-1 block m-0 cursor-pointer text-sm bg-foreground text-background font-medium rounded-sm px-2 py-1"
							>
								Zmień grupę
							</Link>
							<Link
								// @ts-expect-error github link
								href="https://github.com/DominikKoniarz/mech-timetable"
								target="_blank"
								className="text-2xl mx-auto"
							>
								<FaGithub className="text-foreground" />
							</Link>
							<div className="opacity-0 p-1">Zmień grupę</div>
						</header>
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
