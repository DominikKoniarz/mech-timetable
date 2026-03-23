import type { ProfilePreferencesSchema } from "@/schema/preferences-schema";
import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import ProfileButton from "@/views/main-page/components/action-menu/profiles/profile-button";
import ProfileOptionsMenu from "@/views/main-page/components/action-menu/profiles/profile-options-menu";
import useProfileListItem from "@/views/main-page/hooks/use-profile-list-item";
import { EllipsisVertical, X } from "lucide-react";
import { ViewTransition } from "react";

export default function ProfilesListItem({
    profile,
    index,
    selected,
    profilesCount,
}: {
    profile: ProfilePreferencesSchema;
    index: number;
    selected: boolean;
    profilesCount: number;
}) {
    const {
        selectedView,
        handleProfileButtonClick,
        handleOptionsMenuClick,
        handleEditButtonClick,
    } = useProfileListItem(index);

    return (
        <div className="flex w-full items-center overflow-hidden rounded-sm bg-white">
            {selectedView === "profile-button" ? (
                <ProfileButton
                    profileName={profile.name}
                    selected={selected}
                    handleClick={handleProfileButtonClick}
                />
            ) : (
                <ProfileOptionsMenu
                    profileIndex={index}
                    profileName={profile.name}
                    profilesCount={profilesCount}
                    onEditClick={handleEditButtonClick}
                />
            )}
            <ActionMenuButton
                className="h-8 w-fit shrink-1 self-stretch rounded-l-none border-l border-l-black has-[>svg]:pl-1.5"
                onClick={handleOptionsMenuClick}
            >
                {selectedView === "profile-button" ? (
                    <ViewTransition default="open-options-menu">
                        <EllipsisVertical className="size-4.5 text-black" />
                    </ViewTransition>
                ) : (
                    <ViewTransition default="close-options-menu">
                        <X className="size-4.5 text-black" />
                    </ViewTransition>
                )}
            </ActionMenuButton>
        </div>
    );
}
