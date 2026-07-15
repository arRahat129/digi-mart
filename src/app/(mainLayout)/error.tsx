'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { HiArrowPath, HiHome, HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 transition-colors">

            <div className="max-w-xl w-full rounded-3xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-10 text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/20">
                    <HiOutlineExclamationTriangle className="h-10 w-10 text-red-500" />
                </div>

                <h1 className="mt-8 text-3xl font-bold text-slate-900 dark:text-white">
                    Something Went Wrong
                </h1>

                <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
                    An unexpected error occurred while loading this page.
                    Please try again or return to the homepage.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        <HiArrowPath className="h-5 w-5" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <HiHome className="h-5 w-5" />
                        Return Home
                    </Link>

                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 rounded-xl bg-slate-100 dark:bg-slate-950 p-4 text-left">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Development Error
                        </p>
                        <pre className="overflow-auto text-xs text-red-500">
                            {error.message}
                        </pre>
                    </div>
                )}

            </div>

        </div>
    );
}