'use client';

import React, { useState } from 'react';
import {
    Input,
    TextArea,
    Select,
    ListBox,
    Button,
    Card,
    TextField,
    Label,
    InputGroup
} from '@heroui/react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import {
    FiPackage,
    FiTag,
    FiDollarSign,
    FiClock,
    FiCalendar,
    FiMessageSquare,
    FiUploadCloud,
    FiLink,
    FiPhone,
    FiX,
    FiMapPin
} from 'react-icons/fi';
import {
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaTwitter
} from 'react-icons/fa';
import { createSellPost } from '@/lib/actions/sell-item';

interface FormData {
    title: string;
    category: string;
    description: string;
    price: string;
    conditionYears: string;
    purchaseDate: string;
    imageUrl: string;
    contactMethod: 'whatsapp' | 'facebook' | 'instagram' | 'x';
    contactDetails: string;
    sellerMessage: string;
    address: string;
    userId: string;
    userName: string;
    userImage: string;
    userRole: string;
}

export interface SellItemFormProps {
    user: {
        _id: string;
        name?: string;
        email?: string;
        image?: string;
        role?: string;
    };
}

const SellItemForm: React.FC<SellItemFormProps> = ({ user }) => {
    // console.log(user);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        category: '',
        description: '',
        price: '',
        conditionYears: '',
        purchaseDate: '',
        imageUrl: '',
        contactMethod: 'whatsapp',
        contactDetails: '',
        sellerMessage: '',
        address: '',
        userId: user?._id || '',
        userName: user?.name || '',
        userImage: user?.image || '',
        userRole: user?.role || 'user',
    });

    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>(" ");

    const categories = [
        { label: 'Electronics & Gadgets', value: 'electronics' },
        { label: 'Home Appliances', value: 'appliances' },
        { label: 'Furniture & Decor', value: 'furniture' },
        { label: 'Clothing & Fashion', value: 'fashion' },
        { label: 'Books & Education', value: 'books' },
        { label: 'Sports & Outdoors', value: 'sports' },
        { label: 'Vehicles & Parts', value: 'vehicles' }
    ];

    const contactMethods = [
        { label: 'WhatsApp', value: 'whatsapp', icon: <FaWhatsapp className="text-emerald-500" /> },
        { label: 'Facebook', value: 'facebook', icon: <FaFacebook className="text-blue-600" /> },
        { label: 'Instagram', value: 'instagram', icon: <FaInstagram className="text-pink-500" /> },
        { label: 'X (Twitter)', value: 'x', icon: <FaTwitter className="text-slate-800 dark:text-slate-200" /> },
    ];

    const handleInputChange = (key: keyof FormData, value: string) => {
        if (key === 'contactDetails' && formData.contactMethod === 'whatsapp') {
            const sanitizedNumeric = value.replace(/\D/g, '');
            if (sanitizedNumeric.length > 11) return;
            setFormData((prev) => ({ ...prev, contactDetails: sanitizedNumeric }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [key]: value,
            ...(key === 'contactMethod' ? { contactDetails: '' } : {})
        }));
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

    const handleRemoveImage = () => {
        handleInputChange('imageUrl', '');
        const fileInput = document.getElementById('product-image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.title.trim()) {
            setError("Product title is required.");
            return;
        }

        let processedContactDetails = formData.contactDetails.trim();

        if (formData.contactMethod === 'whatsapp') {
            const numLength = processedContactDetails.length;
            if (numLength === 11) {
                if (!processedContactDetails.startsWith('0')) {
                    setError("Invalid Bangladeshi number sequence. 11-digit entries must begin with a 0.");
                    toast.error("Invalid phone format");
                    return;
                }
                processedContactDetails = processedContactDetails.substring(1);
            } else if (numLength === 10) {
                if (processedContactDetails.startsWith('0')) {
                    setError("Invalid Bangladeshi number sequence. 10-digit entries cannot begin with a 0.");
                    toast.error("Invalid phone format");
                    return;
                }
            } else {
                setError("Phone number must contain exactly 10 or 11 numeric digits.");
                toast.error("Invalid phone length");
                return;
            }
            processedContactDetails = `+880${processedContactDetails}`;
        } else {
            const socialPatterns: Record<'facebook' | 'instagram' | 'x', RegExp> = {
                facebook: /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/[a-zA-Z0-9._-]+\/?$/,
                instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
                x: /^(https?:\/\/)?(www\.)?(x|twitter)\.com\/[a-zA-Z0-9._-]+\/?$/
            };

            const selectedPattern = socialPatterns[formData.contactMethod];
            if (!selectedPattern.test(processedContactDetails)) {
                setError(`Please provide a valid, complete link structural format for ${formData.contactMethod.toUpperCase()}.`);
                toast.error(`Invalid ${formData.contactMethod.toUpperCase()} link format`);
                return;
            }
        }

        const finalSubmissionData = {
            ...formData,
            contactDetails: processedContactDetails,
            sellerMessage: formData.sellerMessage.trim() || 'Contact me',
            address: formData.address.trim(),
            status: 'pending',
            availability: 'available'
        };

        setIsSubmitting(true);

        try {
            const response = await createSellPost(finalSubmissionData);

            if (response.success) {
                toast.success(response.message || "Listing published successfully!");
                handleRemoveImage();
                setFormData({
                    title: '', category: '', description: '', price: '',
                    conditionYears: '', purchaseDate: '', imageUrl: '',
                    contactMethod: 'whatsapp', contactDetails: '', sellerMessage: '',
                    address: '',
                    userId: user._id || '',
                    userName: user.name || '',
                    userImage: user.image || '',
                    userRole: user.role || 'user'
                });
            } else {
                setError(response.message || "Failed to publish listing.");
                toast.error("Submission failed");
            }
        } catch (submissionError) {
            console.error(submissionError);
            setError("An unexpected network error occurred while submitting your listing.");
            toast.error("Network error during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const labelStyles = "text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block";
    const inputStyles = "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm outline-none hover:border-slate-400 dark:hover:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500 transition-colors";
    const groupInputStyles = "w-full bg-transparent px-3 py-2.5 text-sm outline-none";
    const selectTriggerStyles = "flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm text-left hover:border-slate-400 dark:hover:border-slate-600 focus:border-blue-500 transition-colors cursor-pointer";

    return (
        <Card className="border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl rounded-3xl p-6 sm:p-10">
            {error.trim() && (
                <div className="text-xs font-semibold p-3 mb-6 rounded-xl bg-red-50 text-red-600 border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Details */}
                <div className="space-y-4">
                    <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <FiPackage className="text-blue-500" /> Basic Details
                    </h3>

                    <TextField isRequired>
                        <Label className={labelStyles}>Product Title / Name</Label>
                        <Input
                            type="text"
                            placeholder="e.g., Sony PlayStation 5, Microwave Oven"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className={inputStyles}
                        />
                    </TextField>

                    <div className="flex flex-col">
                        <Label className={labelStyles}>Category Type *</Label>
                        <Select
                            placeholder="Select item type"
                            value={formData.category || undefined}
                            onChange={(val) => handleInputChange('category', val ? String(val) : '')}
                        >
                            <Select.Trigger className={selectTriggerStyles}>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl shadow-xl p-1">
                                <ListBox>
                                    {categories.map((cat) => (
                                        <ListBox.Item
                                            key={cat.value}
                                            id={cat.value}
                                            textValue={cat.label}
                                            className="flex items-center px-3 py-2 text-sm rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
                                        >
                                            {cat.label}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                    <TextField isRequired>
                        <Label className={labelStyles}>Pickup Address</Label>
                        <InputGroup className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 px-3 transition-colors">
                            <InputGroup.Prefix><FiMapPin className="text-slate-400 w-4 h-4" /></InputGroup.Prefix>
                            <InputGroup.Input
                                type="text"
                                placeholder="e.g., House 42, Road 12, Dhanmondi, Dhaka"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className={groupInputStyles}
                            />
                        </InputGroup>
                    </TextField>
                </div>

                {/* Valuation & History */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <FiTag className="text-blue-500" /> Valuation & History
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextField isRequired>
                            <Label className={labelStyles}>Price</Label>
                            <InputGroup className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 px-3 transition-colors">
                                <InputGroup.Prefix><FiDollarSign className="text-slate-400 w-4 h-4" /></InputGroup.Prefix>
                                <InputGroup.Input
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className={groupInputStyles}
                                />
                            </InputGroup>
                        </TextField>

                        <TextField>
                            <Label className={labelStyles}>Years Used</Label>
                            <InputGroup className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 px-3 transition-colors">
                                <InputGroup.Prefix><FiClock className="text-slate-400 w-4 h-4" /></InputGroup.Prefix>
                                <InputGroup.Input
                                    type="number"
                                    placeholder="e.g., 2"
                                    value={formData.conditionYears}
                                    onChange={(e) => handleInputChange('conditionYears', e.target.value)}
                                    className={groupInputStyles}
                                />
                            </InputGroup>
                        </TextField>

                        <TextField>
                            <Label className={labelStyles}>Purchase Date</Label>
                            <InputGroup className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 px-3 transition-colors">
                                <InputGroup.Prefix><FiCalendar className="text-slate-400 w-4 h-4" /></InputGroup.Prefix>
                                <InputGroup.Input
                                    type="date"
                                    value={formData.purchaseDate}
                                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                                    className={groupInputStyles}
                                />
                            </InputGroup>
                        </TextField>
                    </div>
                </div>

                {/* Specifications & Images */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <FiUploadCloud className="text-blue-500" /> Specifications & Images
                    </h3>

                    <TextField isRequired>
                        <Label className={labelStyles}>Product Description</Label>
                        <TextArea
                            placeholder="Provide comprehensive specifications, operational status, flaws etc."
                            rows={3}
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className={`${inputStyles} resize-none`}
                        />
                    </TextField>

                    <div className="flex flex-col gap-1.5">
                        <span className={labelStyles}>Product Image</span>
                        {formData.imageUrl ? (
                            <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                                    <Image
                                        src={formData.imageUrl}
                                        alt="Product Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate w-full">Image uploaded successfully</span>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleRemoveImage}
                                        className="px-2 h-7 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-red-600 dark:text-red-400 border-none min-w-0 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    >
                                        <FiX className="w-3.5 h-3.5" />
                                        <span>Remove Image</span>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all text-center">
                                <FiUploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                                <span className="text-xs font-semibold">{isUploading ? "Uploading to ImgBB..." : "Click to upload product image"}</span>
                                <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG up to 5MB</span>
                                <input
                                    id="product-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Contact Configuration */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <FiMessageSquare className="text-blue-500" /> Contact Configuration
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <Label className={labelStyles}>Preferred Platform *</Label>
                            <Select
                                value={formData.contactMethod}
                                onChange={(val) => handleInputChange('contactMethod', val ? (String(val) as FormData['contactMethod']) : 'whatsapp')}
                            >
                                <Select.Trigger className={selectTriggerStyles}>
                                    <Select.Value className={'flex items-center gap-2'} />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl shadow-xl p-1">
                                    <ListBox>
                                        {contactMethods.map((method) => (
                                            <ListBox.Item
                                                key={method.value}
                                                id={method.value}
                                                textValue={method.label}
                                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
                                            >
                                                {method.icon}
                                                <span>{method.label}</span>
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <TextField isRequired>
                            <Label className={labelStyles}>
                                {formData.contactMethod === 'whatsapp' ? 'WhatsApp Number' : `${formData.contactMethod.toUpperCase()} Profile Link`}
                            </Label>
                            <InputGroup className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 px-3 transition-colors">
                                <InputGroup.Prefix>
                                    {formData.contactMethod === 'whatsapp' ? (
                                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-semibold text-sm select-none border-r border-slate-200 dark:border-slate-800 pr-2">
                                            <FiPhone className="w-3.5 h-3.5" />
                                            <span>+880</span>
                                        </div>
                                    ) : (
                                        <FiLink className="text-slate-400 w-4 h-4" />
                                    )}
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    type={formData.contactMethod === 'whatsapp' ? 'tel' : 'url'}
                                    placeholder={formData.contactMethod === 'whatsapp' ? '1XXXXXXXXX' : `https://${formData.contactMethod}.com/username`}
                                    value={formData.contactDetails}
                                    onChange={(e) => handleInputChange('contactDetails', e.target.value)}
                                    className={groupInputStyles}
                                />
                            </InputGroup>
                        </TextField>
                    </div>

                    <TextField>
                        <Label className={labelStyles}>My Message (Optional)</Label>
                        <TextArea
                            placeholder="Custom directions (defaults to 'Contact me' if left blank)"
                            rows={2}
                            value={formData.sellerMessage}
                            onChange={(e) => handleInputChange('sellerMessage', e.target.value)}
                            className={`${inputStyles} resize-none`}
                        />
                    </TextField>
                </div>

                {/* Form Actions */}
                <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <Button
                        type="button"
                        variant="secondary"
                        className="rounded-xl px-6 font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => {
                            handleRemoveImage();
                            setFormData({
                                title: '', category: '', description: '', price: '',
                                conditionYears: '', purchaseDate: '', imageUrl: '',
                                contactMethod: 'whatsapp', contactDetails: '', sellerMessage: '',
                                address: '',
                                userId: user._id || '',
                                userName: user.name || '',
                                userImage: user.image || '',
                                userRole: user.role || 'user'
                            });
                        }}
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        isDisabled={isUploading || isSubmitting}
                        className="bg-blue-600 text-white font-bold rounded-xl px-8 shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-all border-none"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Listing"}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default SellItemForm;