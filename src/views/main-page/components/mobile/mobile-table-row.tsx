import type { TableRow } from "@/types/table-rows";
import { checkCurrentWeekParity } from "@/lib/data/helpers";
import { MdOutlinePlace, MdOutlineClass } from "react-icons/md";

type Props = {
    row: TableRow;
    selectedDay: number;
};

export default function MobileTableRow({ row, selectedDay }: Props) {
    const parity = checkCurrentWeekParity();
    const classEntries = row.availableClasses[selectedDay];

    // Find the class entry that matches the current parity or has no parity
    const foundClassEntry = classEntries.find(
        (classItem) => classItem.parity === parity || classItem.parity === null,
    );

    // Helper function to get class type badge style
    const getClassTypeBadge = (type: string) => {
        const baseClasses = "text-xs px-2 py-1 rounded absolute top-2 right-2";

        switch (type) {
            case "LECTURE":
                return `${baseClasses} bg-blue-500 text-white`;
            case "EXERCISES":
                return `${baseClasses} bg-green-500 text-white`;
            case "LABORATORY":
            case "COMPUTER_LABORATORY":
                return `${baseClasses} bg-purple-500 text-white`;
            case "PROJECT":
                return `${baseClasses} bg-yellow-500 text-black`;
            case "SEMINAR":
                return `${baseClasses} bg-red-500 text-white`;
            default:
                return `${baseClasses} bg-gray-500 text-white`;
        }
    };

    // Helper function to get abbreviated class type
    const getClassTypeLabel = (type: string) => {
        switch (type) {
            case "LECTURE":
                return "LEC";
            case "EXERCISES":
                return "EX";
            case "LABORATORY":
                return "LAB";
            case "COMPUTER_LABORATORY":
                return "C-LAB";
            case "PROJECT":
                return "PROJ";
            case "SEMINAR":
                return "SEM";
            default:
                return "OTHER";
        }
    };

    return (
        <tr className="border-b last:border-b-0">
            <td className="text-foreground w-20 border-r px-3 py-3 text-sm">
                {row.timeEntry.start} - {row.timeEntry.end}
            </td>
            <td className="px-3 py-3">
                <div className="bg-card relative flex h-24 flex-col items-center justify-center gap-2 rounded-lg">
                    {foundClassEntry && (
                        <>
                            <span
                                className={getClassTypeBadge(
                                    foundClassEntry.classType,
                                )}
                            >
                                {getClassTypeLabel(foundClassEntry.classType)}
                            </span>
                            <div className="flex flex-row items-center gap-1 text-base">
                                <MdOutlineClass className="text-lg" />{" "}
                                {foundClassEntry.subject}
                            </div>
                            <div className="flex flex-row items-center gap-1 text-base">
                                <MdOutlinePlace className="text-lg" />{" "}
                                {foundClassEntry.room}
                            </div>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}
