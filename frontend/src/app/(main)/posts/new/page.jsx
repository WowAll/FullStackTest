'use client';

import { useCreatePost } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';
import { PostEditor } from '@/components/post';

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
        <PostEditor
            title="Create New Post"
            description="Share your thoughts"
            onSubmit={onSubmit}
            isSubmitting={createPost.isPending}
            error={createPost.error}
            submitLabel="Create Post"
        />
    );
}
