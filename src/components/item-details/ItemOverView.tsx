import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { HiOutlineTag, HiOutlineClock } from 'react-icons/hi2';

interface ItemOverviewProps {
    title: string;
    category: string;
    address: string;
    conditionYears: string;
    purchaseDate: string;
    isAvailable: boolean;
    formattedDate: string;
}

export const ItemOverview = ({
    title,
    category,
    address,
    conditionYears,
    purchaseDate,
    isAvailable,
    formattedDate,
}: ItemOverviewProps) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                        <HiOutlineTag className="h-3.5 w-3.5" />
                        {category}
                    </span>

                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${isAvailable
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400'
                            }`}
                    >
                        {isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 capitalize">
                    {title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                        <HiLocationMarker className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        {address}
                    </span>

                    <span className="flex items-center gap-2">
                        <HiOutlineClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Posted on {formattedDate}
                    </span>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-blue-100 bg-blue-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800">
                    <h3 className="text-sm font-bold tracking-wide text-slate-900 dark:text-slate-100">
                        Item Specifications
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Condition Year / Release
                        </label>
                        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                            {conditionYears}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Purchase Date
                        </label>
                        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                            {purchaseDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};