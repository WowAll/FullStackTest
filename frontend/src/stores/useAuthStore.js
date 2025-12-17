import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,

            // 로그인 성공 시 호출
            setAuth: (user, token) => set({ user, token }),

            // 로그아웃
            logout: () => {
                set({ user: null, token: null });
                if (typeof window !== 'undefined') {
                    window.location.href = '/boards';
                }
            },

            // 현재 유저 ID
            getUserId: () => {
                const state = get();
                return state.user?.id ?? null;
            },

            // 인증 여부
            isAuthenticated: () => {
                const state = get();
                return !!state.token && !!state.user;
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
            }),
        }
    )
);

export default useAuthStore;
