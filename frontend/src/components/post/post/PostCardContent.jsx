'use client';

import { useRouter } from 'next/navigation';

/**
 * 게시물 카드 본문 - 제목, 내용 표시
 * @param {Object} props
 * @param {number} props.postId - 게시물 ID
 * @param {string} props.title - 게시물 제목
 * @param {string} props.content - 게시물 내용
 */
export default function PostCardContent({ postId, title }) {
    const router = useRouter();

    return (
        <div className="mb-2">
            <h3
                className="text-xl font-bold text-gray-100 hover:text-purple-400 transition-colors duration-200 line-clamp-2 leading-tight"
            >
                {title}
            </h3>
        </div>
    );
}
