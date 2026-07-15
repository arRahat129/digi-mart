import Link from 'next/link';
import React from 'react';
import { HiArrowLeft, HiOutlineFaceFrown } from 'react-icons/hi2';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 transition-colors">

            <div className="max-w-xl w-full rounded-3xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-10 text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                    <HiOutlineFaceFrown className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>

                <p className="mt-8 text-7xl font-black text-blue-600">
                    404
                </p>

                <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    Page Not Found
                </h1>

                <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
                    Sorry, the page you are looking for does not exist, was moved,
                    or may have been removed.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700"
                >
                    <HiArrowLeft className="h-5 w-5" />
                    Return Home
                </Link>

            </div>

        </div>
    );
}