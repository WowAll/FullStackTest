'use client';

import { useUpdatePost } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';
import { PostEditor } from '@/components/post';

export default function EditPostClient({ post }) {
    const router = useRouter();
    const updatePost = useUpdatePost();
    const user = useAuthStore((state) => state.user);

    // 권한 확인: 본인 게시물만 수정 가능
    const isOwner = user && post && user.id === post.writerId;

    const onSubmit = async (data) => {
        try {
            await updatePost.mutateAsync({
                id: post.id,
                ...data
            });
            router.push(`/posts/${post.id}`);
        } catch (err) {
            // API 에러는 mutation에서 처리
        }
    };

    // 권한이 없으면 접근 불가 UI 표시 (Page에서 미리 체크하는 것이 좋지만 이중 안전장치)
    if (!isOwner) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400">You don't have permission to edit this post</p>
                    <button
                        onClick={() => router.push('/posts')}
                        className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                    >
                        Back to Posts
                    </button>
                </div>
            </div>
        );
    }

    return (
        <PostEditor
            title="Edit Post"
            description="Update your post"
            initialValues={post}
            onSubmit={onSubmit}
            isSubmitting={updatePost.isPending}
            error={updatePost.error}
            submitLabel="Update Post"
        />
    );
}
