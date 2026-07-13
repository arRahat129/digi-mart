import React from 'react';

export default function SkeletonLoader() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
                <div
                    key={idx}
                    className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 h-105 w-full flex flex-col overflow-hidden animate-pulse"
                >
                    <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-800" />
                    <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="h-3 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                            <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                            <div className="space-y-1.5">
                                <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                                <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md pt-2 border-t border-zinc-100 dark:border-zinc-800" />
                            <div className="h-9 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}