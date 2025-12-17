'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
    AuthBackground,
    AuthCard,
    AuthLink,
    ErrorMessage,
    FormInput,
    SubmitButton
} from '@/components/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useLogin();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login.mutateAsync({ email, password });
            router.push('/boards');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
            <AuthBackground />

            <AuthCard
                title="Welcome Back"
                subtitle="Sign in to your account"
            >
                <ErrorMessage message={error} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />

                    <FormInput
                        id="password"
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    <SubmitButton
                        isLoading={login.isPending}
                        loadingText="Signing in..."
                    >
                        Sign In
                    </SubmitButton>
                </form>

                <AuthLink
                    text="Don't have an account?"
                    linkText="Sign up"
                    href="/signup"
                />
            </AuthCard>
        </div>
    );
}