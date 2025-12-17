'use client';

import { useState } from 'react';
import { useSignup } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
    AuthBackground,
    AuthCard,
    AuthLink,
    ErrorMessage,
    FormInput,
    SubmitButton
} from '@/components/auth';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const signup = useSignup();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup.mutateAsync({ email, password, name });
            router.push('/boards');
        } catch (err) {
            setError(err.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
            <AuthBackground />

            <AuthCard
                title="Create Account"
                subtitle="Join us today"
            >
                <ErrorMessage message={error} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        id="name"
                        label="Name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                    />

                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />

                    <div>
                        <FormInput
                            id="password"
                            label="Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <p className="mt-2 text-xs text-gray-500">Must be at least 6 characters</p>
                    </div>

                    <SubmitButton
                        isLoading={signup.isPending}
                        loadingText="Creating account..."
                    >
                        Create Account
                    </SubmitButton>
                </form>

                <AuthLink
                    text="Already have an account?"
                    linkText="Sign in"
                    href="/login"
                />
            </AuthCard>
        </div>
    );
}
