'use client';

import { useState, useEffect } from 'react';
import { useAllPosts, useMyPosts, useDeletePost } from '@/hooks/usePosts';
import useAuthStore from '@/stores/useAuthStore';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
    PostCard,
    PostsEmptyState,
    PostsFilter,
    PostsHeader
} from '@/components/post';

const ITEMS_PER_PAGE = 9;

/**
 * Posts 페이지 클라이언트 컴포넌트
 * 인터랙션 처리: 필터링, 삭제, 댓글 토글, 페이지네이션
 */
export default function PostsClient({ initialData = { items: [], totalCount: 0, totalPages: 1, currentPage: 1 } }) {
    const [filter, setFilter] = useState('all');
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [page, setPage] = useState(1);

    // 클라이언트 상태 관리
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = !!user;
    const userId = user?.id ?? null;

    // React Query로 데이터 관리 (페이지네이션) - 서버에서 받은 전체 데이터 사용
    const { data: allPostsData, isLoading: loadingAll } = useAllPosts(page, ITEMS_PER_PAGE, {
        initialData: page === 1 ? initialData : undefined,
        staleTime: 0, // 즉시 refetch 허용
    });
    const { data: myPostsData, isLoading: loadingMy } = useMyPosts(page, ITEMS_PER_PAGE, {
        enabled: filter === 'my' && isAuthenticated,
        initialData: undefined, // MyPosts는 서버 사이드 렌더링 데이터 사용 안 함 (클라이언트 패치)
        staleTime: 0,
    });

    const deletePost = useDeletePost();

    // 페이지네이션 데이터
    const posts = filter === 'all' ? (allPostsData?.items || []) : (myPostsData?.items || []);
    const totalPages = filter === 'all' ? (allPostsData?.totalPages || 1) : (myPostsData?.totalPages || 1);
    const isLoading = (filter === 'all' && loadingAll) || (filter === 'my' && loadingMy);

    // 필터 변경 시 페이지 초기화
    useEffect(() => {
        setPage(1);
    }, [filter]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost.mutateAsync(id);
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };

    const toggleExpand = (postId) => {
        setExpandedPostId(expandedPostId === postId ? null : postId);
    };

    const isMyPost = (post) => {
        if (userId == null || post == null || post.writerId == null) {
            return false;
        }
        return userId === post.writerId;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <PostsHeader showNewButton={isAuthenticated} />

                <PostsFilter
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    filters={[
                        { value: 'all', label: 'All Posts', show: true },
                        { value: 'my', label: 'My Posts', show: isAuthenticated }
                    ]}
                />

                <div className="space-y-4">
                    {posts && posts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        isOwner={isMyPost(post)}
                                        isExpanded={expandedPostId === post.id}
                                        onToggleComments={toggleExpand}
                                        onDelete={handleDelete}
                                        isDeleting={deletePost.isPending}
                                        showControls={false}
                                    />
                                ))}
                            </div>

                            {/* 페이지네이션 UI - My Posts 포함 모든 필터에서 동작 */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        ← Prev
                                    </button>

                                    <div className="flex gap-1">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (page <= 3) {
                                                pageNum = i + 1;
                                            } else if (page >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = page - 2 + i;
                                            }
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setPage(pageNum)}
                                                    className={`w-10 h-10 rounded-lg transition ${page === pageNum
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <PostsEmptyState
                            filter={filter}
                            showCreateButton={isAuthenticated}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
