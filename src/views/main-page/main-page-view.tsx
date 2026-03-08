import { getUserPreferences } from "@/lib/data/cookies";
import MainPageHeader from "./components/header/main-page-header";
import MainPageProvider from "./context/main-page-provider";
import TimetableContainer from "@/views/main-page/components/timetable-container";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export default async function MainPageView() {
    const preferences = await getUserPreferences();

    if (!preferences) {
        return redirect({
            href: "/welcome",
            locale: await getLocale(),
        });
    }

    return (
        <MainPageProvider>
            <div className="flex h-full w-full flex-col">
                <MainPageHeader />
                <TimetableContainer preferences={preferences} />
            </div>
        </MainPageProvider>
    );
}
