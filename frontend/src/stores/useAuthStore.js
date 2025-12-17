// useAuthStore.js
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            // token: null, // 쿠키로 관리되므로 제거
            setAuth: (user) => set({ user }),
            logout: () => set({ user: null }),
            getUserId: () => get().user?.id ?? null,
            isAuthenticated: () => !!get().user, // 유저 정보가 있으면 로그인 된 것으로 간주
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => window.localStorage),
            partialize: (state) => ({ user: state.user }), // token 제외
        }
    )
);

export default useAuthStore;