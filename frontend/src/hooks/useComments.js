import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// 게시물의 댓글 목록
export function useComments(boardId) {
    return useQuery({
        queryKey: ['comments', boardId],
        queryFn: () => api.get(`/boards/${boardId}/comments`),
        enabled: !!boardId,
    });
}

// 댓글 작성
export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ boardId, content }) => api.post(`/boards/${boardId}/comments`, { content }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.boardId] });
        },
    });
}

// 댓글 수정
export function useUpdateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, content, boardId }) => api.patch(`/comments/${id}`, { content }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.boardId] });
        },
    });
}

// 댓글 삭제
export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, boardId }) => api.delete(`/comments/${id}`),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.boardId] });
        },
    });
}
