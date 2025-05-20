import type { TableRow } from "@/types/table-rows";
import { checkCurrentWeekParity } from "@/lib/data/helpers";
import { MdOutlinePlace, MdOutlineClass } from "react-icons/md";
import { cn } from "@/lib/utils";

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
                return cn(baseClasses, "bg-blue-500 text-white");
            case "EXERCISES":
                return cn(baseClasses, "bg-green-500 text-white");
            case "LABORATORY":
            case "COMPUTER_LABORATORY":
                return cn(baseClasses, "bg-purple-500 text-white");
            case "PROJECT":
                return cn(baseClasses, "bg-yellow-500 text-black");
            case "SEMINAR":
                return cn(baseClasses, "bg-red-500 text-white");
            default:
                return cn(baseClasses, "bg-gray-500 text-white");
        }
    };

    // TODO: add proper input type and inspect parser
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
            <td
                className={cn(
                    "text-foreground w-20 border-r px-2 py-3 text-sm whitespace-nowrap",
                )}
            >
                <div className={cn("flex flex-col items-center")}>
                    <span>{row.timeEntry.start}</span>
                    <span className={cn("text-muted-foreground text-xs")}>
                        {/* TODO: add tranlations */}
                        to
                    </span>
                    <span>{row.timeEntry.end}</span>
                </div>
            </td>
            <td className={cn("px-2 py-3")}>
                <div
                    className={cn(
                        "bg-card relative flex h-24 flex-col items-center justify-center gap-1.5 rounded-lg p-1",
                    )}
                >
                    {foundClassEntry && (
                        <>
                            <span
                                className={getClassTypeBadge(
                                    foundClassEntry.classType,
                                )}
                            >
                                {getClassTypeLabel(foundClassEntry.classType)}
                            </span>
                            <div
                                className={cn(
                                    "flex flex-row items-center gap-1 text-center text-sm sm:text-base",
                                )}
                            >
                                <MdOutlineClass className="flex-shrink-0 text-lg" />
                                <span className={cn("line-clamp-2")}>
                                    {foundClassEntry.subject}
                                </span>
                            </div>
                            <div
                                className={cn(
                                    "flex flex-row items-center gap-1 text-sm",
                                )}
                            >
                                <MdOutlinePlace className="flex-shrink-0 text-lg" />
                                <span>{foundClassEntry.room}</span>
                            </div>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}
