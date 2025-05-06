import type { TableRow } from "@/types/table-rows";
import Timetable from "./components/timetable";
import MainPageHeader from "./components/header/main-page-header";

type Props = {
    rows: TableRow[];
};

export default function MainPageView({ rows }: Props) {
    return (
        <div className="flex h-full w-full flex-col">
            <MainPageHeader />
            <main className="mt-2 h-full overflow-x-auto">
                {/* <div className="flex h-full w-full items-center justify-center lg:hidden">
                    Mobile devices are not supported yet. Comming soon!
                </div> */}
                <Timetable rows={rows} />
            </main>
        </div>
    );
}
