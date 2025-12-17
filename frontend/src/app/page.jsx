'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';
import Link from 'next/link';

export default function MainPage() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (user) {
            router.replace('/posts');
        }
    }, [user, router]);

    // 로그인 상태면 리다이렉트 중이므로 로딩 표시
    if (user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // 비로그인 상태면 Welcome 화면
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                    Welcome
                </h1>
                <p className="text-gray-400 text-xl mb-8">
                    Sign in to get started
                </p>
                <div className="space-x-4">
                    <Link
                        href="/login"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 transition-all"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-all"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
