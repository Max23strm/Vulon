"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { create, useStore, type StoreApi } from "zustand";
import { userInitialState } from "@/app/store/slices/users";
import { entityInitialState } from "@/app/store/slices/entity";
import type { RootState, UserSlice, EntitySlice } from "@/interfaces/globalState";
import type { InitialSessionState } from "./serverSession";

export type AppStoreApi = StoreApi<RootState>;

const StateContext = createContext<AppStoreApi | null>(null);

interface StateProviderProps {
    children: ReactNode;
    initialState?: InitialSessionState;
}

const StateProvider = ({ children, initialState }: StateProviderProps) => {
    const storeRef = useRef<AppStoreApi | null>(null);

    if (!storeRef.current) {
        const baseUser: UserSlice = { ...userInitialState, ...initialState?.user };
        const baseEntity: EntitySlice = { ...entityInitialState, ...initialState?.entity };

        storeRef.current = create<RootState>()((set) => ({
            user: baseUser,
            entity: baseEntity,
            setUser: (user: UserSlice) => set({ user }),
            setEntity: (entity: EntitySlice) => set({ entity }),
            logout: () =>
                set((state) => ({
                    ...state,
                    user: userInitialState,
                    entity: entityInitialState,
                })),
        }));
    }

    return (
        <StateContext.Provider value={storeRef.current}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;

export const useAppState = <T,>(selector: (state: RootState) => T): T => {
    const store = useContext(StateContext);
    if (!store) {
        throw new Error("useAppState must be used within a StateProvider");
    }
    return useStore(store, selector);
};
