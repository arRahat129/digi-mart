'use client';

import { useState, useRef } from 'react';
import { FiX, FiCheck, FiUploadCloud } from 'react-icons/fi';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

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

export default function EditModal({ isOpen, onClose, item, onSave }: EditModalProps) {
    const [formData, setFormData] = useState<ListingItem>(item);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleInputChange = (key: keyof ListingItem, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("File size exceeds 5MB limit");
            toast.error("File size exceeds 5MB limit");
            return;
        }

        setIsUploading(true);
        setError("");

        const dataPayload = new globalThis.FormData();
        dataPayload.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: dataPayload
            });
            const data = await response.json();

            if (data.success) {
                handleInputChange('imageUrl', data.data.url);
                toast.success("Product image uploaded successfully");
            } else {
                setError("Upload failed. Please try again.");
                toast.error("Upload failed");
            }
        } catch (uploadError) {
            console.error(uploadError);
            setError("Network error occurred during image upload.");
            toast.error("Network error during upload");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Edit Listing</h3>
                    <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                        <FiX className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    </button>
                </div>
                <div className="max-h-[60vh] space-y-5 overflow-y-auto pr-2">
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Product Image</label>
                        <div onClick={() => fileInputRef.current?.click()} className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                            {formData.imageUrl ? (
                                <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                            ) : (
                                <FiUploadCloud className="w-8 h-8 text-slate-400" />
                            )}
                            {isUploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">Uploading...</div>}
                        </div>
                        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Product Title</label>
                        <input type="text" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Category</label>
                        <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                            <option value="">Select a category</option>
                            {CATEGORIES.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Price</label>
                            <input type="number" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Years Used</label>
                            <input type="number" value={formData.conditionYears} onChange={(e) => handleInputChange('conditionYears', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Purchase Date</label>
                        <input type="date" value={formData.purchaseDate} onChange={(e) => handleInputChange('purchaseDate', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Contact Method</label>
                        <select value={formData.contactMethod} onChange={(e) => handleInputChange('contactMethod', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                            <option value="whatsapp">WhatsApp</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Contact Details</label>
                        <input type="text" value={formData.contactDetails} onChange={(e) => handleInputChange('contactDetails', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Seller Message</label>
                        <textarea rows={2} value={formData.sellerMessage} onChange={(e) => handleInputChange('sellerMessage', e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
                    <button onClick={onClose} className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</button>
                    <button onClick={() => onSave(formData)} className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">
                        <FiCheck className="h-4 w-4" /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}