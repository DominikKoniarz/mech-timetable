import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type ActionsMenuStoreState = {
    menuCloseTimer: ReturnType<typeof setTimeout> | null;
    actionsMenuOpen: boolean;
    exportIcsDialogOpen: boolean;
    addProfileDialogOpen: boolean;
    openedProfileOptionsIndex: number | null;
};

export type ActionsMenuStoreActions = {
    updateActionsMenuOpen: (open: boolean) => void;
    updateExportIcsDialogOpen: (open: boolean) => void;
    updateAddProfileDialogOpen: (open: boolean) => void;
    openExportIcsDialog: () => void;
    openAddProfileDialog: () => void;
    handleOpenProfileOptionsMenu: (index: number | null) => { opened: boolean };
};

export type ActionsMenuStore = ActionsMenuStoreState & ActionsMenuStoreActions;

const createActionsMenuStore = createStore<ActionsMenuStore>()((set, get) => ({
    menuCloseTimer: null,
    actionsMenuOpen: false,
    exportIcsDialogOpen: false,
    addProfileDialogOpen: false,
    openedProfileOptionsIndex: null,
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
    openExportIcsDialog: () => {
        set({ exportIcsDialogOpen: true, actionsMenuOpen: false });
    },
    openAddProfileDialog: () => {
        set({ addProfileDialogOpen: true, actionsMenuOpen: false });
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
}));

export const useActionsMenuStore = <T>(
    selector: (store: ActionsMenuStore) => T,
): T => {
    return useStore(createActionsMenuStore, selector);
};
