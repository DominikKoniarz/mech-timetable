import { getDepartments } from "@/features/department/department-queries";
import { getUserPreferences } from "@/features/user/user-queries";
import WelcomeCTA from "./welcome-cta";
import WelcomeForm from "./welcome-form";
import NoDataSection from "./no-data-section";

export async function Welcome() {
    const [userPreferences, departments] = await Promise.all([
        getUserPreferences(),
        getDepartments(),
    ]);

    return (
        <>
            <WelcomeCTA departmentsAvailable={departments.length > 0} />
            {departments.length > 0 ? (
                <WelcomeForm
                    userPreferences={userPreferences}
                    departments={departments}
                />
            ) : (
                <NoDataSection />
            )}
        </>
    );
}

export function WelcomeSkeleton() {
    return (
        <>
            <div className="h-fit w-fit px-6 text-center">
                <div className="bg-foreground/75 xs:h-9 mx-auto h-8 w-64 rounded-sm md:h-10 md:w-80" />
                <div className="bg-foreground/75 mx-auto mt-4 h-4 w-72 rounded-sm md:h-5 md:w-96" />
            </div>
            <div className="mt-10 w-fit min-w-62 space-y-4 pb-4 sm:pb-6">
                <div className="flex flex-col gap-4">
                    <WelcomeFormFieldSkeleton />
                    <WelcomeFormFieldSkeleton />
                    <WelcomeFormFieldSkeleton />
                    <WelcomeFormFieldSkeleton />
                </div>
                <div className="mx-auto mt-6 h-9 w-[68.6px] rounded-sm bg-transparent" />
            </div>
        </>
    );
}

function WelcomeFormFieldSkeleton() {
    return (
        <div className="flex animate-pulse flex-col gap-2">
            <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
            <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
        </div>
    );
}
