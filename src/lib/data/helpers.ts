import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { ClassesTuple } from "@/types/classes";
import { WeekType } from "@/types/week";
import { Temporal } from "temporal-polyfill";

const toPlainDate = (date: Date): Temporal.PlainDate => {
    return Temporal.PlainDate.from({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    });
};

const toDate = (date: Temporal.PlainDate): Date => {
    return new Date(date.year, date.month - 1, date.day);
};

const getWeekStart = (date: Date): Date => {
    const plainDate = toPlainDate(date);
    const weekStart = plainDate.subtract({ days: plainDate.dayOfWeek - 1 });

    return toDate(weekStart);
};

/**
 * This one has to be updated each year
 */
export const getSemesterRangeForDate = (
    date: Date,
): { semesterStart: Date; semesterEndExclusive: Date } => {
    const normalizedDate = toPlainDate(date);
    const year = normalizedDate.year;

    const firstSemesterStartCurrentYear = Temporal.PlainDate.from({
        year,
        month: 10,
        day: 1,
    }); // 01.10.XXXX
    const firstSemesterEndExclusive = Temporal.PlainDate.from({
        year: year + 1,
        month: 2,
        day: 23,
    }); // 23.01.XXXX
    const secondSemesterStart = Temporal.PlainDate.from({
        year,
        month: 2,
        day: 23,
    }); // 23.01.XXXX
    const secondSemesterEndExclusive = Temporal.PlainDate.from({
        year,
        month: 7,
        day: 1,
    }); // 01.07.XXXX

    if (
        Temporal.PlainDate.compare(
            normalizedDate,
            firstSemesterStartCurrentYear,
        ) >= 0
    ) {
        return {
            semesterStart: toDate(firstSemesterStartCurrentYear),
            semesterEndExclusive: toDate(firstSemesterEndExclusive),
        };
    }

    if (
        Temporal.PlainDate.compare(normalizedDate, secondSemesterStart) >= 0 &&
        Temporal.PlainDate.compare(normalizedDate, secondSemesterEndExclusive) <
            0
    ) {
        return {
            semesterStart: toDate(secondSemesterStart),
            semesterEndExclusive: toDate(secondSemesterEndExclusive),
        };
    }

    if (Temporal.PlainDate.compare(normalizedDate, secondSemesterStart) < 0) {
        return {
            semesterStart: toDate(
                Temporal.PlainDate.from({
                    year: year - 1,
                    month: 10,
                    day: 1,
                }),
            ),
            semesterEndExclusive: toDate(
                Temporal.PlainDate.from({
                    year,
                    month: 2,
                    day: 23,
                }),
            ),
        };
    }

    return {
        semesterStart: toDate(firstSemesterStartCurrentYear),
        semesterEndExclusive: toDate(firstSemesterEndExclusive),
    };
};

export const getWeekParityForDate = (date: Date): WeekType => {
    const { semesterStart } = getSemesterRangeForDate(date);
    const referenceWeekStart = getWeekStart(semesterStart);
    const currentWeekStart = getWeekStart(date);

    const daysDiff = toPlainDate(referenceWeekStart).until(
        toPlainDate(currentWeekStart),
        { largestUnit: "day" },
    ).days;

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

export const getProfileFromParams = (
    profileIndexFromParams: number,
    preferences: PreferencesSchema,
) => {
    const requestedProfile = preferences.profiles.at(profileIndexFromParams);

    if (requestedProfile) {
        return {
            profile: requestedProfile,
            profileIndex: profileIndexFromParams,
        };
    }

    const firstProfile = preferences.profiles.at(0);

    if (firstProfile) {
        return {
            profile: firstProfile,
            profileIndex: 0,
        };
    }

    return null;
};
