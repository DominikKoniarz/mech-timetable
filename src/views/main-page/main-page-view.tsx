import MainPageHeader from "./components/header/main-page-header";
import MainPageProvider from "./context/main-page-provider";
import TimetableContainer from "@/views/main-page/components/timetable-container";

export default function MainPageView() {
    return (
        <MainPageProvider>
            <div className="flex h-full w-full flex-col">
                <MainPageHeader />
                <TimetableContainer />
            </div>
        </MainPageProvider>
    );
}
