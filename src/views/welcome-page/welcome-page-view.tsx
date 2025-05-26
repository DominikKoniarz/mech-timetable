import type { Department } from "@/types/departments";
import type { GroupsByFirstLetter } from "@/types/groups";
import type { PreferencesSchema } from "@/schema/preferences-schema";
// import WelcomeFormSkeleton from "./components/welcome-form-skeleton";
import WelcomeForm from "./components/welcome-form";
import WelcomeCTA from "./components/welcome-cta";
// import { Suspense } from "react";

type Props = {
    departments: Department[];
    userPreferences: PreferencesSchema | null;
    groupsByFirstLetter: GroupsByFirstLetter | null;
    departmentName: string | undefined;
};

export default function WelcomePageView({
    departments,
    userPreferences,
    groupsByFirstLetter,
    departmentName,
}: Props) {
    return (
        <main className="relative flex h-full w-full flex-col items-center justify-center">
            {/* <SettingsDialog className="absolute top-[12px] right-3" /> */}
            <WelcomeCTA />
            {/* <Suspense fallback={<WelcomeFormSkeleton />}> */}
            <WelcomeForm
                departments={departments}
                userPreferences={userPreferences}
                groupsByFirstLetter={groupsByFirstLetter}
                departmentName={departmentName}
            />
            {/* </Suspense> */}
        </main>
    );
}
