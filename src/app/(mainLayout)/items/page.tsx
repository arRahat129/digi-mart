import AllItemsPagination from '@/components/all-items/AllItemsPagination';
import FilterPanel from '@/components/all-items/FilterPanel';
import ItemCard, { ListingItem } from '@/components/all-items/ItemCard';
import SkeletonLoader from '@/components/all-items/SkeletonLoader';
import { getAllSellItems, MarketSortBy, MarketSortOrder } from '@/lib/api/sell-item';
import React, { Suspense } from 'react';

interface SearchParams {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
}

interface AllItemsPageProps {
    searchParams: Promise<SearchParams>;
}

export default async function AllItemsPage({ searchParams }: AllItemsPageProps) {
    const sParams = await searchParams;

    const search = sParams.search || "";
    const category = sParams.category || "";
    const minPrice = sParams.minPrice || "";
    const maxPrice = sParams.maxPrice || "";
    const sortBy = (sParams.sortBy || "date") as MarketSortBy;
    const sortOrder = (sParams.sortOrder || "desc") as MarketSortOrder;
    const page = parseInt(sParams.page || "1") || 1;
    const limit = 12;

    let responseData = null;
    try {
        responseData = await getAllSellItems<ListingItem[]>({
            search,
            category,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            page,
            limit
        });
    } catch (error) {
        console.error("Failed to load marketplace data:", error);
    }

    const items: ListingItem[] = responseData?.data || [];
    const totalItems = responseData?.meta?.totalItems || 0;
    const totalPages = responseData?.meta?.totalPages || 1;
    return (
        <div className="w-full min-h-screen py-8 px-4 max-w-7xl mx-auto space-y-8 pt-28 pb-16">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Explore Marketplace Items
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Discover quality hardware, domestic appliances, and components listed across our developer community ecosystem.
                </p>
            </div>

            <Suspense fallback={<div className="h-14 w-full border border-zinc-200/60 dark:border-zinc-800/80 animate-pulse rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30" />}>
                <FilterPanel />
            </Suspense>

            {/* Content Results and Grid */}
            <Suspense key={JSON.stringify(sParams)} fallback={<SkeletonLoader />}>
                {items.length === 0 ? (
                    <div className="w-full text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">No marketplace items found matching the selected filters.</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* 4 Cards per row on desktop layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <ItemCard key={item._id} item={item} />
                            ))}
                        </div>

                        {/* Pagination Bar */}
                        {totalPages > 1 && (
                            <AllItemsPagination
                                currentPage={page}
                                totalPages={totalPages}
                                totalItems={totalItems}
                            />
                        )}
                    </div>
                )}
            </Suspense>
        </div>
    );
}