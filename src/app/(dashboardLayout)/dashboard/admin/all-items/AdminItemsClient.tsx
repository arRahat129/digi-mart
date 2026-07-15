'use client';

import React, { useState } from 'react';
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
    const [items, setItems] = useState<Item[]>(initialData.data);
    const [totalPages] = useState(initialData.meta.totalPages);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [featuredTarget, setFeaturedTarget] = useState<Item | null>(null);


    const handleDelete = async () => {
        if (deleteTarget) {
            try {
                await actionDeleteProduct(deleteTarget);
                setDeleteTarget(null);
                toast.success("Item deleted successfully"); // Success toast
                router.refresh();
            } catch (error) {
                toast.error(`Failed to delete item. ${error}`); // Error toast
            }
        }
    };

    const handleToggle = async () => {
        if (featuredTarget) {
            try {
                await actionToggleFeaturedProduct(featuredTarget._id, featuredTarget);
                setFeaturedTarget(null);
                toast.success("Featured status updated"); // Success toast
                router.refresh();
            } catch (error) {
                toast.error(`Failed to delete item. ${error}`);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">All Items</h2>

            {items.length === 0 ? (
                /* EMPTY STATE DESIGN */
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-full mb-4">
                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
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

                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} onClick={() => router.push(`?page=${page}`)} className={`px-4 py-2 border rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 dark:text-white'}`}>
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