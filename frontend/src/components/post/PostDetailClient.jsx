'use client';

import { useState, useEffect, useRef } from 'react';
import { useDeletePost } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';
import { Comments } from '@/components/post';
import useAuthStore from '@/stores/useAuthStore';
import { api } from '@/lib/api';

/**
 * Post Detail 페이지 클라이언트 컴포넌트
 * 인터랙션 처리: 수정/삭제 버튼, 댓글
 * 
 * @param {Object} props
 * @param {Object} props.post - 서버에서 가져온 게시물 데이터
 */
export default function PostDetailClient({ post }) {
    const router = useRouter();
    const deletePost = useDeletePost();
    const [views, setViews] = useState(post.views);
    const viewsIncremented = useRef(false);

    const user = useAuthStore((state) => state.user);
    const isMyPost = user && post && user.id === post.writerId;

    // 클라이언트에서만 조회수 증가 API 호출 (중복 방지)
    useEffect(() => {
        if (viewsIncremented.current) return;
        viewsIncremented.current = true;

        api.post(`/posts/${post.id}/views`)
            .then(() => setViews((v) => v + 1))
            .catch(() => { }); // 조회수 증가 실패는 무시
    }, [post.id]);

    const handleDelete = async () => {
        if (!post) return;
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost.mutateAsync(post.id);
                router.push('/posts');
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };

    const handleEdit = () => {
        if (!post) return;
        router.push(`/posts/${post.id}/edit`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/posts')}
                    className="mb-6 flex items-center text-gray-400 hover:text-white transition"
                >
                    <span className="mr-2">←</span>
                    Back to Posts
                </button>

                {/* Post Content */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-8 border border-gray-700/50">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>{post.writer?.name || 'Anonymous'}</span>
                                <span>•</span>
                                <span>{new Date(post.createdAt).toISOString().split('T')[0]}</span>
                                <span>•</span>
                                <span>👁️ {views} views</span>
                            </div>
                        </div>
                        {isMyPost && (
                            <div className="flex items-center space-x-2 ml-4">
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={deletePost.isPending}
                                    className="px-4 py-2 text-sm text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 rounded-lg transition disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Image */}
                    {post.thumbnail && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${post.thumbnail}`}
                            alt={post.title}
                            className="w-full h-auto max-h-[600px] object-contain rounded-lg mb-8 bg-black/30"
                        />
                    )}

                    {/* Content */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {post.content}
                        </p>
                    </div>
                </div>

                {/* Comments Section */}
                <Comments postId={post.id} />
            </div>
        </div>
    );
}
