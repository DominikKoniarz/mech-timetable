"use client";

import { useTheme } from "next-themes";

export default function ThemeChange() {
	const { setTheme } = useTheme();

	return (
		<button
			type="button"
			className="cursor-pointer"
			onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
		>
			Change Theme
		</button>
	);
}
