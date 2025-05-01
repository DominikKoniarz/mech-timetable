import type { WeekType } from "./week";

export type ClassType =
	| "LECTURE"
	| "EXERCISES"
	| "LABORATORY"
	| "COMPUTER_LABORATORY"
	| "PROJECT"
	| "SEMINAR"
	| "OTHER";

export type ClassEntry = {
	subject: string;
	room: string;
	classType: ClassType;
	parity: WeekType | null;
};

export type ClassesTuple = [
	ClassEntry[],
	ClassEntry[],
	ClassEntry[],
	ClassEntry[],
	ClassEntry[]
];
