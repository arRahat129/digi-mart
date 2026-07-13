import React from 'react';
import Link from 'next/link';
import { RelatedItem } from '@/lib/api/sell-item';
import Image from 'next/image';

interface RelatedAdvertsProps {
    items: RelatedItem[] | undefined;
    isLoading?: boolean;
}

export const RelatedAdverts = ({ items, isLoading = false }: RelatedAdvertsProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-xl p-3 space-y-4 animate-pulse">
                        <div className="w-full h-44 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                            <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-12 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v4.5A2.25 2.25 0 0 0 2.25 13.5Z" />
                    </svg>
                </div>
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">No matching alternatives found</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mt-1">
                    There are currently no other listed marketplace matches matching this specific item criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => {
                const itemId = typeof item._id === 'object' && item._id !== null && '$oid' in item._id
                    ? item._id.$oid
                    : (item._id as string);

                return (
                    <Link
                        href={`/items/${itemId}`}
                        key={itemId}
                        title={`Click to See Details of ${item?.title}`}
                        className="group bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-xl overflow-hidden p-3 space-y-3 hover:shadow-md transition-all duration-200"
                    >
                        <div className="w-full h-44 bg-zinc-100 dark:bg-zinc-950 rounded-lg overflow-hidden relative">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                sizes="(max-w-640px) 100vw, (max-w-768px) 50vw, 33vw"
                                priority={false}
                                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {item.title}
                                </h3>
                                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50 shrink-0">
                                    ${item.price}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 min-h-8">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};