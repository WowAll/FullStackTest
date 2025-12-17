/**
 * Server-side API fetching utilities
 * Server Components에서 사용 (async/await)
 */

const API_URL = process.env.NEXT_INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;

/**
 * 서버 사이드에서 API 호출
 * @param {string} endpoint - API 엔드포인트
 * @param {object} options - fetch 옵션
 */
async function serverFetch(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        // 서버 컴포넌트에서 캐싱 전략 설정 가능
        cache: options.cache || 'no-store',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `API Error: ${res.status}`);
    }

    const json = await res.json();
    return json.data ?? json;
}

/**
 * 게시물 목록 조회 (공개)
 */
export async function fetchPosts() {
    return serverFetch('/posts', { method: 'GET' });
}

/**
 * 게시물 상세 조회 (공개)
 */
export async function fetchPostDetail(id) {
    return serverFetch(`/posts/${id}`, { method: 'GET' });
}

/**
 * 조회수 증가 (클라이언트에서 호출)
 */
export async function incrementPostViews(id) {
    return serverFetch(`/posts/${id}/views`, { method: 'POST' });
}
