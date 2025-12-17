'use client';

/**
 * 게시물 카드 푸터 - 조회수, 댓글 토글
 * @param {Object} props
 * @param {number} props.views - 조회수
 * @param {function} props.onToggleComments - 댓글 토글 핸들러
 */
export default function BoardCardFooter({ views, onToggleComments }) {
    return (
        <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
                <span>👁️ {views} views</span>
                <button
                    onClick={onToggleComments}
                    className="text-purple-400 hover:text-purple-300 transition"
                >
                    💬 Comments
                </button>
            </div>
        </div>
    );
}
