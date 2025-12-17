'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { loginSchema } from '@/lib/schemas';

export default function LoginPage() {
    const [error, setError] = useState('');
    const login = useLogin();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        setError('');
        try {
            await login.mutateAsync(data);
            router.push('/posts');
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <FormInput
                        id="password"
                        label="Password"
                        type="password"
                        required
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <SubmitButton
                        isLoading={login.isPending || isSubmitting}
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
