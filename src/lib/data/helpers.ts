import type { ClassesTuple } from "@/types/classes";
import { WeekType } from "@/types/week";

const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);

    return d;
};

export const getSemesterRangeForDate = (
    date: Date,
): { semesterStart: Date; semesterEndExclusive: Date } => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    const year = normalizedDate.getFullYear();

    const firstSemesterStartCurrentYear = new Date(year, 10, 1); // 01.11.
    const firstSemesterEndExclusive = new Date(year + 1, 1, 23); // 23.01.
    const secondSemesterStart = new Date(year, 1, 23); // 23.01.
    const secondSemesterEndExclusive = new Date(year, 6, 1); // 01.07.

    if (normalizedDate >= firstSemesterStartCurrentYear) {
        return {
            semesterStart: firstSemesterStartCurrentYear,
            semesterEndExclusive: firstSemesterEndExclusive,
        };
    }

    if (
        normalizedDate >= secondSemesterStart &&
        normalizedDate < secondSemesterEndExclusive
    ) {
        return {
            semesterStart: secondSemesterStart,
            semesterEndExclusive: secondSemesterEndExclusive,
        };
    }

    if (normalizedDate < secondSemesterStart) {
        return {
            semesterStart: new Date(year - 1, 10, 1),
            semesterEndExclusive: new Date(year, 1, 23),
        };
    }

    return {
        semesterStart: firstSemesterStartCurrentYear,
        semesterEndExclusive: firstSemesterEndExclusive,
    };
};

export const getWeekParityForDate = (date: Date): WeekType => {
    const { semesterStart } = getSemesterRangeForDate(date);
    const referenceWeekStart = getWeekStart(semesterStart);
    const currentWeekStart = getWeekStart(date);

    const daysDiff = Math.floor(
        (currentWeekStart.getTime() - referenceWeekStart.getTime()) /
            (1000 * 60 * 60 * 24),
    );
    const weeksDiff = Math.floor(daysDiff / 7);

    const isEven = weeksDiff % 2 !== 0;
    const weekParity = isEven ? WeekType.EVEN : WeekType.ODD;

    return weekParity;
};

export const checkCurrentWeekParity = (): WeekType => {
    return getWeekParityForDate(new Date());
};

export const initClassesTuple = (): ClassesTuple => {
    return [[], [], [], [], []];
};
