'use client';

import Link from 'next/link';

/**
 * 인증 페이지 간 이동 링크 컴포넌트
 * @param {Object} props
 * @param {string} props.text - 설명 텍스트
 * @param {string} props.linkText - 링크 텍스트
 * @param {string} props.href - 링크 URL
 */
export default function AuthLink({ text, linkText, href }) {
    return (
        <div className="mt-6 text-center">
            <p className="text-gray-400">
                {text}{' '}
                <Link
                    href={href}
                    className="text-purple-400 hover:text-purple-300 font-medium transition"
                >
                    {linkText}
                </Link>
            </p>
        </div>
    );
}
