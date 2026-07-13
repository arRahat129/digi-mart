'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const CATEGORIES = [
    { label: 'All Categories', value: 'all' },
    { label: 'Electronics & Gadgets', value: 'electronics' },
    { label: 'Home Appliances', value: 'appliances' },
    { label: 'Furniture & Decor', value: 'furniture' },
    { label: 'Clothing & Fashion', value: 'fashion' },
    { label: 'Books & Education', value: 'books' },
    { label: 'Sports & Outdoors', value: 'sports' },
    { label: 'Vehicles & Parts', value: 'vehicles' }
];

const SORT_OPTIONS = [
    { label: 'Latest Added', value: 'date-desc' },
    { label: 'Oldest Added', value: 'date-asc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Condition: Newer', value: 'condition-asc' },
    { label: 'Condition: Older', value: 'condition-desc' }
];

export default function FilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentSearch = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || 'all';
    const currentSort = `${searchParams.get('sortBy') || 'date'}-${searchParams.get('sortOrder') || 'desc'}`;

    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1'); // Reset pagination back to page 1 on filter alteration

        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const handleSortChange = (combinedValue: string) => {
        const [sortBy, sortOrder] = combinedValue.split('-');
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        params.set('sortBy', sortBy);
        params.set('sortOrder', sortOrder);

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div className={`w-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-4 rounded-2xl shadow-xs transition-opacity ${isPending ? 'opacity-70' : 'opacity-100'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Text Search Input field */}
                <div className="relative md:col-span-2">
                    <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <input
                        type="text"
                        defaultValue={currentSearch}
                        placeholder="Search items by name or keywords..."
                        onChange={(e) => {
                            // Debouncing target event or updating via simple layout parameters
                            const val = e.target.value;
                            const timer = setTimeout(() => updateQueryParams('search', val), 400);
                            return () => clearTimeout(timer);
                        }}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-[#244D3F]"
                    />
                </div>

                {/* Category Dropdown Selection */}
                <div>
                    <select
                        value={currentCategory}
                        onChange={(e) => updateQueryParams('category', e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-[#244D3F]"
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>

                {/* Sort Criteria Selection */}
                <div>
                    <select
                        value={currentSort}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-[#244D3F]"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}