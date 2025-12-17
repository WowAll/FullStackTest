import { fetchPostDetail } from '@/lib/serverApi';
import { EditPostClient } from '@/components/post';

/**
 * 게시물 수정 페이지 (Server Component)
 * - 데이터를 미리 fetch하여 Client Component에 전달 (No Spinner)
 */
export default async function EditPostPage({ params }) {
    let post = null;
    const { id } = await params;

    try {
        post = await fetchPostDetail(id);
    } catch (error) {
        console.error('Failed to fetch post detail:', error);
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400">Post not found</p>
                    <a
                        href="/posts"
                        className="mt-4 inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                    >
                        Back to Posts
                    </a>
                </div>
            </div>
        );
    }

    return <EditPostClient post={post} />;
}
