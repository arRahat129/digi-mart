import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineCalendar, HiOutlineTag } from 'react-icons/hi';
import { HiOutlineClock } from 'react-icons/hi2';

export interface ListingItem {
    _id: string;
    title: string;
    category: string;
    description: string;
    price: string;
    conditionYears: string;
    purchaseDate: string;
    imageUrl: string;
    availability?: 'available' | 'sold' | string;
    created_at: {
        $date: string;
    } | string | Date;
}

export default function ItemCard({ item }: { item: ListingItem }) {
    const isAvailable = item.availability === 'available';

    return (
        <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-xs overflow-hidden flex flex-col h-105 w-full transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-950 overflow-hidden shrink-0">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    priority={false}
                />

                <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-lg z-10">
                    ${parseFloat(item.price).toFixed(2)}
                </div>

                <div className="absolute top-3 right-3 z-10">
                    {isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/95 text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg shadow-sm animate-pulse scale-98">
                            <span className="w-1.5 h-1.5 rounded-full bg-white block animate-ping" />
                            Available
                        </span>
                    ) : (
                        <span className="inline-flex items-center bg-rose-600/95 text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg shadow-sm">
                            Not Available
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <HiOutlineTag className="w-3.5 h-3.5 text-[#244D3F] dark:text-emerald-400" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#244D3F] dark:text-emerald-400">
                            {item.category}
                        </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 capitalize line-clamp-1">
                        {item.title}
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <div className="space-y-3.5 mt-4">
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400 dark:text-zinc-500">
                        <div className="flex items-center gap-1">
                            <HiOutlineClock className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Used: {item.conditionYears} {parseInt(item.conditionYears) === 1 ? 'Year' : 'Years'}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                            <HiOutlineCalendar className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Bought: {item.purchaseDate.split('-')[0]}</span>
                        </div>
                    </div>

                    {isAvailable ? (
                        <Link
                            href={`/items/${item._id}`}
                            className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold text-white bg-[#244D3F] hover:bg-[#1a382e] active:scale-[0.99] transition-all shadow-2xs"
                        >
                            View Details
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/60 cursor-not-allowed border border-zinc-200/40 dark:border-zinc-800"
                        >
                            Unavailable
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}