"use client" // 추가

import Link from 'next/link'
import { Button } from '@/components/ui/button'

import Image from 'next/image'

import SearchBar from './SearchBar'
import Mainnav from './Mainnav'
import { useModalStore } from '@/stores/useModalStore'
import LoginConfirmModal from './LoginConfirmModal'

const Header = () => {
    const { openModal } = useModalStore() // 스토어에서 'openModal' 함수 가져오기

    return (
        <>
            <header className="flex w-full items-center justify-between px-10 py-6">
                <div className="flex items-center gap-10">
                    <Link href={'/'} className="">
                    </Link>
                    <Mainnav />
                </div>
                <div className="flex items-center gap-10">
                    <SearchBar className={'rounded-2xl'} />
                    <Link href={'/login'}>
                        {/* 모달 열닫 핸들러 적용 */}
                        <Button onClick={openModal} className={'whitespace-nowrap'} size={'sm'}>
                            시작하기
                        </Button>
                    </Link>
                </div>
            </header>
            <LoginConfirmModal /> {/* 모달 컴포넌트 추가 */}
        </>
    )
}

export default Header