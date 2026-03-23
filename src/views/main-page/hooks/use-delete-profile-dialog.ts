import useUserPreferences from "@/hooks/use-user-preferences";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";

const useDeleteProfileDialog = () => {
    const { preferences, removeProfile } = useUserPreferences();

    const deleteProfileDialogOpen = useActionsMenuStore(
        (state) => state.deleteProfileDialogOpen,
    );
    const profilePendingDeletionIndex = useActionsMenuStore(
        (state) => state.profilePendingDeletionIndex,
    );
    const clearDeleteProfileDialog = useActionsMenuStore(
        (state) => state.clearDeleteProfileDialog,
    );

    const profileIndex = useMainPageStore((state) => state.profileIndex);
    const setProfileIndex = useMainPageStore((state) => state.setProfileIndex);

    const profiles = preferences?.profiles ?? [];
    const pendingProfile =
        profilePendingDeletionIndex === null
            ? null
            : (profiles.at(profilePendingDeletionIndex) ?? null);

    const isLastProfile = profiles.length <= 1;

    const cancelDelete = () => {
        clearDeleteProfileDialog();
    };

    const confirmDelete = () => {
        if (profilePendingDeletionIndex === null || isLastProfile) {
            return;
        }

        const result = removeProfile(profilePendingDeletionIndex);

        if (!result) {
            return;
        }

        const maxIndexAfterDelete = Math.max(
            0,
            result.updatedProfilesCount - 1,
        );

        let nextProfileIndex = profileIndex;

        if (profileIndex === profilePendingDeletionIndex) {
            nextProfileIndex = Math.min(
                profilePendingDeletionIndex,
                maxIndexAfterDelete,
            );
        } else if (profileIndex > profilePendingDeletionIndex) {
            nextProfileIndex = profileIndex - 1;
        }

        nextProfileIndex = Math.max(
            0,
            Math.min(nextProfileIndex, maxIndexAfterDelete),
        );

        clearDeleteProfileDialog();

        setProfileIndex(nextProfileIndex);
    };

    return {
        deleteProfileDialogOpen,
        pendingProfile,
        isLastProfile,
        confirmDelete,
        cancelDelete,
    };
};

export default useDeleteProfileDialog;
