import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import ProfileButton from "@/views/main-page/components/action-menu/profiles/profile-button";
import ProfileOptionsMenu from "@/views/main-page/components/action-menu/profiles/profile-options-menu";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";
import { EllipsisVertical } from "lucide-react";
import { startTransition, useEffect, useEffectEvent, useState } from "react";

export default function ProfilesListItem({
    profileName,
    index,
    selected,
}: {
    profileName: string;
    index: number;
    selected: boolean;
}) {
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

    const setProfileIndex = useMainPageStore((state) => state.setProfileIndex);

    const handleClick = () => {
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

    return (
        <div className="flex w-full items-center overflow-hidden rounded-sm bg-white">
            {selectedView === "profile-button" ? (
                <ProfileButton
                    profileName={profileName}
                    selected={selected}
                    handleClick={handleClick}
                />
            ) : (
                <ProfileOptionsMenu />
            )}
            <ActionMenuButton
                className="h-8 w-fit shrink-1 self-stretch rounded-l-none border-l border-l-black has-[>svg]:pl-1.5"
                onClick={handleOptionsMenuClick}
            >
                <EllipsisVertical className="size-4.5 text-black" />
            </ActionMenuButton>
        </div>
    );
}
