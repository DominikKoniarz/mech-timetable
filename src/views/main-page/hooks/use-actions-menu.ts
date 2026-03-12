import type { PreferencesSchema } from "@/schema/preferences-schema";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";
import { useState } from "react";

type Props = {
    preferences: PreferencesSchema;
};

const useActionsMenu = ({ preferences }: Props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [exportIcsDialogOpen, setExportIcsDialogOpen] = useState(false);
    const [addProfileDialogOpen, setAddProfileDialogOpen] = useState(false);

    const profileIndex = useMainPageStore((state) => state.profileIndex);
    const selectedProfile = preferences.profiles.at(profileIndex);

    const closeMenu = () => {
        setPopoverOpen(false);
    };

    const openExportIcsDialog = () => {
        closeMenu();
        setExportIcsDialogOpen(true);
    };

    const openAddProfileDialog = () => {
        closeMenu();
        setAddProfileDialogOpen(true);
    };

    return {
        popoverOpen,
        profileIndex,
        setPopoverOpen,
        exportIcsDialogOpen,
        setExportIcsDialogOpen,
        addProfileDialogOpen,
        setAddProfileDialogOpen,
        selectedProfile,
        openExportIcsDialog,
        openAddProfileDialog,
    };
};

export default useActionsMenu;
