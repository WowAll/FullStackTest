'use client';

import { useRouter } from 'next/navigation';

/**
 * 게시물 카드 본문 - 제목, 내용 표시
 * @param {Object} props
 * @param {number} props.boardId - 게시물 ID
 * @param {string} props.title - 게시물 제목
 * @param {string} props.content - 게시물 내용
 */
export default function BoardCardContent({ boardId, title, content }) {
    const router = useRouter();

    return (
        <>
            <h3
                onClick={() => router.push(`/boards/${boardId}`)}
                className="text-xl font-semibold text-white mb-2 cursor-pointer hover:text-purple-400 transition"
            >
                {title}
            </h3>
            <p className="text-gray-400 whitespace-pre-wrap">{content}</p>
        </>
    );
}
