'use client';

/**
 * 게시물 필터 버튼 컴포넌트 (OCP 준수)
 * filters 배열로 필터 옵션 확장 가능
 * 
 * @param {Object} props
 * @param {string} props.currentFilter - 현재 선택된 필터 값
 * @param {function} props.onFilterChange - 필터 변경 핸들러
 * @param {Array<{value: string, label: string, show?: boolean}>} props.filters - 필터 옵션 배열
 * @param {string} props.className - 컨테이너 추가 CSS 클래스
 * @param {'default' | 'compact'} props.variant - 버튼 스타일 변형
 */

const buttonVariants = {
    default: {
        base: 'px-6 py-2 rounded-lg font-medium transition-all',
        active: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50',
        inactive: 'bg-gray-800 text-gray-300 hover:bg-gray-700',
    },
    compact: {
        base: 'px-4 py-1.5 rounded-md text-sm font-medium transition-all',
        active: 'bg-purple-600 text-white',
        inactive: 'bg-gray-700 text-gray-400 hover:bg-gray-600',
    },
};

export default function PostsFilter({
    currentFilter,
    onFilterChange,
    filters = [],
    className = '',
    variant = 'default'
}) {
    const styles = buttonVariants[variant] || buttonVariants.default;

    // 기본 필터 옵션 (하위 호환성)
    const defaultFilters = [
        { value: 'all', label: 'All Posts', show: true },
        { value: 'my', label: 'My Posts', show: true },
    ];

    const filterOptions = filters.length > 0 ? filters : defaultFilters;

    return (
        <div className={`flex space-x-4 mb-6 ${className}`}>
            {filterOptions.map((filter) => {
                // show가 false면 렌더링하지 않음
                if (filter.show === false) return null;

                const isActive = currentFilter === filter.value;
                const buttonClass = `${styles.base} ${isActive ? styles.active : styles.inactive}`;

                return (
                    <button
                        key={filter.value}
                        onClick={() => onFilterChange(filter.value)}
                        className={buttonClass}
                    >
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
}
