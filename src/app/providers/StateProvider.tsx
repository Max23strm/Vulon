"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { create, useStore, type StoreApi } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { userInitialState } from "@/app/store/slices/users";
import { entityInitialState } from "@/app/store/slices/entity";
import type { RootState, UserSlice, EntitySlice } from "@/interfaces/globalState";
import type { InitialSessionState } from "./serverSession";
import { logoutSession, saveSession } from "../services/cookies/session";

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

        storeRef.current = create<RootState>()(
            persist(
                (set) => ({
                    user: baseUser,
                    entity: baseEntity,
                    setUser: (user: UserSlice) => {
                        saveSession({user_id: user.user_uid})
                        set({ user })
                    },
                    setEntity: (entity: EntitySlice) => {
                        saveSession({entity_uid: entity.entity_uid, colors: entity.colors})
                        set({ entity })
                    },
                    logout: () =>{
                        set((state) => ({
                            ...state,
                            user: userInitialState,
                            entity: entityInitialState,
                        }))
                        logoutSession()
                    }
                }),
                {
                    name: "vulon-app-state",
                    storage: createJSONStorage(() => localStorage),
                    partialize: (state) => ({
                        user: state.user,
                        entity: state.entity,
                    }),
                },
            ),
        );
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
