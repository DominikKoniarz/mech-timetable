import type { ClassEntry } from "@/types/classes";
import { checkCurrentWeekParity } from "@/lib/data/helpers";
import { MdOutlinePlace, MdOutlineClass } from "react-icons/md";

type Props = {
	classEntries: ClassEntry[];
};

export default function TableCell({ classEntries }: Props) {
	const parity = checkCurrentWeekParity();

	// Find the class entry that matches the current parity or has no parity
	const foundClassEntry = classEntries.find(
		(classItem) => classItem.parity === parity || classItem.parity === null
	);

	return (
		<td className="px-4 py-2">
			<div className="h-24 bg-card rounded-lg flex flex-col justify-center items-center gap-2">
				{foundClassEntry && foundClassEntry.classType !== "LECTURE" && (
					<>
						<div className="flex flex-row items-center gap-1 text-base">
							<MdOutlineClass className="text-xl" /> {foundClassEntry.subject}
						</div>
						<div className="flex flex-row items-center gap-1 text-base">
							<MdOutlinePlace className="text-xl" /> {foundClassEntry.room}
						</div>
					</>
				)}
			</div>
		</td>
	);
}
