'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// 전체 게시물 목록 조회 (페이지네이션)
export function useAllPosts(page = 1, limit = 9, options = {}) {
    return useQuery({
        queryKey: ['posts', 'all', page, limit],
        queryFn: () => api.get(`/posts?page=${page}&limit=${limit}`),
        ...options,
    });
}

// 내 게시물 목록 조회
export function useMyPosts(page = 1, limit = 9, options = {}) {
    return useQuery({
        queryKey: ['posts', 'me', page, limit],
        queryFn: () => api.get(`/posts/me?page=${page}&limit=${limit}`),
        ...options,  // enabled 옵션 등 전달
    });
}

// 단일 게시물 조회
export function usePostDetail(id, options = {}) {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: () => api.get(`/posts/${id}`),
        enabled: !!id,  // id가 있을 때만 조회
        ...options,
    });
}

// 게시물 생성
export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => api.post('/posts', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
}

// 게시물 수정
export function useUpdatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }) => api.patch(`/posts/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
}

// 게시물 삭제
export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => api.delete(`/posts/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
}
