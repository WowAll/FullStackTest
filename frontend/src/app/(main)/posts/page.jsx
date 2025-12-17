import { fetchPosts } from '@/lib/serverApi';
import { PostsClient } from '@/components/post';

/**
 * Posts 목록 페이지 - Server Component
 * 서버에서 초기 데이터를 fetch하고 클라이언트 컴포넌트에 전달
 */
export default async function PostsPage() {
    let initialData = { items: [], totalCount: 0, totalPages: 1, currentPage: 1 };

    try {
        const data = await fetchPosts();
        // 전체 페이지네이션 데이터 전달
        initialData = data || initialData;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }

    return <PostsClient initialData={initialData} />;
}

