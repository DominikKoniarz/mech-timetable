"use client";

import { useTheme } from "next-themes";

export default function Home() {
	const { setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};
	return (
		<main className="w-full h-full bg-background text-foreground">
			<h1 className="font-bold text-4xl">Welcome to Mech Timetable</h1>
			<p>foo bar</p>
			<button onClick={toggleTheme}>Toggle Theme</button>
			{/* set system */}
			<button onClick={() => setTheme("system")}>Set System</button>
		</main>
	);
}
