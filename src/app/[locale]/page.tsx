import MainPageProvider from "@/features/timetable/providers/timetable-provider";
import TimetableHeader from "@/features/timetable/components/header/timetable-header";
import TimetableContainer from "@/features/timetable/components/timetable-container";
import { buildHomeMetadata } from "@/lib/seo/page-metadata";

export function generateMetadata() {
    return buildHomeMetadata();
}

export default function Home() {
    return (
        <MainPageProvider>
            <div className="flex h-full w-full flex-col">
                <TimetableHeader />
                <TimetableContainer />
            </div>
        </MainPageProvider>
    );
}
