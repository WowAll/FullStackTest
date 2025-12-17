'use client';

/**
 * 에러 메시지 표시 컴포넌트
 * @param {Object} props
 * @param {string} props.message - 에러 메시지
 */
export default function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {message}
        </div>
    );
}
