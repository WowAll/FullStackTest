'use client';

/**
 * 게시물 카드 헤더 - 작성자, 날짜 표시
 * @param {Object} props
 * @param {string} props.authorName - 작성자 이름
 * @param {string} props.createdAt - 작성 날짜 (ISO string)
 */
export default function PostCardHeader({ authorName, createdAt }) {
    return (
        <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                {authorName || 'Anonymous'}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-500 text-xs">
                {new Date(createdAt).toISOString().split('T')[0]}
            </span>
        </div>
    );
}
