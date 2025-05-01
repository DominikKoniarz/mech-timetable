import type { ClassesTuple } from "./classes";
import type { TimeEntry } from "./hours";

// export type TableRow = {
// 	timeEntry: TimeEntry;
// 	classes: ClassesTuple;
// };

export type TableRow = {
	timeEntry: TimeEntry;
	// all available classes in single cell entry (to later pick valid one by parity)
	availableClasses: ClassesTuple;
};
