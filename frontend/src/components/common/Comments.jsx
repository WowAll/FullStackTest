'use client';

import { useComments, useCreateComment, useUpdateComment, useDeleteComment } from '@/hooks/useComments';
import { useCurrentUser } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Comments({ boardId }) {
    const { data: comments, isLoading } = useComments(boardId);
    const createComment = useCreateComment();
    const updateComment = useUpdateComment();
    const deleteComment = useDeleteComment();
    const currentUser = useCurrentUser();

    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await createComment.mutateAsync({ boardId, content: newComment });
            setNewComment('');
        } catch (err) {
            alert('Failed to create comment');
        }
    };

    const handleUpdate = async (id) => {
        if (!editContent.trim()) return;

        try {
            await updateComment.mutateAsync({ id, content: editContent, boardId });
            setEditingId(null);
            setEditContent('');
        } catch (err) {
            alert('Failed to update comment');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this comment?')) return;

        try {
            await deleteComment.mutateAsync({ id, boardId });
        } catch (err) {
            alert('Failed to delete comment');
        }
    };

    const startEdit = (comment) => {
        setEditingId(comment.id);
        setEditContent(comment.content);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditContent('');
    };

    return (
        <div className="mt-8 border-t border-gray-700 pt-8">
            <h3 className="text-xl font-semibold text-white mb-6">
                Comments {comments && `(${comments.length})`}
            </h3>

            {/* Create Comment Form - 로그인 시에만 표시 */}
            {currentUser ? (
                <form onSubmit={handleCreate} className="mb-6">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={createComment.isPending || !newComment.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/50 transition-all disabled:opacity-50"
                        >
                            {createComment.isPending ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mb-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg text-center">
                    <p className="text-gray-400">
                        <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign in</a>
                        {' '}to write a comment
                    </p>
                </div>
            )}

            {/* Comments List */}
            {isLoading ? (
                <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            ) : comments && comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                            {editingId === comment.id ? (
                                // Edit Mode
                                <div>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                    />
                                    <div className="mt-2 flex justify-end space-x-2">
                                        <button
                                            onClick={cancelEdit}
                                            className="px-4 py-1 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleUpdate(comment.id)}
                                            disabled={updateComment.isPending}
                                            className="px-4 py-1 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded transition disabled:opacity-50"
                                        >
                                            {updateComment.isPending ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <>
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <span className="font-medium text-white">{comment.writer.name}</span>
                                            <span className="ml-2 text-xs text-gray-500">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        {currentUser && currentUser.id === comment.writerId && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => startEdit(comment)}
                                                    className="text-xs text-gray-400 hover:text-white transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(comment.id)}
                                                    disabled={deleteComment.isPending}
                                                    className="text-xs text-red-400 hover:text-red-300 transition disabled:opacity-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
}
