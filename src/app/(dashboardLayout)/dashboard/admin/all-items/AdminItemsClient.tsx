'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Item, PaginatedItemsResponse } from '@/lib/api/admin';
import { actionDeleteProduct, actionToggleFeaturedProduct } from '@/lib/actions/admin';
import ItemsTable from './ItemsTable';
import ItemsGrid from './ItemsGrid';
import DeleteAlertDialog from '@/components/modals/DeleteAlertDialog';
import FeaturedConfirmationModal from '@/components/modals/FeaturedConfirmationModal';
import toast from 'react-hot-toast';

interface Props {
    initialData: PaginatedItemsResponse;
    currentPage: number;
}

export default function AdminItemsClient({ initialData, currentPage }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // 1. Direct local overrides for optimistic mutations (delete / toggling)
    const [deletedItemIds, setDeletedItemIds] = useState<string[]>([]);
    const [toggledItems, setToggledItems] = useState<Record<string, boolean>>({});

    // 2. DERIVED STATE: Use incoming prop data directly so pagination changes it immediately!
    const items = (initialData?.data || [])
        .filter(item => !deletedItemIds.includes(item._id))
        .map(item => {
            if (toggledItems[item._id] !== undefined) {
                return { ...item, isFeatured: toggledItems[item._id] };
            }
            return item;
        });

    const meta = initialData?.meta || { totalPages: 1 };

    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [featuredTarget, setFeaturedTarget] = useState<Item | null>(null);

    const handlePageChange = (page: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());

        startTransition(() => {
            // router.push forces the client component to transition to the new server page
            router.push(url.pathname + url.search);
        });
    };

    const handleDelete = async () => {
        if (deleteTarget) {
            try {
                await actionDeleteProduct(deleteTarget);
                setDeleteTarget(null);
                toast.success("Item deleted successfully");

                // Optimistically hide the deleted item on the client side
                setDeletedItemIds(prev => [...prev, deleteTarget]);
                router.refresh();
            } catch (error) {
                toast.error(`Failed to delete item. ${error}`);
            }
        }
    };

    const handleToggle = async () => {
        if (featuredTarget) {
            try {
                await actionToggleFeaturedProduct(featuredTarget._id, featuredTarget);
                const targetId = featuredTarget._id;
                const newFeaturedStatus = !featuredTarget.isFeatured;
                setFeaturedTarget(null);
                toast.success("Featured status updated");

                // Optimistically toggle status on client side
                setToggledItems(prev => ({ ...prev, [targetId]: newFeaturedStatus }));
                router.refresh();
            } catch (error) {
                toast.error(`Failed to update status. ${error}`);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">All Items</h2>

            {/* isPending handles the loading state perfectly on page changes */}
            {isPending && (
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-4 animate-pulse">
                    Loading items...
                </div>
            )}

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-full mb-4">
                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No items found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">There are currently no items available to display.</p>
                </div>
            ) : (
                <>
                    <div className="hidden lg:block">
                        <ItemsTable items={items} onDelete={setDeleteTarget} onToggle={setFeaturedTarget} />
                    </div>
                    <div className="lg:hidden">
                        <ItemsGrid items={items} onDelete={setDeleteTarget} onToggle={setFeaturedTarget} />
                    </div>

                    {meta.totalPages > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    disabled={isPending}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 border rounded font-semibold transition-colors disabled:opacity-50 ${currentPage === page
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            <DeleteAlertDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
            <FeaturedConfirmationModal isOpen={!!featuredTarget} onClose={() => setFeaturedTarget(null)} onConfirm={handleToggle} />
        </div>
    );
}