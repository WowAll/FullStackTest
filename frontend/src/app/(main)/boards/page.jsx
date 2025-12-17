'use client';

import { useState, useEffect } from 'react';
import { useAllBoards, useMyBoards, useDeleteBoard } from '@/hooks/useBoards';
import useAuthStore from '@/stores/useAuthStore';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
    BoardCard,
    BoardsEmptyState,
    BoardsFilter,
    BoardsHeader
} from '@/components/board';

export default function BoardsPage() {
    const [filter, setFilter] = useState('all');
    const [expandedBoardId, setExpandedBoardId] = useState(null);

    // 클라이언트 상태 관리
    const [isClient, setIsClient] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setIsClient(true);
        // Zustand store 구독
        const unsubscribe = useAuthStore.subscribe((state) => {
            setUserId(state.user?.id ?? null);
        });
        // 초기값 설정
        setUserId(useAuthStore.getState().user?.id ?? null);
        return () => unsubscribe();
    }, []);

    const { data: allBoards, isLoading: loadingAll } = useAllBoards({
        enabled: filter === 'all' && isClient
    });
    const { data: myBoards, isLoading: loadingMy } = useMyBoards({
        enabled: filter === 'my' && isClient
    });

    const deleteBoard = useDeleteBoard();

    const boards = filter === 'all' ? allBoards : myBoards;
    const isLoading = filter === 'all' ? loadingAll : loadingMy;

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await deleteBoard.mutateAsync(id);
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };

    const toggleExpand = (boardId) => {
        setExpandedBoardId(expandedBoardId === boardId ? null : boardId);
    };

    // 인증 여부 확인
    const isAuthenticated = isClient && userId != null;

    // 본인 게시물인지 확인
    const isMyPost = (board) => {
        if (!isClient || userId == null || board == null || board.writerId == null) {
            return false;
        }
        return userId === board.writerId;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <BoardsHeader showNewButton={isAuthenticated} />

                <BoardsFilter
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    filters={[
                        { value: 'all', label: 'All Posts', show: true },
                        { value: 'my', label: 'My Posts', show: isAuthenticated }
                    ]}
                />

                <div className="space-y-4">
                    {boards && boards.length > 0 ? (
                        <div className="grid gap-4">
                            {boards.map((board) => (
                                <BoardCard
                                    key={board.id}
                                    board={board}
                                    isOwner={isMyPost(board)}
                                    isExpanded={expandedBoardId === board.id}
                                    onToggleComments={toggleExpand}
                                    onDelete={handleDelete}
                                    isDeleting={deleteBoard.isPending}
                                />
                            ))}
                        </div>
                    ) : (
                        <BoardsEmptyState
                            filter={filter}
                            showCreateButton={isAuthenticated}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
