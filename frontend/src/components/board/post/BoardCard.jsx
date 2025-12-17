'use client';

import Comments from '@/components/common/Comments';
import BoardCardHeader from './BoardCardHeader';
import BoardCardContent from './BoardCardContent';
import BoardCardActions from './BoardCardActions';
import BoardCardFooter from './BoardCardFooter';

/**
 * 개별 게시물 카드 컴포넌트 (Composition Pattern)
 * 각 세부 섹션은 개별 컴포넌트로 분리되어 SRP 준수
 * 
 * @param {Object} props
 * @param {Object} props.board - 게시물 데이터
 * @param {boolean} props.isOwner - 본인 게시물 여부
 * @param {boolean} props.isExpanded - 댓글 펼침 상태
 * @param {function} props.onToggleComments - 댓글 토글 핸들러
 * @param {function} props.onDelete - 삭제 핸들러
 * @param {boolean} props.isDeleting - 삭제 중 상태
 */
export default function BoardCard({
    board,
    isOwner = false,
    isExpanded = false,
    onToggleComments,
    onDelete,
    isDeleting = false
}) {
    return (
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <BoardCardHeader
                        authorName={board.writer?.name}
                        createdAt={board.createdAt}
                    />
                    {board.thumbnail && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${board.thumbnail}`}
                            alt={board.title}
                            className="w-full h-48 object-cover rounded-lg mb-3"
                        />
                    )}
                    <BoardCardContent
                        boardId={board.id}
                        title={board.title}
                        content={board.content}
                    />
                </div>

                {/* Action Buttons (Owner Only) */}
                {isOwner && (
                    <BoardCardActions
                        boardId={board.id}
                        onDelete={onDelete}
                        isDeleting={isDeleting}
                    />
                )}
            </div>

            {/* Footer Section */}
            <BoardCardFooter
                views={board.views}
                onToggleComments={() => onToggleComments(board.id)}
            />

            {/* Comments Section */}
            {isExpanded && (
                <Comments boardId={board.id} />
            )}
        </div>
    );
}
