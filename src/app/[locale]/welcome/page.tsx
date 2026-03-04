import WelcomePageView from "@/views/welcome-page/welcome-page-view";
import { getUserPreferences } from "@/lib/data/cookies";

export default async function Welcome() {
    const preferences = await getUserPreferences();

    return <WelcomePageView userPreferences={preferences} />;
}
