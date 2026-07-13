'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export default function AllItemsPagination({ currentPage, totalPages, totalItems }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200/60 dark:border-zinc-800/80 pt-6 gap-4">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Showing page <strong className="text-zinc-900 dark:text-white font-semibold">{currentPage}</strong> of <strong className="text-zinc-900 dark:text-white font-semibold">{totalPages}</strong> ({totalItems} total products)
            </span>
            <div className="flex items-center gap-2">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-950"
                >
                    Previous
                </button>
                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-950"
                >
                    Next
                </button>
            </div>
        </div>
    );
}