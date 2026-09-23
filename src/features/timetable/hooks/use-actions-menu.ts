import type { PreferencesSchema } from "@/features/user/user-schema";
import { useMainPageStore } from "@/features/timetable/providers/timetable-provider";

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
