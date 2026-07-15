import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="flex flex-col items-center">

                <div className="relative">
                    <div className="h-20 w-20 rounded-full border-4 border-blue-200 dark:border-slate-700" />
                    <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
                </div>

                <h2 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white">
                    Loading...
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Please wait while we prepare everything.
                </p>

                <div className="mt-8 flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]" />
                </div>

            </div>
        </div>
    );
}