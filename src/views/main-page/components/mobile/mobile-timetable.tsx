"use client";

import type { TableRow } from "@/types/table-rows";
import MobileTableHead from "@/views/main-page/components/mobile/mobile-table-head";
import MobileTableBody from "@/views/main-page/components/mobile/mobile-table-body";
import DaySelector from "./day-selector";
import useMobileTimetable from "../../hooks/use-mobile-timetable";
import SwipeGestureTip from "./swipe-gesture-tip";

type Props = {
    rows: TableRow[];
};

export default function MobileTimetable({ rows }: Props) {
    const {
        weekdays,
        selectedDay,
        handlePreviousDay,
        handleNextDay,
        swipeHandlers,
    } = useMobileTimetable();

    return (
        <div className="flex h-full w-full flex-col min-[970px]:hidden">
            <SwipeGestureTip />

            <DaySelector
                selectedDay={selectedDay}
                handleNextDay={handleNextDay}
                handlePreviousDay={handlePreviousDay}
                weekdays={weekdays}
            />

            <div
                className="flex-1 overflow-y-auto rounded-lg shadow-sm"
                {...swipeHandlers}
            >
                <table className="mt-2 w-full table-fixed border-collapse">
                    <MobileTableHead day={weekdays[selectedDay]} />
                    <MobileTableBody rows={rows} selectedDay={selectedDay} />
                </table>
            </div>
        </div>
    );
}
