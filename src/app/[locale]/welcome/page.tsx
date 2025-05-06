import { getUserPreferences } from "@/lib/data/cookies";
import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";
import WelcomePageView from "@/views/welcome-page/welcome-page-view";

export default async function Welcome() {
    const [departmentsHtml, preferences] = await Promise.all([
        fetchDepartmentsList(),
        getUserPreferences(),
    ]);
    const departments = parseDepartmentsList(departmentsHtml);

    // TODO: add loading skeleton
    return (
        <WelcomePageView
            departments={departments}
            userPreferences={preferences}
        />
    );
}
