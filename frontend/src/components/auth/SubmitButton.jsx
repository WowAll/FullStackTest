'use client';

/**
 * 인증 폼용 제출 버튼 컴포넌트 (OCP 준수)
 * variant, size로 확장 가능, className으로 스타일 오버라이드 가능
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {string} props.loadingText - 로딩 중 표시할 텍스트
 * @param {string} props.children - 버튼 텍스트
 * @param {'primary' | 'secondary' | 'danger'} props.variant - 버튼 스타일 변형
 * @param {'sm' | 'md' | 'lg'} props.size - 버튼 크기
 * @param {string} props.className - 추가 CSS 클래스
 * @param {string} props.type - 버튼 타입 (submit, button, reset)
 */

const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/50',
};

const sizes = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4',
    lg: 'py-4 px-6 text-lg',
};

export default function SubmitButton({
    isLoading = false,
    loadingText = 'Loading...',
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    type = 'submit'
}) {
    const baseStyles = 'w-full font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = variants[variant] || variants.primary;
    const sizeStyles = sizes[size] || sizes.md;

    return (
        <button
            type={type}
            disabled={isLoading}
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    {loadingText}
                </span>
            ) : (
                children
            )}
        </button>
    );
}
