import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type ActionsMenuStoreState = {
    menuCloseTimer: ReturnType<typeof setTimeout> | null;
    actionsMenuOpen: boolean;
    exportIcsDialogOpen: boolean;
    addProfileDialogOpen: boolean;
    deleteProfileDialogOpen: boolean;
    profilePendingDeletionIndex: number | null;
    openedProfileOptionsIndex: number | null;
    profilePendingEditIndex: number | null;
};

export type ActionsMenuStoreActions = {
    updateActionsMenuOpen: (open: boolean) => void;
    updateExportIcsDialogOpen: (open: boolean) => void;
    updateAddProfileDialogOpen: (open: boolean) => void;
    updateDeleteProfileDialogOpen: (open: boolean) => void;
    openExportIcsDialog: () => void;
    openAddProfileDialog: () => void;
    openDeleteProfileDialog: (index: number) => void;
    clearDeleteProfileDialog: () => void;
    handleOpenProfileOptionsMenu: (index: number | null) => { opened: boolean };
    updateProfilePendingEditIndex: (index: number | null) => void;
};

export type ActionsMenuStore = ActionsMenuStoreState & ActionsMenuStoreActions;

const createActionsMenuStore = createStore<ActionsMenuStore>()((set, get) => ({
    menuCloseTimer: null,
    actionsMenuOpen: false,
    exportIcsDialogOpen: false,
    addProfileDialogOpen: false,
    deleteProfileDialogOpen: false,
    profilePendingDeletionIndex: null,
    openedProfileOptionsIndex: null,
    profilePendingEditIndex: null,
    updateActionsMenuOpen: (open: boolean) => {
        set({ actionsMenuOpen: open });

        if (open === false && get().openedProfileOptionsIndex !== null) {
            const timer = setTimeout(() => {
                set({ openedProfileOptionsIndex: null });
            }, 300);

            set({ menuCloseTimer: timer });
        } else {
            const timer = get().menuCloseTimer;

            if (timer) {
                clearTimeout(timer);
                set({ menuCloseTimer: null });
            }
        }
    },
    updateExportIcsDialogOpen: (open: boolean) =>
        set({ exportIcsDialogOpen: open }),
    updateAddProfileDialogOpen: (open: boolean) =>
        set({ addProfileDialogOpen: open }),
    updateDeleteProfileDialogOpen: (open: boolean) =>
        set({ deleteProfileDialogOpen: open }),
    openExportIcsDialog: () => {
        {
            set({ exportIcsDialogOpen: true });

            // will trigger menu close timer
            get().updateActionsMenuOpen(false);
        }
    },
    openAddProfileDialog: () => {
        {
            set({ addProfileDialogOpen: true });

            // will trigger menu close timer
            get().updateActionsMenuOpen(false);
        }
    },
    openDeleteProfileDialog: (index: number) => {
        {
            set({
                deleteProfileDialogOpen: true,
                profilePendingDeletionIndex: index,
            });

            // will trigger menu close timer
            get().updateActionsMenuOpen(false);
        }
    },
    clearDeleteProfileDialog: () => {
        set({
            deleteProfileDialogOpen: false,
            profilePendingDeletionIndex: null,
        });
    },
    handleOpenProfileOptionsMenu: (index: number | null) => {
        if (index === null) {
            set({ openedProfileOptionsIndex: null });
            return { opened: false };
        } else if (get().openedProfileOptionsIndex === index) {
            set({ openedProfileOptionsIndex: null });
            return { opened: false };
        } else {
            set({ openedProfileOptionsIndex: index });
            return { opened: true };
        }
    },
    updateProfilePendingEditIndex: (index: number | null) => {
        set({ profilePendingEditIndex: index });
    },
}));

export const useActionsMenuStore = <T>(
    selector: (store: ActionsMenuStore) => T,
): T => {
    return useStore(createActionsMenuStore, selector);
};
