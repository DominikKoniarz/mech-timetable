import { Suspense } from "react";
import SettingsDialog from "@/components/settings-dialog/settings-dialog";
import {
    Welcome,
    WelcomeSkeleton,
} from "@/features/welcome/components/welcome";
import { buildWelcomeMetadata } from "@/lib/seo/page-metadata";

export function generateMetadata() {
    return buildWelcomeMetadata();
}

export default function WelcomePage() {
    return (
        <main className="relative flex h-full w-full flex-col items-center justify-center">
            <SettingsDialog className="absolute top-4 right-3" />
            <Suspense fallback={<WelcomeSkeleton />}>
                <Welcome />
            </Suspense>
        </main>
    );
}
