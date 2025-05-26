import type { GroupsByFirstLetter } from "@/types/groups";
import WelcomePageView from "@/views/welcome-page/welcome-page-view";
import { getUserPreferences } from "@/lib/data/cookies";
import { getDepartmentGroups, getDepartments } from "@/lib/data/department";

type Props = {
    searchParams: Promise<{
        departmentName: string | undefined;
    }>;
};

// TODO: FOR WHOLE PAGE - clean up the code
export default async function Welcome({ searchParams }: Props) {
    const { departmentName } = await searchParams;

    const [preferences, departments] = await Promise.all([
        getUserPreferences(),
        getDepartments(),
    ]);

    const foundDepartment = departments.find(
        (department) =>
            department.name === (departmentName || preferences?.departmentName),
    );

    let groupsByFirstLetter: GroupsByFirstLetter | null = null;

    if (foundDepartment) {
        groupsByFirstLetter = await getDepartmentGroups(foundDepartment);
    }

    return (
        <WelcomePageView
            departments={departments}
            userPreferences={preferences}
            groupsByFirstLetter={groupsByFirstLetter}
            departmentName={departmentName}
        />
    );
}
