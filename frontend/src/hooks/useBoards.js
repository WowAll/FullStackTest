import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// 전체 게시물 목록 조회
export function useAllBoards(options = {}) {
    return useQuery({
        queryKey: ['boards', 'all'],
        queryFn: () => api.get('/boards'),
        ...options,  // enabled 옵션 등 전달
    });
}

// 내 게시물 목록 조회
export function useMyBoards(options = {}) {
    return useQuery({
        queryKey: ['boards', 'me'],
        queryFn: () => api.get('/boards/me'),
        ...options,  // enabled 옵션 등 전달
    });
}

// 단일 게시물 조회
export function useBoardDetail(id, options = {}) {
  return useQuery({
    queryKey: ['boards', id],
    queryFn: () => api.get(`/boards/${id}`),
    enabled: !!id,  // id가 있을 때만 조회
    ...options,
  });
}

// 게시물 생성
export function useCreateBoard() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => api.post('/boards', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
}

// 게시물 수정
export function useUpdateBoard() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }) => api.patch(`/boards/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
}

// 게시물 삭제
export function useDeleteBoard() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => api.delete(`/boards/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
}
