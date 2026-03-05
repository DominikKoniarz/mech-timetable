import WelcomePageView from "@/views/welcome-page/welcome-page-view";
import { getUserPreferences } from "@/lib/data/cookies";
import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";

export default async function Welcome() {
    const [preferences, departmentsHtml] = await Promise.all([
        getUserPreferences(),
        fetchDepartmentsList(),
    ]);

    const departments = parseDepartmentsList(departmentsHtml);

    return (
        <WelcomePageView
            userPreferences={preferences}
            departments={departments}
        />
    );
}
