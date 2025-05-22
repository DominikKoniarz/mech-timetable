import type { TableRow } from "@/types/table-rows";
import Timetable from "./components/timetable";
import MobileTimetable from "./components/mobile/mobile-timetable";
import MainPageHeader from "./components/header/main-page-header";
import MainPageProvider from "./context/main-page-provider";

type Props = {
    rows: TableRow[];
};

export default function MainPageView({ rows }: Props) {
    return (
        <MainPageProvider>
            <div className="flex h-full w-full flex-col">
                <MainPageHeader />
                <main className="h-full overflow-auto">
                    {/* Desktop timetable */}
                    <Timetable rows={rows} />

                    {/* Mobile timetable */}
                    <MobileTimetable rows={rows} />
                </main>
            </div>
        </MainPageProvider>
    );
}
