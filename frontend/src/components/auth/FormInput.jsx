'use client';

import { forwardRef } from 'react';

/**
 * 인증 폼용 입력 필드 컴포넌트 (OCP 준수)
 * variant, size로 확장 가능, className으로 스타일 오버라이드 가능
 * 
 * @param {Object} props
 * @param {string} props.id - 입력 필드 ID
 * @param {string} props.label - 레이블 텍스트
 * @param {string} props.type - 입력 타입 (text, email, password 등)
 * @param {string} props.value - 현재 값
 * @param {function} props.onChange - 값 변경 핸들러
 * @param {string} props.placeholder - 플레이스홀더 텍스트
 * @param {boolean} props.required - 필수 여부
 * @param {string} props.error - 에러 메시지
 * @param {'default' | 'light' | 'outlined'} props.variant - 입력 필드 스타일 변형
 * @param {'sm' | 'md' | 'lg'} props.size - 입력 필드 크기
 * @param {string} props.className - input 추가 CSS 클래스
 * @param {string} props.labelClassName - label 추가 CSS 클래스
 */

const inputVariants = {
    default: 'bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:ring-purple-500',
    light: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500',
    outlined: 'bg-transparent border-gray-500 text-white placeholder-gray-400 focus:ring-purple-500 border-2',
};

const inputSizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-5 py-4 text-lg',
};

const labelVariants = {
    default: 'text-gray-300',
    light: 'text-gray-700',
    outlined: 'text-gray-300',
};

const FormInput = forwardRef(function FormInput({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    error,
    variant = 'default',
    size = 'md',
    className = '',
    labelClassName = '',
    ...rest
}, ref) {
    const baseInputStyles = 'w-full border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition';
    const variantInputStyles = inputVariants[variant] || inputVariants.default;
    const sizeInputStyles = inputSizes[size] || inputSizes.md;
    const labelStyles = labelVariants[variant] || labelVariants.default;
    const inputProps = {
        id,
        type,
        required,
        placeholder,
        className: `${baseInputStyles} ${variantInputStyles} ${sizeInputStyles} ${className}`,
        ref,
        ...rest,
    };

    if (value !== undefined) {
        inputProps.value = value;
    }
    if (onChange) {
        inputProps.onChange = onChange;
    }

    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium mb-2 ${labelStyles} ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            <input {...inputProps} />
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
});

export default FormInput;
