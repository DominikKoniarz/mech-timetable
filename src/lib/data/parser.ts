import type { Department } from "@/types/departments";
import type { TableRow } from "@/types/table-rows";
import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { TimeEntry } from "@/types/hours";
import type { ClassType } from "@/types/classes";
import { initClassesTuple } from "./helpers";
import { WeekType } from "@/types/week";
import {
    COMPUTER_LAB_GROUPS,
    LAB_GROUPS,
    PROJECT_GROUPS,
} from "@/types/groups";
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

                let classHasAssignedGroup: boolean = false;
                let classType: ClassType = "OTHER";

                Object.values(LAB_GROUPS).forEach((group) => {
                    if (subject.includes(group)) {
                        classHasAssignedGroup = true;
                        classType = "LABORATORY";
                    }
                });

                Object.values(COMPUTER_LAB_GROUPS).forEach((group) => {
                    if (subject.includes(group)) {
                        classHasAssignedGroup = true;
                        classType = "COMPUTER_LABORATORY";
                    }
                });

                Object.values(PROJECT_GROUPS).forEach((group) => {
                    if (subject.includes(group)) {
                        classHasAssignedGroup = true;
                        classType = "PROJECT";
                    }
                });

                if (subject.endsWith("W")) {
                    classType = "LECTURE";
                }

                if (subject.endsWith("S")) {
                    classType = "SEMINAR";
                }

                if (subject.endsWith("Ć")) {
                    classType = "EXERCISES";
                }

                // if class type is LABORATORY or COMPUTER_LABORATORY or PROJECT
                // but user is assigned to a different group
                // then skip this class
                if (
                    classHasAssignedGroup &&
                    !(
                        subject.includes(userPreferences.laboratoryGroup) ||
                        subject.includes(
                            userPreferences.computerLaboratoryGroup,
                        ) ||
                        subject.includes(userPreferences.projectGroup)
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
