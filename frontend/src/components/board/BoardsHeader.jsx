'use client';

import { useRouter } from 'next/navigation';

/**
 * Boards 페이지 헤더 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 페이지 제목
 * @param {string} props.subtitle - 부제목
 * @param {boolean} props.showNewButton - 새 글 작성 버튼 표시 여부
 */
export default function BoardsHeader({
    title = 'Posts',
    subtitle = 'Share your thoughts',
    showNewButton = false
}) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {title}
                </h1>
                <p className="text-gray-400">{subtitle}</p>
            </div>
            {showNewButton && (
                <button
                    onClick={() => router.push('/boards/new')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/50 transition-all"
                >
                    + New Post
                </button>
            )}
        </div>
    );
}
