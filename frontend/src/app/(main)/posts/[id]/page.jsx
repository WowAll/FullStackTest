import { fetchPostDetail } from '@/lib/serverApi';
import { notFound } from 'next/navigation';
import { PostDetailClient } from '@/components/post';

/**
 * Post Detail 페이지 - Server Component
 * 서버에서 게시물 데이터를 fetch하고 클라이언트 컴포넌트에 전달
 */
export default async function PostDetailPage({ params }) {
  const { id } = await params;

  let post = null;

  try {
    post = await fetchPostDetail(id);
  } catch (error) {
    console.error('Failed to fetch post detail:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return <PostDetailClient post={post} />;
}
