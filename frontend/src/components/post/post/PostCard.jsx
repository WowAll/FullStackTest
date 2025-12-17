'use client';

import { useRouter } from 'next/navigation';
import { Comments } from '@/components/post';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardActions from './PostCardActions';
import PostCardFooter from './PostCardFooter';

/**
 * 개별 게시물 카드 컴포넌트 (Composition Pattern)
 * 각 세부 섹션은 개별 컴포넌트로 분리되어 SRP 준수
 * 
 * @param {Object} props
 * @param {Object} props.post - 게시물 데이터
 * @param {boolean} props.isOwner - 본인 게시물 여부
 * @param {boolean} props.isExpanded - 댓글 펼침 상태
 * @param {function} props.onToggleComments - 댓글 토글 핸들러
 * @param {function} props.onDelete - 삭제 핸들러
 * @param {boolean} props.isDeleting - 삭제 중 상태
 * @param {boolean} props.showControls - 컨트롤 표시 여부
 */
export default function PostCard({
    post,
    isOwner = false,
    isExpanded = false,
    onToggleComments,
    onDelete,
    isDeleting = false,
    showControls = true
}) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/posts/${post.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group bg-gray-800/40 backdrop-blur-md rounded-2xl p-5 border border-gray-700/50 hover:bg-gray-800/60 hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col h-full cursor-pointer"
        >
            {/* Header Section */}
            <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                    <PostCardHeader
                        authorName={post.writer?.name}
                        createdAt={post.createdAt}
                    />

                    {/* Action Buttons (Owner Only) - showControls가 false면 숨김 */}
                    {isOwner && showControls && (
                        <PostCardActions
                            postId={post.id}
                            onDelete={onDelete}
                            isDeleting={isDeleting}
                        />
                    )}
                </div>

                {post.thumbnail && (
                    <div className="overflow-hidden rounded-xl mb-4">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${post.thumbnail}`}
                            alt={post.title}
                            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                )}

                <PostCardContent
                    postId={post.id}
                    title={post.title}
                />
            </div>

            {/* Footer Section - Pushed to bottom */}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
                <PostCardFooter
                    views={post.views}
                    commentCount={post.commentCount}
                    onToggleComments={() => onToggleComments(post.id)}
                />
            </div>

            {/* Comments Section */}
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <Comments postId={post.id} readOnly={!showControls} />
                </div>
            )}
        </div>
    );
}
