'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/lib/schemas';
import useAuthStore from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

export default function PostForm({
    initialValues = {},
    onSubmit,
    submitLabel = 'Submit',
    isSubmitting = false
}) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    // 이미지 업로드 상태
    const [uploading, setUploading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialValues.thumbnail || null);
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: formSubmitting },
    } = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: initialValues.title || '',
            content: initialValues.content || '',
            thumbnail: initialValues.thumbnail || '',
        },
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            // Cookie 인증 사용 (Token Header 불필요)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/upload`, {
                method: 'POST',
                credentials: 'include', // 쿠키 전송 필수
                // headers: { 'Content-Type': 'multipart/form-data' }, // fetch가 자동으로 설정함 (boundary 포함)
                body: formData,
            });

            if (res.status === 401) {
                alert('세션이 만료되었습니다. 다시 로그인해주세요.');
                router.push('/login');
                return;
            }

            const data = await res.json();
            const uploadedUrl = data.data?.url || data.url;
            setThumbnailUrl(uploadedUrl);
        } catch (err) {
            console.error(err);
            alert('이미지 업로드 실패');
        } finally {
            setUploading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeThumbnail = () => {
        setThumbnailUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onFormSubmit = (data) => {
        onSubmit({
            ...data,
            thumbnail: thumbnailUrl || null
        });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700/50">
            <div className="space-y-6">
                {/* Thumbnail Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Thumbnail Image
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    {thumbnailUrl ? (
                        <div className="relative group">
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}${thumbnailUrl}`}
                                alt="Thumbnail"
                                className="w-full h-auto max-h-[500px] object-contain rounded-lg border border-gray-600 bg-black/50"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-lg">
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Change
                                </button>
                                <button
                                    type="button"
                                    onClick={removeThumbnail}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            disabled={uploading}
                            className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-colors"
                        >
                            {uploading ? (
                                <span>Uploading...</span>
                            ) : (
                                <>
                                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Click to upload thumbnail</span>
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title')}
                        className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.title ? 'border-red-500' : 'border-gray-600'
                            }`}
                        placeholder="Enter post title"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        {...register('content')}
                        rows={12}
                        className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none ${errors.content ? 'border-red-500' : 'border-gray-600'
                            }`}
                        placeholder="Write your content here..."
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-400">{errors.content.message}</p>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={formSubmitting || isSubmitting}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/50 transition-all disabled:opacity-50"
                    >
                        {formSubmitting || isSubmitting ? 'Processing...' : submitLabel}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
