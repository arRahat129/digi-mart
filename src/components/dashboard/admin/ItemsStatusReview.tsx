'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { actionGetAllItemsForReview, actionUpdateItemStatus } from '@/lib/actions/admin';
import { Item, Meta } from '@/lib/api/admin';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ItemsStatusReview = ({ initialData, initialMeta }: { initialData: Item[], initialMeta: Meta }) => {
    const router = useRouter();
    const [items, setItems] = useState<Item[]>(initialData);
    const [meta, setMeta] = useState<Meta>(initialMeta);
    const [isProcessing, setIsProcessing] = useState(false);

    // Renamed from fetchData to refreshData to match your logic
    const refreshData = async (page: number) => {
        setIsProcessing(true);
        const res = await actionGetAllItemsForReview(page);
        if (res.success) {
            setItems(res.data);
            setMeta(res.meta);
        }
        setIsProcessing(false);
    };

    const handleStatus = async (id: string, status: 'Approved' | 'Rejected') => {
        setIsProcessing(true);
        const loadingToast = toast.loading(`Processing ${status.toLowerCase()}...`);

        try {
            const result = await actionUpdateItemStatus(id, status);

            if (result.success) {
                toast.success(`Item ${status.toLowerCase()} successfully!`, { id: loadingToast });

                await refreshData(meta.currentPage);

                router.refresh();
            } else {
                toast.error(result.message || "Something went wrong", { id: loadingToast });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
            toast.error(errorMessage, { id: loadingToast });
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="p-10 text-center border-2 border-dashed border-blue-200 rounded-xl m-6 bg-blue-50 dark:bg-slate-900">
                <p className="text-blue-800 dark:text-blue-200 font-bold text-xl">No pending items found at the moment!</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
            <h2 className="text-3xl font-extrabold mb-8 text-blue-900 dark:text-blue-400">Manage Submissions</h2>

            {/* Table (LG) */}
            <div className="hidden lg:block overflow-x-auto shadow-2xl rounded-xl border border-blue-100 dark:border-blue-900">
                <table className="w-full text-left bg-white dark:bg-slate-900">
                    <thead className="bg-blue-600 text-white">
                        <tr>{['Item', 'Description', 'Price', 'User', 'Status', 'Actions'].map(h => <th key={h} className="p-4">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} className="border-b dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800 transition">
                                <td className="p-4 font-semibold">{item.title}</td>
                                <td className="p-4 max-w-xs truncate">{item.description}</td>
                                <td className="p-4">${item.price}</td>
                                <td className="p-4 flex items-center gap-2">
                                    <Image src={item.userImage} alt={item.userName} width={32} height={32} className="rounded-full" />
                                    {item.userName}
                                </td>
                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${item.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{item.status}</span></td>
                                <td className="p-4 flex gap-2">
                                    <button disabled={isProcessing} onClick={() => handleStatus(item._id, 'Approved')} className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50">Approve</button>
                                    <button disabled={isProcessing} onClick={() => handleStatus(item._id, 'Rejected')} className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Grid (SM/MD) */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                    <div key={item._id} className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm line-clamp-3 my-2 text-slate-600 dark:text-slate-400">{item.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="font-bold text-blue-600">${item.price}</span>
                            <div className="flex gap-2">
                                <button disabled={isProcessing} onClick={() => handleStatus(item._id, 'Approved')} className="text-green-600 font-bold">Approve</button>
                                <button disabled={isProcessing} onClick={() => handleStatus(item._id, 'Rejected')} className="text-red-600 font-bold">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: meta.totalPages }).map((_, i) => (
                    <button key={i} onClick={() => refreshData(i + 1)} className={`px-4 py-2 rounded ${meta.currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border'}`}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ItemsStatusReview;