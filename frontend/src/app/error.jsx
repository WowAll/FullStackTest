'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log error to an error reporting service
        console.error('Global Error Boundary caught:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-8 border border-red-500/30 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Something went wrong!</h2>
                <p className="text-gray-400 mb-6 text-sm">
                    {error.message || 'An unexpected error occurred.'}
                </p>
                <div className="space-x-4">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all"
                    >
                        Try again
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}
