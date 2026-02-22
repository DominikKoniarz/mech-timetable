import type { TableRow } from "@/types/table-rows";
import { WeekType } from "@/types/week";

const getWeekMonday = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

const getWeekParity = (date: Date): WeekType => {
    const year = date.getFullYear();
    const octFirst = new Date(year, 9, 1);
    const referenceDate =
        date < octFirst ? new Date(year - 1, 9, 1) : octFirst;

    const referenceWeekMonday = getWeekMonday(referenceDate);
    const currentWeekMonday = getWeekMonday(date);

    const daysDiff = Math.floor(
        (currentWeekMonday.getTime() - referenceWeekMonday.getTime()) /
            (1000 * 60 * 60 * 24),
    );
    const weeksDiff = Math.floor(daysDiff / 7);

    const isEven = weeksDiff % 2 !== 0;
    return isEven ? WeekType.EVEN : WeekType.ODD;
};

const parseTime = (timeStr: string): { hours: number; minutes: number } => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return { hours, minutes };
};

const formatICSDateTime = (date: Date, timeStr: string): string => {
    const { hours, minutes } = parseTime(timeStr);
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
};

const generateUID = (
    date: Date,
    dayIndex: number,
    slotIndex: number,
): string => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `mech-timetable-${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-day${dayIndex}-slot${slotIndex}@mech.pk.edu.pl`;
};

export const generateICS = (rows: TableRow[]): string => {
    const now = new Date();
    const year = now.getFullYear();

    const octFirst = new Date(year, 9, 1);
    const academicYearStart =
        now < octFirst ? new Date(year - 1, 9, 1) : octFirst;
    // Jul 1 of next academic year (exclusive)
    const academicYearEnd = new Date(
        academicYearStart.getFullYear() + 1,
        6,
        1,
    );

    const events: string[] = [];

    let currentWeekMonday = getWeekMonday(academicYearStart);

    while (currentWeekMonday < academicYearEnd) {
        const weekParity = getWeekParity(currentWeekMonday);

        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            const dayDate = new Date(currentWeekMonday);
            dayDate.setDate(dayDate.getDate() + dayIndex);

            if (dayDate < academicYearStart || dayDate >= academicYearEnd)
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
                        classType: matchingClass.classType,
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

            for (let slotIndex = 0; slotIndex < mergedSlots.length; slotIndex++) {
                const slot = mergedSlots[slotIndex];
                const dtStart = formatICSDateTime(dayDate, slot.start);
                const dtEnd = formatICSDateTime(dayDate, slot.end);
                const uid = generateUID(dayDate, dayIndex, slotIndex);

                events.push(
                    [
                        "BEGIN:VEVENT",
                        `DTSTART;TZID=Europe/Warsaw:${dtStart}`,
                        `DTEND;TZID=Europe/Warsaw:${dtEnd}`,
                        `SUMMARY:${slot.subject}`,
                        `LOCATION:${slot.room}`,
                        `DESCRIPTION:${slot.classType}`,
                        `UID:${uid}`,
                        "END:VEVENT",
                    ].join("\r\n"),
                );
            }
        }

        const nextMonday = new Date(currentWeekMonday);
        nextMonday.setDate(nextMonday.getDate() + 7);
        currentWeekMonday = nextMonday;
    }

    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//MechTimetable//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        ...events,
        "END:VCALENDAR",
    ].join("\r\n");
};
