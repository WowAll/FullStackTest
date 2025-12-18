'use client';

import PostForm from './post/PostForm';

export default function PostEditor({
    title,
    description,
    initialValues,
    onSubmit,
    isSubmitting,
    error,
    submitLabel
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        {title}
                    </h1>
                    <p className="text-gray-400">{description}</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                        {error.message || 'An error occurred'}
                    </div>
                )}

                <PostForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    submitLabel={submitLabel}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
