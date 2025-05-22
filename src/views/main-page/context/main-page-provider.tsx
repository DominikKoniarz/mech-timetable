"use client";

import { createContext, use, useRef } from "react";
import { createMainPageStore, MainPageStore } from "../stores/main-page-store";
import { useStore } from "zustand";

type MainPageStoreApi = ReturnType<typeof createMainPageStore>;

type MainPageProviderProps = {
    children: React.ReactNode;
    // initState: MainPageStoreState;
};

const MainPageContext = createContext<MainPageStoreApi | null>(null);

export default function MainPageProvider({
    children,
    // initState,
}: MainPageProviderProps) {
    const storeRef = useRef<MainPageStoreApi | null>(null);
    if (!storeRef.current) {
        storeRef.current = createMainPageStore();
    }

    return (
        <MainPageContext.Provider value={storeRef.current}>
            {children}
        </MainPageContext.Provider>
    );
}

export const useMainPageStore = <T,>(
    selector: (store: MainPageStore) => T,
): T => {
    const mainPageContext = use(MainPageContext);

    if (!mainPageContext) {
        throw new Error(
            `useMainPageStore must be used within MainPageProvider`,
        );
    }

    return useStore(mainPageContext, selector);
};
