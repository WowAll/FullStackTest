'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// 게시물의 댓글 목록
export function useComments(postId) {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => api.get(`/posts/${postId}/comments`),
        enabled: !!postId,
    });
}

// 댓글 작성
export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, content }) => api.post(`/posts/${postId}/comments`, { content }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
        },
    });
}

// 댓글 수정
export function useUpdateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, content, postId }) => api.patch(`/comments/${id}`, { content }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
        },
    });
}

// 댓글 삭제
export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, postId }) => api.delete(`/comments/${id}`),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
        },
    });
}
