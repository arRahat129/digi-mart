'use client';

import { useEffect, useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

const CATEGORIES = [
    { label: 'Electronics & Gadgets', value: 'electronics' },
    { label: 'Home Appliances', value: 'appliances' },
    { label: 'Furniture & Decor', value: 'furniture' },
    { label: 'Clothing & Fashion', value: 'fashion' },
    { label: 'Books & Education', value: 'books' },
    { label: 'Sports & Outdoors', value: 'sports' },
    { label: 'Vehicles & Parts', value: 'vehicles' }
];

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

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ListingItem;
    onSave: (updatedItem: ListingItem) => void;
}

export default function EditModal({
    isOpen,
    onClose,
    item,
    onSave
}: EditModalProps) {
    const [formData, setFormData] = useState<ListingItem>(item);

    if (!isOpen) return null;

    const handleChange = (key: keyof ListingItem, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Edit Listing
                    </h3>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <FiX className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                <div className="max-h-[60vh] space-y-5 overflow-y-auto pr-2">
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Product Title
                        </label>

                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Category
                        </label>

                        <select
                            value={formData.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                        >
                            <option value="">Select a category</option>

                            {CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Price
                            </label>

                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Years Used
                            </label>

                            <input
                                type="number"
                                value={formData.conditionYears}
                                onChange={(e) => handleChange('conditionYears', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(formData)}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                    >
                        <FiCheck className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}