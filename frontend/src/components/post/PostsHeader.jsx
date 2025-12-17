'use client';

import { useRouter } from 'next/navigation';

/**
 * Posts 페이지 헤더 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 페이지 제목
 * @param {string} props.subtitle - 부제목
 * @param {boolean} props.showNewButton - 새 글 작성 버튼 표시 여부
 */
export default function PostsHeader({
    title = 'Posts',
    subtitle = 'Share your thoughts',
    showNewButton = false
}) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between mb-12">
            <div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3 animate-gradient">
                    {title}
                </h1>
                <p className="text-gray-400 text-lg">{subtitle}</p>
            </div>
            {showNewButton && (
                <button
                    onClick={() => router.push('/posts/new')}
                    className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                    + New Post
                </button>
            )}
        </div>
    );
}
