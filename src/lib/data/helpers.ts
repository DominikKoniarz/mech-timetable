import type { ClassesTuple } from "@/types/classes";
import { WeekType } from "@/types/week";

export const checkCurrentWeekParity = (): WeekType => {
	const now = new Date();
	const startOfYear = new Date(now.getFullYear(), 0, 1);
	const days = Math.floor(
		(now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
	);
	const weekNumber = Math.ceil((days + startOfYear.getDay()) / 7);

	return weekNumber % 2 === 0 ? WeekType.EVEN : WeekType.ODD;
};

export const initClassesTuple = (): ClassesTuple => {
	return [[], [], [], [], []];
};
