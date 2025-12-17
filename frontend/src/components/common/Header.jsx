'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';

export default function Header() {
    const pathname = usePathname();

    // Zustand selector를 직접 사용 - 상태 변경 시 자동 리렌더링
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);

    // Auth 페이지에서는 헤더 숨김
    if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
        return null;
    }

    const handleLogout = () => {
        useAuthStore.getState().logout();
    };

    const isAuthenticated = token != null && user != null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/boards" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Board
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/boards"
                            className={`text-sm font-medium transition-colors ${pathname === '/boards' || pathname === '/boards/new'
                                ? 'text-purple-400'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Posts
                        </Link>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <div className="hidden md:block text-sm text-gray-300">
                                    <span className="text-gray-500">Hello,</span>{' '}
                                    <span className="font-medium text-white">{user?.name || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg shadow-lg shadow-purple-500/50 transition-all"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}