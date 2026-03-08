"use client";

import type { PreferencesSchema } from "@/schema/preferences-schema";
import MobileTimetable from "@/views/main-page/components/mobile/mobile-timetable";
import Timetable from "@/views/main-page/components/timetable";
import TimetableLoadingSkeleton from "@/views/main-page/components/timetable-loading-skeleton";
import useFetchTimetable from "@/views/main-page/hooks/use-fetch-timetable";
import ActionsMenu from "@/views/main-page/components/action-menu/actions-menu";

type Props = {
    preferences: PreferencesSchema;
};

export default function TimetableContainer({ preferences }: Props) {
    const { rows, isLoading } = useFetchTimetable();

    // if (isLoading || !rows) {
    //     return (
    //         <main className="h-full overflow-hidden">
    //             <TimetableLoadingSkeleton />
    //         </main>
    //     );
    // }

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

            <ActionsMenu
                rows={rows}
                isLoading={isLoading}
                preferences={preferences}
            />
        </>
    );
}
