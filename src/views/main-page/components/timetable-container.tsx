"use client";

import ExportIcsDialog from "@/views/main-page/components/export-ics-dialog";
import MobileTimetable from "@/views/main-page/components/mobile/mobile-timetable";
import Timetable from "@/views/main-page/components/timetable";
import TimetableLoadingSkeleton from "@/views/main-page/components/timetable-loading-skeleton";
import useFetchTimetable from "@/views/main-page/hooks/use-fetch-timetable";

export default function TimetableContainer() {
    const { rows, isLoading } = useFetchTimetable();

    if (isLoading || !rows) {
        return (
            <main className="h-full overflow-hidden">
                <TimetableLoadingSkeleton />
            </main>
        );
    }

    return (
        <>
            <main className="h-full overflow-auto">
                {/* Desktop timetable */}
                <Timetable rows={rows} />

                {/* Mobile timetable */}
                <MobileTimetable rows={rows} />
            </main>
            <ExportIcsDialog rows={rows} />
        </>
    );
}
