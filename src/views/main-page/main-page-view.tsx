import type { TableRow } from "@/types/table-rows";
import Timetable from "./components/timetable";
import MobileTimetable from "./components/mobile/mobile-timetable";
import MainPageHeader from "./components/header/main-page-header";

type Props = {
    rows: TableRow[];
};

export default function MainPageView({ rows }: Props) {
    return (
        <div className="flex h-full w-full flex-col">
            <MainPageHeader />
            <main className="mt-2 h-full overflow-x-auto">
                {/* Desktop timetable */}
                <Timetable rows={rows} />

                {/* Mobile timetable */}
                <MobileTimetable rows={rows} />
            </main>
        </div>
    );
}
