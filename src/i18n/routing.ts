import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["en", "pl"],

	defaultLocale: "pl",
	localePrefix: "never",
	localeDetection: true,

	pathnames: {
		"/": {
			en: "/",
			pl: "/",
		},
		"/welcome": {
			en: "/welcome",
			pl: "/witaj",
		},
	},
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
