import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type MainPageStoreState = {
    displayNextWeek: boolean;
    profileIndex: number;
};

export type MainPageStoreActions = {
    toggleDisplayNextWeek: () => void;
    setProfileIndex: (index: number) => void;
};

export type MainPageStore = MainPageStoreState & MainPageStoreActions;

const mainPageStoreInitState: MainPageStoreState = {
    displayNextWeek: false,
    profileIndex: 0,
};

const MAIN_PAGE_STORE_PERSIST_KEY = "main-page-store";

export const createMainPageStore = (
    initState: MainPageStoreState = mainPageStoreInitState,
) => {
    return createStore<MainPageStore>()(
        persist(
            (set) => ({
                ...initState,
                toggleDisplayNextWeek: () =>
                    set((state) => ({
                        displayNextWeek: !state.displayNextWeek,
                    })),
                setProfileIndex: (index: number) =>
                    set({ profileIndex: index }),
            }),
            {
                name: MAIN_PAGE_STORE_PERSIST_KEY,
                partialize: (state) => ({ profileIndex: state.profileIndex }),
            },
        ),
    );
};
