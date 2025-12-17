'use client';

/**
 * 게시물 카드 푸터 - 조회수, 댓글 토글
 * @param {Object} props
 * @param {number} props.views - 조회수
 * @param {function} props.onToggleComments - 댓글 토글 핸들러
 */
export default function PostCardFooter({ views, commentCount = 0, onToggleComments }) {
    return (
        <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
                <span className="flex items-center hover:text-gray-300 transition-colors">
                    <span className="mr-1.5 opacity-70">👁️</span>
                    {views}
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleComments();
                    }}
                    className="flex items-center hover:text-purple-400 transition-colors group"
                >
                    <span className="mr-1.5 opacity-70 group-hover:opacity-100">💬</span>
                    <span>{commentCount}</span>
                </button>
            </div>
        </div>
    );
}
