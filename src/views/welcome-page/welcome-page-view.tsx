import type { PreferencesSchema } from "@/schema/preferences-schema";
import WelcomeForm from "./components/welcome-form";
import WelcomeCTA from "./components/welcome-cta";
import SettingsDialog from "@/components/settings-dialog/settings-dialog";
import { Suspense } from "react";
import WelcomeFormSkeleton from "@/views/welcome-page/components/welcome-form-skeleton";

type Props = {
    userPreferences: PreferencesSchema | null;
};

export default function WelcomePageView({ userPreferences }: Props) {
    return (
        <main className="relative flex h-full w-full flex-col items-center justify-center">
            <SettingsDialog className="absolute top-[12px] right-3" />
            <WelcomeCTA />
            <Suspense fallback={<WelcomeFormSkeleton />}>
                <WelcomeForm userPreferences={userPreferences} />
            </Suspense>
        </main>
    );
}
