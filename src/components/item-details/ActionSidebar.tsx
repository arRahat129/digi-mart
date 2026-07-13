import Image from 'next/image';
import React from 'react';
import {
    HiOutlinePhone,
    HiOutlineChatBubbleLeftRight,
    HiOutlineShieldCheck,
    HiOutlineChatBubbleBottomCenterText,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

interface ActionSidebarProps {
    price: string;
    userImage: string;
    userName: string;
    userRole: string;
    contactMethod: string;
    contactDetails: string;
    isAvailable: boolean;
}

export const ActionSidebar = ({
    price,
    userImage,
    userName,
    userRole,
    contactMethod,
    contactDetails,
    isAvailable,
}: ActionSidebarProps) => {
    const getContactHref = () => {
        const cleanDetails = contactDetails.replace(/[@]/g, '').trim();

        switch (contactMethod?.toLowerCase()) {
            case 'whatsapp':
                return `https://wa.me/${cleanDetails}`;
            case 'facebook':
                return `https://facebook.com/${cleanDetails}`;
            case 'instagram':
                return `https://instagram.com/${cleanDetails}`;
            case 'x':
            case 'twitter':
                return `https://x.com/${cleanDetails}`;
            case 'phone':
            default:
                return `sms:${cleanDetails}`;
        }
    };

    const renderContactButton = () => {
        const href = getContactHref();
        const baseClass = "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition duration-200";

        switch (contactMethod?.toLowerCase()) {
            case 'whatsapp':
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClass} bg-[#25D366] hover:bg-[#20ba5a]`}>
                        <FaWhatsapp className="h-5 w-5" />
                        Chat via WhatsApp
                    </a>
                );
            case 'facebook':
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClass} bg-[#1877F2] hover:bg-[#166FE5]`}>
                        <FaFacebook className="h-5 w-5" />
                        Message on Facebook
                    </a>
                );
            case 'instagram':
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClass} bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90`}>
                        <FaInstagram className="h-5 w-5" />
                        Message on Instagram
                    </a>
                );
            case 'x':
            case 'twitter':
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClass} bg-black hover:bg-zinc-900 border border-zinc-800`}>
                        <FaXTwitter className="h-4 w-4" />
                        Message on X
                    </a>
                );
            case 'phone':
            default:
                return (
                    <a href={href} className={`${baseClass} bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600`}>
                        <HiOutlineChatBubbleBottomCenterText className="h-5 w-5" />
                        Send Text Message
                    </a>
                );
        }
    };


    return (
        <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Price
                    </span>

                    <div className="mt-2 text-4xl font-black text-blue-600 dark:text-blue-400">
                        ${parseFloat(price).toFixed(2)}
                    </div>
                </div>

                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Securely communicate and complete transactions through trusted community practices.
                </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-blue-100 bg-blue-50 dark:border-slate-700 dark:bg-slate-800">
                        <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {userName}
                        </h4>

                        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold capitalize text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                            {userRole}
                        </span>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    {isAvailable ? (
                        <>
                            {renderContactButton()}

                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                                <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
                                In-App Message
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        >
                            Listing Closed
                        </button>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <HiOutlineShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-bold">
                        Buyer Safety Tips
                    </span>
                </div>

                <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    <li>• Avoid making advance payments before inspecting the item.</li>
                    <li>• Meet sellers in safe, public places whenever possible.</li>
                    <li>• Verify the item&apos;s condition before completing the transaction.</li>
                </ul>
            </div>
        </div>
    );
};