'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation' // 2. 현재 경로 가져오는 훅
import React from 'react'
import { cn } from '@/lib/utils' // 3. 조건부 스타일링 도구 (shadcn 기본 유틸)

const Mainnav = () => {
    const pathname = usePathname() // 현재 브라우저의 주소 (예: '/feed')

    // 4. 메뉴 목록을 배열로 관리 (유지보수가 편해짐)
    const navItems = [
        { href: '/', label: '홈' },
        { href: '/feed', label: '피드' },
        { href: '/skin', label: '스킨' },
        { href: '/forum', label: '포털' },
    ]

    return (
        <div className="flex items-center justify-center gap-3">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        // 기본 스타일 (회색, 호버 시 검정)
                        'text-base font-medium text-gray-900 transition-colors',
                        // [핵심 로직] 현재 경로와 링크가 같으면 -> 주황색 + 밑줄 적용
                        pathname === item.href && 'font-bold text-orange-500 underline underline-offset-4',
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    )
}

export default Mainnav