'use client';

import { useRouter } from 'next/navigation';

/**
 * 게시물 카드 액션 버튼 - Edit, Delete
 * @param {Object} props
 * @param {number} props.boardId - 게시물 ID
 * @param {function} props.onDelete - 삭제 핸들러
 * @param {boolean} props.isDeleting - 삭제 중 상태
 */
export default function BoardCardActions({ boardId, onDelete, isDeleting = false }) {
    const router = useRouter();

    return (
        <div className="flex items-center space-x-2 ml-4">
            <button
                onClick={() => router.push(`/boards/${boardId}/edit`)}
                className="px-3 py-1 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(boardId)}
                disabled={isDeleting}
                className="px-3 py-1 text-sm text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 rounded transition disabled:opacity-50"
            >
                Delete
            </button>
        </div>
    );
}
