'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/stores/useAuthStore';
import { api } from '@/lib/api';

// 회원가입
export function useSignup() {
    const queryClient = useQueryClient();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: async ({ email, password, name }) => {
            return api.post('/auth/signup', { email, password, name });
        },
        onSuccess: (result) => {
            setAuth(result.user);
            queryClient.invalidateQueries();
        },
    });
}

// 로그인
export function useLogin() {
    const queryClient = useQueryClient();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: async ({ email, password }) => {
            return api.post('/auth/login', { email, password });
        },
        onSuccess: (result) => {
            setAuth(result.user);
            queryClient.invalidateQueries();
        },
    });
}

// 로그아웃 (API 호출 추가)
export function useLogout() {
    const queryClient = useQueryClient();
    const logout = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: async () => {
            return api.post('/auth/logout', {});
        },
        onSuccess: () => {
            logout();
            queryClient.clear();
        },
    });
}

// 현재 유저 정보
export function useCurrentUser() {
    return useAuthStore((state) => state.user);
}

// 인증 여부
export function useIsAuthenticated() {
    const user = useAuthStore((state) => state.user);
    return !!user;
}
