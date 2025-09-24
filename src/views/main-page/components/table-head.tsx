"use client";

import { useTranslations } from "next-intl";
import { useMainPageStore } from "../context/main-page-provider";
import { Button } from "@/components/ui/button";
import { checkCurrentWeekParity } from "@/lib/data/helpers";
import { WeekType } from "@/types/week";

export default function TableHead() {
    const t = useTranslations("mainPage.table.tableHead");

    const currentWeekParity = checkCurrentWeekParity();

    const { displayNextWeek, toggleDisplayNextWeek } = useMainPageStore(
        (state) => state,
    );

    const displayedWeekParity = displayNextWeek
        ? currentWeekParity === WeekType.EVEN
            ? WeekType.ODD
            : WeekType.EVEN
        : currentWeekParity;

    const weekdays: string[] = [
        t("monday"),
        t("tuesday"),
        t("wednesday"),
        t("thursday"),
        t("friday"),
    ];

    return (
        <thead className="bg-background">
            <tr>
                <th
                    scope="col"
                    className="text-foreground w-32 py-2 text-xs font-medium tracking-wider uppercase"
                >
                    <Button
                        type="button"
                        onClick={toggleDisplayNextWeek}
                        className="mx-auto flex h-fit w-fit cursor-pointer flex-col items-center justify-center gap-0 py-1.5"
                        variant="outline"
                    >
                        <span className="text-xs">
                            {displayNextWeek ? t("next") : t("current")}
                        </span>
                        <span className="text-primary text-[10px] font-bold">
                            {displayedWeekParity === WeekType.EVEN
                                ? t("even")
                                : t("odd")}
                        </span>
                    </Button>
                </th>
                {weekdays.map((day, index) => (
                    <th
                        key={index}
                        scope="col"
                        className="text-foreground px-4 py-2 text-xs font-medium tracking-wider uppercase"
                    >
                        {day}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
