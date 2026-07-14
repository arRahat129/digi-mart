'use client';

import DeleteDialog from '@/components/modals/DeleteDialog';
import EditModal from '@/components/modals/EditModal';
import { deleteItemAction, updateItemAction } from '@/lib/actions/sell-item';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { HiOutlineChevronDown, HiOutlineInbox } from 'react-icons/hi2';

interface ListingItem {
    _id: string;
    title: string;
    category: string;
    description: string;
    price: string;
    conditionYears: string;
    purchaseDate: string;
    imageUrl: string;
    contactMethod: string;
    contactDetails: string;
    sellerMessage: string;
    userId: string;
    userName: string;
    userImage: string;
    userRole: string;
    created_at: string;
    status?: 'approved' | 'pending' | 'rejected';
    isAvailable?: boolean;
}

interface MyListingsDisplayProps {
    items: ListingItem[];
}

const MyListingsDisplay: React.FC<MyListingsDisplayProps> = ({ items }) => {
    const [listings, setListings] = useState<ListingItem[]>(items);
    const [selectedItem, setSelectedItem] = useState<ListingItem | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest('.dropdown-container')) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDelete = async (id: string) => {
        setListings((prev) => prev.filter((item) => item._id !== id));
        setIsDeleteOpen(false);

        try {
            await deleteItemAction(id);
        } catch (error) {
            setListings(items);
            console.error(error);
        }
    };

    const handleSave = async (updatedItem: ListingItem) => {
        setListings((prev) =>
            prev.map((item) =>
                item._id === updatedItem._id ? updatedItem : item
            )
        );

        setIsEditOpen(false);

        try {
            await updateItemAction(updatedItem._id, updatedItem);
        } catch (error) {
            console.error(error);
        }
    };

    if (!items || items.length === 0) {
        return (
            <div className="relative overflow-hidden text-center py-20 px-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs max-w-2xl mx-auto mt-8">
                <div className="absolute inset-0 bg-[radial-gradient(#244d3f_1px,transparent_1px)] bg-size-[16px_16px] opacity-[0.03] dark:opacity-[0.05]" />
                <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 mb-6">
                        <HiOutlineInbox className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Your Shop is Empty</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-8">You have not posted any marketplace listings yet.</p>
                    <Link href="/dashboard/user/sell-item" className="inline-flex items-center gap-2 rounded-xl bg-[#244D3F] px-6 py-3 text-white font-semibold hover:bg-[#1a382e]">
                        <HiPlus className="w-4 h-4" />
                        List Your First Product
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusDot = (status: string = 'pending') => {
        switch (status.toLowerCase()) {
            case 'approved': return <span className="h-2 w-2 rounded-full bg-emerald-500" />;
            case 'rejected': return <span className="h-2 w-2 rounded-full bg-rose-500" />;
            default: return <span className="h-2 w-2 rounded-full bg-amber-500" />;
        }
    };

    const ActionDropdown = ({ item }: { item: ListingItem }) => (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-blue-100 bg-white p-1.5 shadow-xl dark:border-blue-900/40 dark:bg-slate-900">
            <button
                onClick={() => {
                    setSelectedItem(item);
                    setOpenDropdownId(null);
                    setIsEditOpen(true);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
                <HiOutlinePencil className="w-4 h-4" />
                Edit Listing
            </button>
            <button
                onClick={() => {
                    setSelectedItem(item);
                    setOpenDropdownId(null);
                    setIsDeleteOpen(true);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
                <HiOutlineTrash className="w-4 h-4" />
                Delete Listing
            </button>
        </div>
    );

    return (
        <div className="w-full pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
                {listings.map((item) => (
                    <div key={item._id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm flex flex-col">
                        <div className="relative w-full aspect-video bg-zinc-100 dark:bg-zinc-950 rounded-t-2xl overflow-hidden">
                            <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width:768px)100vw,50vw" className="object-cover" />
                            <div className="absolute top-3 left-3 bg-zinc-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-2">
                                {getStatusDot(item.status)}
                                <span>${parseFloat(item.price).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#244D3F] dark:text-emerald-400">{item.category}</span>
                                <h3 className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100 capitalize line-clamp-1">{item.title}</h3>
                            </div>
                            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 mt-5 pt-4">
                                <span className="text-xs text-zinc-400 dark:text-zinc-500">Age: {item.conditionYears} {parseInt(item.conditionYears) === 1 ? 'year' : 'years'}</span>
                                <div className="flex items-center gap-1">
                                    <Link href={`/items/${item._id}`} className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                        <HiOutlineEye className="w-5 h-5" />
                                    </Link>
                                    <div className="relative dropdown-container">
                                        <button onClick={() => setOpenDropdownId(openDropdownId === item._id ? null : item._id)} className="p-2 rounded-xl border border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                            <HiOutlineChevronDown className="w-4 h-4" />
                                        </button>
                                        {openDropdownId === item._id && <ActionDropdown item={item} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <th className="p-5 text-xs font-bold uppercase text-zinc-500">Status</th>
                            <th className="p-5 text-xs font-bold uppercase text-zinc-500">Product</th>
                            <th className="p-5 text-xs font-bold uppercase text-zinc-500">Category</th>
                            <th className="p-5 text-xs font-bold uppercase text-zinc-500">Price</th>
                            <th className="p-5 text-xs font-bold uppercase text-zinc-500">Condition</th>
                            <th className="p-5 text-xs font-bold uppercase text-zinc-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {listings.map((item) => (
                            <tr key={item._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                                <td className="p-6"><div className="flex justify-center">{getStatusDot(item.status)}</div></td>
                                <td className="p-6 font-bold">{item.title}</td>
                                <td className="p-6"><span className="text-xs font-semibold capitalize bg-zinc-100 px-2.5 py-1 rounded-md">{item.category}</span></td>
                                <td className="p-6 font-bold">${parseFloat(item.price).toFixed(2)}</td>
                                <td className="p-6 text-sm">{item.conditionYears} years</td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/items/${item._id}`} className="p-2 rounded-xl hover:bg-zinc-100"><HiOutlineEye className="w-5 h-5" /></Link>
                                        <div className="relative dropdown-container">
                                            <button onClick={() => setOpenDropdownId(openDropdownId === item._id ? null : item._id)} className="p-2 rounded-xl hover:bg-zinc-100"><HiOutlineChevronDown className="w-4 h-4" /></button>
                                            {openDropdownId === item._id && <ActionDropdown item={item} />}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedItem && (
                <>
                    <EditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} item={selectedItem} onSave={handleSave} />
                    <DeleteDialog isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={() => handleDelete(selectedItem._id)} itemName={selectedItem.title} />
                </>
            )}
        </div>
    );
};
export default MyListingsDisplay;