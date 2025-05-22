import { checkCurrentWeekParity } from "@/lib/data/helpers";
import { ClassEntry } from "@/types/classes";
import { useMainPageStore } from "../context/main-page-provider";
import { useMemo } from "react";
import { WeekType } from "@/types/week";

const useClassEntry = (classEntries: ClassEntry[]) => {
    const currentParity = checkCurrentWeekParity();

    const displayNextWeek = useMainPageStore((state) => state.displayNextWeek);

    const foundClassEntry = useMemo(() => {
        const selectedParity: WeekType = !displayNextWeek
            ? currentParity
            : currentParity === WeekType.EVEN
              ? WeekType.ODD
              : WeekType.EVEN;

        // Find the class entry that matches the current parity or has no parity
        const foundClassEntry = classEntries.find(
            (classItem) =>
                classItem.parity === selectedParity ||
                classItem.parity === null,
        );

        return foundClassEntry;
    }, [displayNextWeek, currentParity, classEntries]);

    return {
        foundClassEntry,
    };
};

export default useClassEntry;
