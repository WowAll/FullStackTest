'use client';

/**
 * 페이지 로딩 스피너 컴포넌트
 * @param {Object} props
 * @param {string} props.message - 로딩 메시지 (기본값: "Loading...")
 */
export default function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-400">{message}</p>
            </div>
        </div>
    );
}
