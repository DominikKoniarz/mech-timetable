import type { ClassEntry } from "@/types/classes";
import { checkCurrentWeekParity } from "@/lib/data/helpers";

type Props = {
	classEntries: ClassEntry[];
};

export default function TableCell({ classEntries }: Props) {
	const parity = checkCurrentWeekParity();

	const foundClassEntry = classEntries.find(
		(classItem) => classItem.parity === parity || classItem.parity === null
	);

	return (
		<td className="px-4 py-2">
			<div className="h-24 bg-card rounded-lg">
				{foundClassEntry &&
					`${foundClassEntry.subject} ${foundClassEntry.room}`}
			</div>
		</td>
	);
}
