'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// 전체 유저 조회
export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => api.get('/users'),
    });
}

// 특정 유저 조회
export function useUser(id) {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => api.get(`/users/${id}`),
        enabled: !!id, // id가 있을 때만 실행
    });
}

// 유저 생성
export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData) => api.post('/users', userData),
        onSuccess: () => {
            // 유저 목록 새로고침
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

// 유저 수정
export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }) => api.patch(`/users/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

// 유저 삭제
export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => api.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
