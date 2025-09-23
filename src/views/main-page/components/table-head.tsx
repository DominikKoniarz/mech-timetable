"use client";

import { useTranslations } from "next-intl";
import { useMainPageStore } from "../context/main-page-provider";
import { Button } from "@/components/ui/button";

export default function TableHead() {
    const t = useTranslations("mainPage.table.tableHead");

    const { displayNextWeek, toggleDisplayNextWeek } = useMainPageStore(
        (state) => state,
    );

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
                    className="text-foreground w-32 px-4 py-2 text-xs font-medium tracking-wider uppercase"
                >
                    <Button
                        type="button"
                        onClick={toggleDisplayNextWeek}
                        className="w-full cursor-pointer"
                        variant="outline"
                    >
                        {displayNextWeek ? t("next") : t("current")}
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
