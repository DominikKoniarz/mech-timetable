"use client";

import MobileTimetable from "@/views/main-page/components/mobile/mobile-timetable";
import Timetable from "@/views/main-page/components/timetable";
import TimetableLoadingSkeleton from "@/views/main-page/components/timetable-loading-skeleton";
import useFetchTimetable from "@/views/main-page/hooks/use-fetch-timetable";
import ActionsMenu from "@/views/main-page/components/action-menu/actions-menu";
import useUserPreferences from "@/hooks/use-user-preferences";

export default function TimetableContainer() {
    const { rows, isLoading } = useFetchTimetable();

    const { preferences } = useUserPreferences();

    return (
        <>
            {isLoading || !rows ? (
                <main className="h-full overflow-hidden">
                    <TimetableLoadingSkeleton />
                </main>
            ) : (
                <main className="h-full overflow-auto">
                    {/* Desktop timetable */}
                    <Timetable rows={rows} />

                    {/* Mobile timetable */}
                    <MobileTimetable rows={rows} />
                </main>
            )}

            {preferences && (
                <ActionsMenu
                    rows={rows}
                    isLoading={isLoading}
                    preferences={preferences}
                />
            )}
        </>
    );
}
