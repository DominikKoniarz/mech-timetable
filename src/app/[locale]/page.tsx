"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function Home() {
	const { setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	const t = useTranslations();

	return (
		<main className="w-full h-full bg-background text-foreground">
			<h1 className="font-bold text-4xl">Welcome to Mech Timetable</h1>
			<p>foo bar</p>
			<button onClick={toggleTheme}>Toggle Theme</button>
			{/* set system */}
			<button onClick={() => setTheme("system")}>Set System</button>
			<span>{t("welcome")}</span>
			{/* change locale */}
			<Link href="/" locale="en">
				En
			</Link>
			<Link href="/" locale="pl">
				Pl
			</Link>
		</main>
	);
}
