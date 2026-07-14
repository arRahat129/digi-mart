"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { DetailedMessageItem, MessageDetailsModal } from '../modals/MessageDetailsModal';
import { useRouter } from 'next/navigation';
import { updateMessageStatus } from '@/lib/actions/messages';
import toast from 'react-hot-toast';

interface MessageListClientProps {
    messages: DetailedMessageItem[];
    currentUserId: string;
    onAction: (messageId: string, action: "accepted" | "rejected") => Promise<void>;
}

export function MessageListClient({ messages, currentUserId, onAction }: MessageListClientProps) {
    console.log({ messages, currentUserId })
    const router = useRouter();
    const [selectedMessage, setSelectedMessage] = useState<DetailedMessageItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenDetails = (msg: DetailedMessageItem) => {
        setSelectedMessage(msg);
        setIsModalOpen(true);
    };

    const handleStatusChange = async (msgId: string, status: "accepted" | "rejected") => {
        try {
            await onAction(msgId, status);
            toast.success(`Message ${status} successfully.`);
            setIsModalOpen(false); // Close modal if open
            router.refresh();
        } catch (error) {
            toast.error(`Failed to update status. ${error}`);
        }
    };

    return (
        <>
            <div className="space-y-4">
                {messages.map((msg) => {
                    const isOutgoing = msg.buyerId === currentUserId;
                    const isSeller = msg.sellerId === currentUserId;
                    // console.log("Msg ID:", msg._id, "Status:", msg.status, "IsSeller:", isSeller);
                    const formattedTime = new Date(msg.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return (
                        <div key={msg._id}>
                            <div
                                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`size-2.5 rounded-full ${msg.status === 'accepted' ? 'bg-emerald-500' :
                                        msg.status === 'rejected' ? 'bg-red-500' : 'bg-amber-400'
                                        }`} />
                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                        {msg.status || 'pending'}
                                    </span>
                                </div>

                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className="relative flex-shrink-0 w-12 h-12">
                                        <Image
                                            src={isOutgoing ? msg.sellerImage || '/placeholder.png' : msg.buyerImage || '/placeholder.png'}
                                            alt={isOutgoing ? msg.sellerName || 'Seller' : msg.buyerName || 'Buyer'}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-full object-cover border border-neutral-100 dark:border-neutral-800"
                                        />
                                    </div>

                                    <div className="space-y-1 min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            {isOutgoing ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500 flex-shrink-0" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M14.78 5.22a.75.75 0 00-1.06 0L6.5 12.44V6.75a.75.75 0 00-1.5 0v7.5c0 .414.336.75.75.75h7.5a.75.75 0 000-1.5H7.56l7.22-7.22a.75.75 0 000-1.06z" clipRule="evenodd" />
                                                </svg>
                                            )}

                                            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                                {isOutgoing ? `To: ${msg.sellerName || 'Seller'}` : `From: ${msg.buyerName || 'Buyer'}`}
                                            </h3>
                                            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                                                &bull; {formattedTime}
                                            </span>
                                        </div>
                                        <p className="text-sm font-normal text-neutral-600 dark:text-neutral-300 pr-4 line-clamp-2 break-words leading-relaxed">
                                            {msg.message}
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center gap-2 mt-2 justify-center sm:shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleOpenDetails(msg)}
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-neutral-500/20"
                                >
                                    View
                                </button>
                                {isSeller && msg.status === 'pending' && (
                                    <div className="flex gap-2 w-full mt-2 sm:mt-0 sm:w-auto">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(msg._id, 'accepted'); }}
                                            className="text-xs bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(msg._id, 'rejected'); }}
                                            className="text-xs bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <MessageDetailsModal
                message={selectedMessage}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedMessage(null);
                }}
                currentUserId={currentUserId}
                onStatusChange={handleStatusChange}
            />
        </>
    );
}