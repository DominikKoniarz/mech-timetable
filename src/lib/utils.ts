import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const checkIsServer = () => typeof window === "undefined";
export const checkIsClient = () => !checkIsServer();
