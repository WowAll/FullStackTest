'use client';

/**
 * 게시물 카드 헤더 - 작성자, 날짜 표시
 * @param {Object} props
 * @param {string} props.authorName - 작성자 이름
 * @param {string} props.createdAt - 작성 날짜 (ISO string)
 */
export default function BoardCardHeader({ authorName, createdAt }) {
    return (
        <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-400">
                {authorName || 'Anonymous'}
            </span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
            </span>
        </div>
    );
}
