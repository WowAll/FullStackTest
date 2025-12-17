'use client';

import { useRouter } from 'next/navigation';

/**
 * 게시물이 없을 때 표시되는 빈 상태 컴포넌트
 * @param {Object} props
 * @param {string} props.filter - 현재 필터 상태 ('all' | 'my')
 * @param {boolean} props.showCreateButton - 작성 버튼 표시 여부
 */
export default function BoardsEmptyState({
    filter = 'all',
    showCreateButton = false
}) {
    const router = useRouter();

    return (
        <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
                {filter === 'my' ? 'No posts yet' : 'No posts available'}
            </p>
            {showCreateButton && filter === 'my' && (
                <button
                    onClick={() => router.push('/boards/new')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/50 transition-all"
                >
                    Create Your First Post
                </button>
            )}
        </div>
    );
}
