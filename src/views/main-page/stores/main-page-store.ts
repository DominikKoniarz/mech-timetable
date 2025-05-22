import { createStore } from "zustand/vanilla";

export type MainPageStoreState = {
    displayNextWeek: boolean;
};

export type MainPageStoreActions = {
    toggleDisplayNextWeek: () => void;
};

export type MainPageStore = MainPageStoreState & MainPageStoreActions;

const mainPageStoreInitState: MainPageStoreState = {
    displayNextWeek: false,
};

export const createMainPageStore = (
    initState: MainPageStoreState = mainPageStoreInitState,
) => {
    return createStore<MainPageStore>()((set) => ({
        ...initState,
        toggleDisplayNextWeek: () =>
            set((state) => ({ displayNextWeek: !state.displayNextWeek })),
    }));
};
