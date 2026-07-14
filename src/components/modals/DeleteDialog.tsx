'use client';

import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi';

interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

export default function DeleteDialog({
    isOpen,
    onClose,
    onConfirm,
    itemName
}: DeleteDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                            <FiAlertTriangle className="h-6 w-6" />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                Delete Listing
                            </h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <FiX className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Are you sure you want to permanently delete{' '}
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                            &quot;{itemName}&quot;
                        </span>
                        ? This action cannot be reversed.
                    </p>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700"
                    >
                        <FiTrash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}