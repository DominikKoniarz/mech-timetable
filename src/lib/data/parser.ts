import type { Department } from "@/types/departments";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { TableRow } from "@/types/table-rows";
import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { TimeEntry } from "@/types/hours";
import type { ClassType } from "@/types/classes";
import { initClassesTuple } from "./helpers";
import { WeekType } from "@/types/week";
import * as cheerio from "cheerio";

export const parseDepartmentsList = (html: string): Department[] => {
    const $ = cheerio.load(html);

    const departmentsDiv = $("#oddzialy");
    if (departmentsDiv.length === 0)
        throw new Error("Departments list not found");

    const anchorTags = departmentsDiv.find("p.el a");
    if (anchorTags.length === 0) throw new Error("Departments not found");

    const departments: Department[] = [];

    anchorTags.each((_, element) => {
        const department = $(element).text();
        const departmentUrl = $(element).attr("href");

        if (departmentUrl)
            departments.push({
                name: department,
                url: departmentUrl,
            });
    });

    return departments;
};

export const parseRows = (
    departmentHtml: string,
    userPreferences: PreferencesSchema,
): TableRow[] => {
    const $ = cheerio.load(departmentHtml);
    const table = $("table.tabela");

    if (!table.length) {
        throw new Error("Table not found");
    }

    // skip the first row (header)
    const $rows = table.find("tbody > tr").slice(1);

    const parsedRows: TableRow[] = [];

    $rows.each((_, row) => {
        const timeEntry: TimeEntry = {
            start: $(row).find("td.g").text().split("-")[0].trim(),
            end: $(row).find("td.g").text().split("-")[1].trim(),
        };

        const classes = initClassesTuple();

        const $cells = $(row).find("td.l");

        $cells.each((cellIndex, cell) => {
            if (cellIndex >= classes.length) return;

            const possibleClassEntries = $(cell).html()?.split("<br>");
            if (!possibleClassEntries || possibleClassEntries.length === 0)
                return;

            possibleClassEntries.forEach((possibleClassEntry) => {
                const wrapped = $("<div></div>")
                    .html(possibleClassEntry)
                    .toString();

                const subjectElement = $(wrapped).find(".p");
                const rawSubject = subjectElement.text();

                // cut after - or #
                let dashOrHashTagIndex = rawSubject.indexOf("-");
                if (dashOrHashTagIndex === -1) {
                    dashOrHashTagIndex = rawSubject.indexOf("#");
                }

                let subject = rawSubject;
                if (dashOrHashTagIndex !== -1) {
                    subject = rawSubject
                        .substring(0, dashOrHashTagIndex)
                        .trim();
                }

                // subject = subject.substring(0, subject.lastIndexOf(" "));

                const roomElement = $(wrapped).find(".s");
                const rawRoom = roomElement.text();

                // cut after -p or -n
                const room = rawRoom.replace(/-p|-n/, "");

                const roomParity: WeekType | null = rawRoom.endsWith("-p")
                    ? WeekType.EVEN
                    : rawRoom.endsWith("-n")
                      ? WeekType.ODD
                      : null;

                if (!room || !subject) return;

                const { classType, isGroupClass } = extractClassType(subject);

                if (
                    isGroupClass &&
                    !userPreferences.groups.some((group) =>
                        subject.includes(group),
                    )
                )
                    return;

                classes[cellIndex].push({
                    subject,
                    room,
                    parity: roomParity,
                    classType,
                });
            });
        });

        parsedRows.push({
            timeEntry,
            availableClasses: classes,
        });
    });

    return parsedRows;
};

export const parseGroups = (departmentHtml: string): GroupsByFirstLetter => {
    const $ = cheerio.load(departmentHtml);

    const subjectsSpans = $("span.p");

    const groupsByFirstLetter = new Map<string, Set<string>>();

    subjectsSpans.each((_, element) => {
        const subject = $(element).text();

        const match = subject.match(/(?<!#)[A-Z]0[1-9]/);

        if (match) {
            const matchString = match[0];
            const firstLetter = matchString[0];

            const exists = groupsByFirstLetter.get(firstLetter);
            if (exists) {
                exists.add(matchString);
            } else {
                groupsByFirstLetter.set(firstLetter, new Set([matchString]));
            }
        }
    });

    groupsByFirstLetter.forEach((value, key) => {
        const sortedValues = Array.from(value).sort();
        groupsByFirstLetter.set(key, new Set(sortedValues));
    });

    // sort by first letter
    const toReturn = Object.fromEntries(
        Array.from(groupsByFirstLetter.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => [
                key,
                Array.from(value).sort((a, b) => a.localeCompare(b)),
            ]),
    );

    return toReturn;
};

/*
 *   isGroupClass means that the class is a group class - not all student have classes at the same time
 *   e.g. laboratory, computer laboratory, project
 */
export const extractClassType = (
    subject: string,
): { classType: ClassType; isGroupClass: boolean } => {
    const laboratoryRegExp = /(?<!#)[L]0[1-9]/;
    const computerLabRegExp = /(?<!#)[K]0[1-9]/;
    const projectRegExp = /(?<!#)[P]0[1-9]/;

    if (subject.endsWith("W")) {
        return { classType: "LECTURE", isGroupClass: false };
    } else if (subject.endsWith("S")) {
        return { classType: "SEMINAR", isGroupClass: false };
    } else if (subject.endsWith("Ć")) {
        return { classType: "EXERCISES", isGroupClass: false };
    } else if (laboratoryRegExp.test(subject)) {
        return { classType: "LABORATORY", isGroupClass: true };
    } else if (computerLabRegExp.test(subject)) {
        return { classType: "COMPUTER_LABORATORY", isGroupClass: true };
    } else if (projectRegExp.test(subject)) {
        return { classType: "PROJECT", isGroupClass: true };
    }

    return { classType: "OTHER", isGroupClass: false };
};
