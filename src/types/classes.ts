import type { WeekType } from "./week";

export type ClassEntry = {
	subject: string;
	room: string;
	// matchedUserLaboratoryGroup
	parity: WeekType | null;
};

export type ClassesTuple = [
	ClassEntry[],
	ClassEntry[],
	ClassEntry[],
	ClassEntry[],
	ClassEntry[]
];
