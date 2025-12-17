'use client';

/**
 * 인증 페이지용 카드 컨테이너
 * glassmorphism 스타일의 카드 래퍼
 * @param {Object} props
 * @param {React.ReactNode} props.children - 카드 내부 콘텐츠
 * @param {string} props.title - 카드 제목
 * @param {string} props.subtitle - 카드 부제목
 */
export default function AuthCard({ children, title, subtitle }) {
    return (
        <div className="relative w-full max-w-md">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30"></div>

            {/* Card */}
            <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-8">
                        {title && (
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="text-gray-400 mt-2">{subtitle}</p>
                        )}
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}
