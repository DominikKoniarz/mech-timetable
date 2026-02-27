import type { TableRow } from "@/types/table-rows";
import type { ClassType } from "@/types/classes";
import { createEvents, type EventAttributes } from "ics";
import {
    getSemesterRangeForDate,
    getWeekParityForDate,
} from "@/lib/data/helpers";

const getWeekMonday = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);

    return d;
};

const toDateArray = (
    date: Date,
    timeStr: string,
): [number, number, number, number, number] => {
    const [hours, minutes] = timeStr.split(":").map(Number);

    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        hours,
        minutes,
    ];
};

type GenerateICSProps = {
    rows: TableRow[];
    translations: {
        [key in ClassType]: string;
    };
};

export const generateICS = ({
    rows,
    translations,
}: GenerateICSProps): string | null => {
    const now = new Date();
    const coverageStartDay = new Date(now);
    coverageStartDay.setHours(0, 0, 0, 0);

    const { semesterStart, semesterEndExclusive } =
        getSemesterRangeForDate(now);

    const events: EventAttributes[] = [];

    let currentWeekMonday = getWeekMonday(coverageStartDay);

    while (currentWeekMonday < semesterEndExclusive) {
        const weekParity = getWeekParityForDate(currentWeekMonday);

        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            const dayDate = new Date(currentWeekMonday);
            dayDate.setDate(dayDate.getDate() + dayIndex);

            if (
                dayDate < coverageStartDay ||
                dayDate < semesterStart ||
                dayDate >= semesterEndExclusive
            )
                continue;

            const daySlots: {
                timeEntry: { start: string; end: string };
                subject: string;
                room: string;
                classType: string;
            }[] = [];

            for (const row of rows) {
                const classesForDay = row.availableClasses[dayIndex];
                const matchingClass = classesForDay.find(
                    (c) => c.parity === weekParity || c.parity === null,
                );

                if (matchingClass) {
                    daySlots.push({
                        timeEntry: row.timeEntry,
                        subject: matchingClass.subject,
                        room: matchingClass.room,
                        classType: translations[matchingClass.classType],
                    });
                }
            }

            // Merge consecutive slots with the same class
            const mergedSlots: {
                start: string;
                end: string;
                subject: string;
                room: string;
                classType: string;
            }[] = [];

            for (const slot of daySlots) {
                if (mergedSlots.length > 0) {
                    const last = mergedSlots[mergedSlots.length - 1];

                    if (
                        last.subject === slot.subject &&
                        last.room === slot.room &&
                        last.classType === slot.classType
                    ) {
                        last.end = slot.timeEntry.end;
                        continue;
                    }
                }

                mergedSlots.push({
                    start: slot.timeEntry.start,
                    end: slot.timeEntry.end,
                    subject: slot.subject,
                    room: slot.room,
                    classType: slot.classType,
                });
            }

            for (const slot of mergedSlots) {
                events.push({
                    start: toDateArray(dayDate, slot.start),
                    startInputType: "local",
                    end: toDateArray(dayDate, slot.end),
                    endInputType: "local",
                    title: slot.subject,
                    location: slot.room,
                    description: slot.classType,
                });
            }
        }

        const nextMonday = new Date(currentWeekMonday);
        nextMonday.setDate(nextMonday.getDate() + 7);
        currentWeekMonday = nextMonday;
    }

    const { error, value } = createEvents(events, {
        productId: "-//MechTimetable//ICS Export//",
        calName: "Mech Timetable",
    });

    if (error || !value) {
        return null;
    }

    return value;
};
