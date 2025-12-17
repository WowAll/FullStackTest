'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { signupSchema } from '@/lib/schemas';

export default function SignupPage() {
    const [error, setError] = useState('');
    const signup = useSignup();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async ({ name, email, password }) => {
        setError('');
        try {
            await signup.mutateAsync({ name, email, password });
            router.push('/posts');
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormInput
                        id="name"
                        label="Name"
                        type="text"
                        required
                        placeholder="John Doe"
                        error={errors.name?.message}
                        {...register('name')}
                    />

                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <div>
                        <FormInput
                            id="password"
                            label="Password"
                            type="password"
                            required
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                        />
                        <p className="mt-2 text-xs text-gray-500">Must be at least 6 characters</p>
                    </div>

                    <FormInput
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        required
                        placeholder="••••••••"
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />

                    <SubmitButton
                        isLoading={signup.isPending || isSubmitting}
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
