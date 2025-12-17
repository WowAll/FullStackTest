'use client';

import { useState, useEffect } from 'react';
import { useBoardDetail, useDeleteBoard } from '@/hooks/useBoards';
import { useRouter, useParams } from 'next/navigation';
import Comments from '@/components/common/Comments';
import useAuthStore from '@/stores/useAuthStore';

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: board, isLoading, error } = useBoardDetail(params.id);
  const deleteBoard = useDeleteBoard();

  // 클라이언트 상태 관리
  const [isClient, setIsClient] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setIsClient(true);
    // Zustand store에서 직접 가져오기
    const unsubscribe = useAuthStore.subscribe((state) => {
      setUserId(state.user?.id ?? null);
    });
    // 초기값 설정
    setUserId(useAuthStore.getState().user?.id ?? null);
    return () => unsubscribe();
  }, []);

  // 본인 게시물인지 확인 - 모든 값이 있을 때만 true
  const isMyPost = isClient && userId != null && board != null && board.writerId != null && userId === board.writerId;

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Post not found</p>
          <button
            onClick={() => router.push('/boards')}
            className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

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
                <span>{new Date(board.createdAt).toLocaleString()}</span>
                <span>•</span>
                <span>👁️ {board.views} views</span>
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
