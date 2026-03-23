import { useMainPageStore } from "@/views/main-page/context/main-page-provider";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";
import { startTransition, useEffect, useEffectEvent, useState } from "react";

const useProfileListItem = (index: number) => {
    // keep local state bc zustand does not work with view transitions
    // there is a fix for that case https://github.com/pmndrs/zustand/discussions/3125
    // but i don't want to install new dependency for this
    const [selectedView, setSelectedView] = useState<
        "profile-button" | "options-menu"
    >("profile-button");

    const handleOpenProfileOptionsMenu = useActionsMenuStore(
        (state) => state.handleOpenProfileOptionsMenu,
    );
    const openedProfileOptionsIndex = useActionsMenuStore(
        (state) => state.openedProfileOptionsIndex,
    );
    const actionsMenuOpen = useActionsMenuStore(
        (state) => state.actionsMenuOpen,
    );
    const updateProfilePendingEditIndex = useActionsMenuStore(
        (state) => state.updateProfilePendingEditIndex,
    );

    const setProfileIndex = useMainPageStore((state) => state.setProfileIndex);

    const handleProfileButtonClick = () => {
        setProfileIndex(index);
    };

    const handleOptionsMenuClick = () => {
        startTransition(() => {
            const { opened } = handleOpenProfileOptionsMenu(index);

            if (opened) {
                setSelectedView("options-menu");
            } else {
                setSelectedView("profile-button");
            }
        });
    };

    const handleEditButtonClick = () => {
        updateProfilePendingEditIndex(index);
    };

    const effect = useEffectEvent((openedIndex: number | null) => {
        if (openedIndex === null) {
            // do not start transition if actions menu is being closed
            // this avoid animation flickering
            if (!actionsMenuOpen) {
                setSelectedView("profile-button");
                return;
            }

            startTransition(() => {
                setSelectedView("profile-button");
            });
            return;
        }

        startTransition(() => {
            setSelectedView(
                openedIndex === index ? "options-menu" : "profile-button",
            );
        });
    });

    useEffect(() => {
        effect(openedProfileOptionsIndex);
    }, [openedProfileOptionsIndex]);

    return {
        selectedView,
        handleProfileButtonClick,
        handleOptionsMenuClick,
        handleEditButtonClick,
    };
};

export default useProfileListItem;
