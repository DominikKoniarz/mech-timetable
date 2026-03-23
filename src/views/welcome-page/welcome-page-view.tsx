import type { Department } from "@/types/departments";
import type { PreferencesSchema } from "@/schema/preferences-schema";
import WelcomeForm from "./components/welcome-form";
import WelcomeCTA from "./components/welcome-cta";
import SettingsDialog from "@/components/settings-dialog/settings-dialog";
import NoDataSection from "@/views/welcome-page/components/no-data-section";

type Props = {
    userPreferences: PreferencesSchema | null;
    departments: Department[];
};

export default function WelcomePageView({
    userPreferences,
    departments,
}: Props) {
    return (
        <main className="relative flex h-full w-full flex-col items-center justify-center">
            <SettingsDialog className="absolute top-[12px] right-3" />
            <WelcomeCTA departmentsAvailable={departments.length > 0} />
            {departments.length > 0 ? (
                <WelcomeForm
                    userPreferences={userPreferences}
                    departments={departments}
                />
            ) : (
                <NoDataSection />
            )}
        </main>
    );
}
