'use client';

import { useState, useEffect, useRef } from 'react';
import { useDeleteBoard } from '@/hooks/useBoards';
import { useRouter } from 'next/navigation';
import Comments from '@/components/common/Comments';
import useAuthStore from '@/stores/useAuthStore';
import { api } from '@/lib/api';

/**
 * Board Detail 페이지 클라이언트 컴포넌트
 * 인터랙션 처리: 수정/삭제 버튼, 댓글
 * 
 * @param {Object} props
 * @param {Object} props.board - 서버에서 가져온 게시물 데이터
 */
export default function BoardDetailClient({ board }) {
    const router = useRouter();
    const deleteBoard = useDeleteBoard();
    const [views, setViews] = useState(board.views);
    const viewsIncremented = useRef(false);

    const user = useAuthStore((state) => state.user);
    const isMyPost = user && board && user.id === board.writerId;

    // 클라이언트에서만 조회수 증가 API 호출 (중복 방지)
    useEffect(() => {
        if (viewsIncremented.current) return;
        viewsIncremented.current = true;

        api.post(`/boards/${board.id}/views`)
            .then(() => setViews((v) => v + 1))
            .catch(() => { }); // 조회수 증가 실패는 무시
    }, [board.id]);

    const handleDelete = async () => {
        if (!board) return;
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await deleteBoard.mutateAsync(board.id);
                router.push('/boards');
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };

    const handleEdit = () => {
        if (!board) return;
        router.push(`/boards/${board.id}/edit`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/boards')}
                    className="mb-6 flex items-center text-gray-400 hover:text-white transition"
                >
                    <span className="mr-2">←</span>
                    Back to Posts
                </button>

                {/* Post Content */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-8 border border-gray-700/50">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-4">{board.title}</h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>{board.writer?.name || 'Anonymous'}</span>
                                <span>•</span>
                                <span>{new Date(board.createdAt).toISOString().split('T')[0]}</span>
                                <span>•</span>
                                <span>👁️ {views} views</span>
                            </div>
                        </div>
                        {isMyPost && (
                            <div className="flex items-center space-x-2 ml-4">
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleteBoard.isPending}
                                    className="px-4 py-2 text-sm text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 rounded-lg transition disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Image */}
                    {board.thumbnail && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${board.thumbnail}`}
                            alt={board.title}
                            className="w-full max-h-96 object-cover rounded-lg mb-6"
                        />
                    )}

                    {/* Content */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {board.content}
                        </p>
                    </div>
                </div>

                {/* Comments Section */}
                <Comments boardId={board.id} />
            </div>
        </div>
    );
}
