import { create } from 'zustand'
import { userInitialState } from './slices/users'
import type { RootState } from '@/interfaces/globalState'
import { entityInitialState } from './slices/entity'

const baseState = {
    user: userInitialState,
    entity: entityInitialState
}

/**
 * @deprecated Use the StateProvider from '@/app/providers/StateProvider' + useAppState hook
 * for SSR-safe store access. Kept only for legacy client-only usage.
 */
export const useAppStore = create<RootState>()((set) => ({
    user: userInitialState,
    entity: entityInitialState,
    setUser: (user) => set({ user }),
    setEntity: (entity) => set({ entity }),
    logout: () => set((state) => ({ ...state, ...baseState })),
    // Legacy fields kept for backwards compatibility (not in RootState)
    ...({
        login: (user: RootState['user']) => set((state) => ({ ...state, user })),
        setentity: (entity: RootState['entity']) => set((state) => ({ ...state, entity })),
    } as Record<string, unknown>),
}))
