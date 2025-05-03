import type { TableRow } from "@/types/table-rows";
import Timetable from "./components/timetable";
import MainPageHeader from "./components/header/main-page-header";

type Props = {
    rows: TableRow[];
};

export default function MainPageView({ rows }: Props) {
    return (
        <div className="h-full w-full">
            <MainPageHeader />
            <main className="overflow-x-auto">
                <Timetable rows={rows} />
            </main>
        </div>
    );
}
