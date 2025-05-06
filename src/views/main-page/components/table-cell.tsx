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
        (classItem) => classItem.parity === parity || classItem.parity === null,
    );

    return (
        <td className="px-2 py-2 lg:px-4">
            <div className="bg-card flex h-24 flex-col items-center justify-center gap-2 rounded-lg">
                {foundClassEntry && (
                    <>
                        <div className="flex flex-row items-center gap-1 text-base">
                            <MdOutlineClass className="text-lg lg:text-xl" />{" "}
                            {foundClassEntry.subject}
                        </div>
                        <div className="flex flex-row items-center gap-1 text-base">
                            <MdOutlinePlace className="text-lg lg:text-xl" />{" "}
                            {foundClassEntry.room}
                        </div>
                    </>
                )}
            </div>
        </td>
    );
}
