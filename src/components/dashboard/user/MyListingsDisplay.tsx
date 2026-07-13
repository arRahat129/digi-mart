'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
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
    onStatusToggle?: (id: string, currentAvailability: boolean) => void;
}

const MyListingsDisplay: React.FC<MyListingsDisplayProps> = ({ items, onStatusToggle }) => {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close action dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!items || items.length === 0) {
        return (
            <div className="relative overflow-hidden text-center py-20 px-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs max-w-2xl mx-auto mt-8">
                <div className="absolute inset-0 bg-[radial-gradient(#244d3f_1px,transparent_1px)] bg-size-[16px_16px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

                <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 mb-6 shadow-2xs">
                        <HiOutlineInbox className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        Your Shop is Empty
                    </h3>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2.5 mb-8 leading-relaxed">
                        You have not posted any marketplace listings yet. Turn your unused items into cash by listing them right now!
                    </p>

                    <Link
                        href="/dashboard/user/sell-item"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#244D3F] hover:bg-[#1a382e] active:scale-[0.98] transition-all shadow-md shadow-[#244D3F]/10"
                    >
                        <HiPlus className="w-4 h-4 stroke-3" />
                        <span>List Your First Product</span>
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusDot = (status: string = 'pending') => {
        switch (status.toLowerCase()) {
            case 'approved':
                return <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" title="Approved" />;
            case 'rejected':
                return <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" title="Rejected" />;
            default:
                return <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" title="Pending" />;
        }
    }

    const handleToggleClick = (id: string, currentVal: boolean) => {
        if (onStatusToggle) onStatusToggle(id, currentVal);
        setOpenDropdownId(null);
    }

    // Reusable dropdown menu UI component
    const renderDropdownMenu = (item: ListingItem, available: boolean) => (
        <div className="absolute right-0 bottom-full lg:bottom-auto lg:top-full mb-2 lg:mb-0 lg:mt-2 w-44 bg-white dark:bg-black border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-xl z-50 p-1.5 animate-in fade-in slide-in-from-top-1 duration-100">
            <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 text-left">
                Set Stock Availability
            </div>
            <button
                disabled={available}
                onClick={() => handleToggleClick(item._id, true)}
                className="w-full text-left text-xs font-medium px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors disabled:opacity-50 disabled:bg-zinc-50 dark:disabled:bg-zinc-900/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 disabled:cursor-not-allowed"
            >
                <span>Available</span>
                {available && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            </button>
            <button
                disabled={!available}
                onClick={() => handleToggleClick(item._id, false)}
                className="w-full text-left text-xs font-medium px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors disabled:opacity-50 disabled:bg-zinc-50 dark:disabled:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 disabled:cursor-not-allowed"
            >
                <span>Not Available</span>
                {!available && <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />}
            </button>
        </div>
    );

    return (
        <div className="w-full pb-32"> {/* Added container bottom padding to ensure the last table row dropdown displays nicely */}
            {/* Mobile View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
                {items.map((item) => {
                    const available = item.isAvailable ?? true;
                    const isDropdownOpen = openDropdownId === item._id;
                    return (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm flex flex-col"
                        >
                            <div className="relative w-full aspect-video bg-zinc-100 dark:bg-zinc-950 rounded-t-2xl overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority={false}
                                />
                                <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-2">
                                    {getStatusDot(item.status)}
                                    <span>${parseFloat(item.price).toFixed(2)}</span>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md backdrop-blur-xs ${available
                                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-zinc-500/20 text-zinc-600 dark:text-zinc-400'
                                        }`}>
                                        {available ? 'Available' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#244D3F] dark:text-emerald-400">
                                        {item.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1 capitalize line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 mt-5 pt-4">
                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                        Age: {item.conditionYears} {parseInt(item.conditionYears) === 1 ? 'year' : 'years'}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/items/${item?._id}`}
                                            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[#244D3F] dark:hover:text-emerald-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                                        >
                                            <HiOutlineEye className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => console.log('Edit', item._id)}
                                            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[#244D3F] dark:hover:text-emerald-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                                        >
                                            <HiOutlinePencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => console.log('Delete', item._id)}
                                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                        >
                                            <HiOutlineTrash className="w-5 h-5" />
                                        </button>

                                        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

                                        {/* Added Stock Availability Dropdown to Mobile View */}
                                        <div className="relative" ref={isDropdownOpen ? dropdownRef : null}>
                                            <button
                                                onClick={() => setOpenDropdownId(isDropdownOpen ? null : item._id)}
                                                className={`p-2 rounded-xl border transition-all flex items-center justify-center ${isDropdownOpen
                                                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white'
                                                    : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                                    }`}
                                            >
                                                <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isDropdownOpen && renderDropdownMenu(item, available)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop View */}
            {/* Removed overflow-hidden from the container wrapper so absolute elements can expand outside */}
            <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 rounded-tl-2xl">Status</th>
                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Product</th>
                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Category</th>
                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Price</th>
                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Condition</th>
                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Listed On</th>
                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                        {items.map((item) => {
                            const available = item.isAvailable ?? true;
                            const isDropdownOpen = openDropdownId === item._id;

                            return (
                                <tr
                                    key={item._id}
                                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                                >
                                    <td className="p-6 w-12 text-center">
                                        <div className="flex items-center justify-center">
                                            {getStatusDot(item.status)}
                                        </div>
                                    </td>

                                    <td className="p-6 max-w-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 shrink-0 border border-zinc-200/40 dark:border-zinc-800">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    fill
                                                    sizes="56px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 capitalize line-clamp-1">
                                                        {item.title}
                                                    </h4>
                                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${available
                                                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                                        }`}>
                                                        {available ? 'Available' : 'Unavailable'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-1 mt-0.5">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 capitalize">
                                            {item.category}
                                        </span>
                                    </td>

                                    <td className="p-6 font-bold text-zinc-950 dark:text-white">
                                        ${parseFloat(item.price).toFixed(2)}
                                    </td>

                                    <td className="p-6 text-sm text-zinc-600 dark:text-zinc-400">
                                        {item.conditionYears} {parseInt(item.conditionYears) === 1 ? 'year old' : 'years old'}
                                    </td>

                                    <td className="p-6 text-sm text-zinc-400 dark:text-zinc-500">
                                        {new Date(item.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>

                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/items/${item?._id}`}
                                                className="p-2 text-zinc-400 hover:text-[#244D3F] dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                                            >
                                                <HiOutlineEye className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => console.log('Edit', item._id)}
                                                className="p-2 text-zinc-400 hover:text-[#244D3F] dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                                            >
                                                <HiOutlinePencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => console.log('Delete', item._id)}
                                                className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                            >
                                                <HiOutlineTrash className="w-5 h-5" />
                                            </button>

                                            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

                                            <div className="relative" ref={isDropdownOpen ? dropdownRef : null}>
                                                <button
                                                    onClick={() => setOpenDropdownId(isDropdownOpen ? null : item._id)}
                                                    className={`p-2 rounded-xl border transition-all flex items-center justify-center ${isDropdownOpen
                                                        ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white'
                                                        : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                                        }`}
                                                >
                                                    <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {isDropdownOpen && renderDropdownMenu(item, available)}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyListingsDisplay;