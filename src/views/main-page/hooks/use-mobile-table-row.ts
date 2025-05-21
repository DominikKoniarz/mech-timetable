import type { ClassEntry } from "@/types/classes";
import type { TableRow } from "@/types/table-rows";
import { checkCurrentWeekParity } from "@/lib/data/helpers";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props = {
    row: TableRow;
    selectedDay: number;
};

const useMobileTableRow = ({ row, selectedDay }: Props) => {
    const parity = checkCurrentWeekParity();
    const classEntries = row.availableClasses[selectedDay];

    const foundClassEntry = useMemo(() => {
        return classEntries.find(
            (classItem) =>
                classItem.parity === parity || classItem.parity === null,
        );
    }, [classEntries, parity]);

    const getClassTypeBadge = (type: ClassEntry["classType"]) => {
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

    const getClassTypeLabel = (type: ClassEntry["classType"]) => {
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

    return {
        foundClassEntry,
        getClassTypeBadge,
        getClassTypeLabel,
    };
};

export default useMobileTableRow;
