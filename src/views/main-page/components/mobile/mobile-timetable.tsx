"use client";

import { useState } from "react";
import type { TableRow } from "@/types/table-rows";
import MobileTableHead from "@/views/main-page/components/mobile/mobile-table-head";
import MobileTableBody from "@/views/main-page/components/mobile/mobile-table-body";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";

type Props = {
    rows: TableRow[];
};

// TODO: polish, add translations, add components
export default function MobileTimetable({ rows }: Props) {
    const t = useTranslations("mainPage.table.tableHead");
    const [selectedDay, setSelectedDay] = useState<number>(0);

    const weekdays = [
        t("monday"),
        t("tuesday"),
        t("wednesday"),
        t("thursday"),
        t("friday"),
    ];

    const handlePreviousDay = () => {
        const newIndex =
            selectedDay > 0 ? selectedDay - 1 : weekdays.length - 1;
        setSelectedDay(newIndex);
    };

    const handleNextDay = () => {
        const newIndex =
            selectedDay < weekdays.length - 1 ? selectedDay + 1 : 0;
        setSelectedDay(newIndex);
    };

    // Setup swipe handlers for mobile navigation
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            handleNextDay();
        },
        onSwipedRight: () => {
            handlePreviousDay();
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
    });

    return (
        <div
            className={cn(
                "relative flex w-full flex-col",
                "min-[970px]:hidden",
            )}
            {...swipeHandlers}
        >
            {/* Day selector */}
            <div className="bg-card sticky top-0 z-20 mb-3 flex h-14 w-full items-center justify-between overflow-hidden shadow-sm">
                <button
                    onClick={handlePreviousDay}
                    className="hover:bg-muted flex items-center justify-center p-3 transition-colors"
                    aria-label="Previous day"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="relative flex flex-1 flex-col items-center justify-center py-3">
                    <span className="text-sm font-medium">
                        {weekdays[selectedDay]}
                    </span>
                    <div className="mt-1 flex gap-1">
                        {weekdays.map((_, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "h-1 w-1 rounded-full",
                                    selectedDay === index
                                        ? "bg-primary"
                                        : "bg-muted",
                                )}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNextDay}
                    className="hover:bg-muted flex items-center justify-center p-3 transition-colors"
                    aria-label="Next day"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Timetable */}
            <div className="relative mt-3 overflow-hidden rounded-lg shadow-sm">
                <table className="w-full table-fixed border-collapse">
                    <MobileTableHead day={weekdays[selectedDay]} />
                    <MobileTableBody rows={rows} selectedDay={selectedDay} />
                </table>
            </div>
        </div>
    );
}
