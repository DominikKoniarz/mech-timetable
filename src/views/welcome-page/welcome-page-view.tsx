import WelcomeFormSkeleton from "./components/welcome-form-skeleton";
import WelcomeForm from "./components/welcome-form";
import WelcomeCTA from "./components/welcome-cta";
import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { getUserPreferences } from "@/lib/data/cookies";
import { Suspense } from "react";

export default function WelcomePageView() {
    const [departmentsHtmlPromise, userPreferencesPromise] = [
        fetchDepartmentsList(),
        getUserPreferences(),
    ];

    return (
        <main className="relative flex h-full w-full flex-col items-center justify-center">
            {/* <SettingsDialog className="absolute top-[12px] right-3" /> */}
            <WelcomeCTA />
            <Suspense fallback={<WelcomeFormSkeleton />}>
                <WelcomeForm
                    departmentsHtmlPromise={departmentsHtmlPromise}
                    userPreferencesPromise={userPreferencesPromise}
                />
            </Suspense>
        </main>
    );
}
