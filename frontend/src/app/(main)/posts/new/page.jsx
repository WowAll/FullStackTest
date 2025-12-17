'use client';

import { useCreatePost } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';
import { PostForm } from '@/components/post';

export default function NewPostPage() {
    const createPost = useCreatePost();
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            await createPost.mutateAsync(data);
            router.push('/posts');
        } catch (err) {
            // API 에러는 mutation에서 처리
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        Create New Post
                    </h1>
                    <p className="text-gray-400">Share your thoughts</p>
                </div>

                {createPost.isError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                        {createPost.error?.message || 'Failed to create post'}
                    </div>
                )}

                <PostForm
                    onSubmit={onSubmit}
                    submitLabel="Create Post"
                    isSubmitting={createPost.isPending}
                />
            </div>
        </div>
    );
}
