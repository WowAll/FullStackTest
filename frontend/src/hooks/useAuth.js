import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/stores/useAuthStore';

// 회원가입
export function useSignup() {
    const queryClient = useQueryClient();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: async ({ email, password, name }) => {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Signup failed');
            }
            return res.json();
        },
        onSuccess: (response) => {
            // Handle both wrapped {data: ...} and unwrapped responses
            const result = response.data ?? response;
            setAuth(result.user, result.access_token);
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
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Login failed');
            }
            return res.json();
        },
        onSuccess: (response) => {
            // Handle both wrapped {data: ...} and unwrapped responses
            const result = response.data ?? response;
            setAuth(result.user, result.access_token);
            queryClient.invalidateQueries();
        },
    });
}

// 로그아웃
export function useLogout() {
    return () => {
        useAuthStore.getState().logout();
    };
}

// 현재 유저 정보
export function useCurrentUser() {
    return useAuthStore((state) => state.user);
}

// 인증 여부
export function useIsAuthenticated() {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    return !!token && !!user;
}

// 토큰
export function useToken() {
    return useAuthStore((state) => state.token);
}
