'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';
import { useLogout } from '@/hooks/useAuth';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useLogout();

    // Zustand selector를 직접 사용 - 상태 변경 시 자동 리렌더링
    const user = useAuthStore((state) => state.user);

    // Auth 페이지에서는 헤더 숨김
    if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
        return null;
    }

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                router.push('/');
            },
        });
    };

    const isAuthenticated = user != null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/posts" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Post
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {isAuthenticated ? (
                            <>
                                <span className="text-gray-300">
                                    Welcome, <span className="font-semibold text-white">{user?.name}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Sign out
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
                    </nav>
                </div>
            </div>
        </header>
    );
}