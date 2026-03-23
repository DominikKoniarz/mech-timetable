import type { PreferencesSchema } from "@/schema/preferences-schema";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";

type Props = {
    preferences: PreferencesSchema;
};

const useActionsMenu = ({ preferences }: Props) => {
    const profileIndex = useMainPageStore((state) => state.profileIndex);
    const selectedProfile = preferences.profiles.at(profileIndex);

    return {
        profileIndex,
        selectedProfile,
    };
};

export default useActionsMenu;
