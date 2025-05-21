import type { TableRow } from "@/types/table-rows";
import { checkCurrentWeekParity } from "@/lib/data/helpers";
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

    return {
        foundClassEntry,
    };
};

export default useMobileTableRow;
