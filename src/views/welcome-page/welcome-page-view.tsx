import type { Department } from "@/types/departments";
import type { PreferencesSchema } from "@/schema/preferences-schema";
import WelcomeCTA from "./components/welcome-cta";
import WelcomeForm from "./components/welcome-form";

type Props = {
    departments: Department[];
    userPreferences: PreferencesSchema | null;
};

export default function WelcomePageView({
    departments,
    userPreferences,
}: Props) {
    return (
        <main className="flex h-full w-full flex-col items-center justify-center">
            <WelcomeCTA />
            <WelcomeForm
                departments={departments}
                userPreferences={userPreferences}
            />
        </main>
    );
}
