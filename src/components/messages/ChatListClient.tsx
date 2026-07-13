"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal, Surface, Button } from "@heroui/react";
import { BiEnvelopeOpen, BiPackage } from "react-icons/bi";
import { ChatThread, getChatMessages, ChatMessage } from '@/lib/api/messages';
import { MessageListClient } from './MessageListClient';
import { DetailedMessageItem } from '../modals/MessageDetailsModal';
import toast from 'react-hot-toast';

interface ChatListClientProps {
    initialThreads: ChatThread[];
    currentUserId: string;
}

export function ChatListClient({ initialThreads, currentUserId }: ChatListClientProps) {
    console.log("console", initialThreads, currentUserId);
    const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);

    // 2. State management for message lists and load states
    const [messages, setMessages] = useState<DetailedMessageItem[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);

    // 3. Trigger fetch handler when clicking "Open Chat"
    const handleOpenChat = async (chat: ChatThread) => {
        setSelectedChat(chat);
        setIsLoadingMessages(true);
        setMessages([]);

        try {
            const response = await getChatMessages(chat._id);
            if (response?.success && Array.isArray(response.data)) {

                // Map flat DB elements into the formatting fields required by MessageListClient
                const mappedMessages: DetailedMessageItem[] = response.data.map((msg: ChatMessage) => ({
                    _id: msg._id,
                    message: msg.message,
                    timestamp: msg.timestamp,
                    buyerId: chat.buyerId,
                    sellerId: chat.sellerId,
                    buyerName: chat.buyer?.name || 'Buyer',
                    buyerImage: chat.buyer?.image || '',
                    sellerName: chat.seller?.name || 'Seller',
                    sellerImage: chat.seller?.image || '',
                    // Fallbacks from thread metadata if detailed fields are empty
                    location: 'In-App Transaction',
                    contact: chat.buyer?.email || ''
                }));

                setMessages(mappedMessages);
            } else {
                toast.error(response?.message || "Failed to load message log.");
            }
        } catch (error) {
            console.error("❌ Error fetching conversation:", error);
            toast.error("Could not recover conversations.");
        } finally {
            setIsLoadingMessages(false);
        }
    };

    return (
        <>
            <div className="space-y-4">
                {initialThreads.map((chat) => {
                    const isBuyer = chat.buyerId === currentUserId;
                    const counterpart = isBuyer ? chat.seller : chat.buyer;
                    const itemInfo = chat.item;

                    const formattedTime = new Date(chat.lastMessageAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return (
                        <div
                            key={chat._id}
                            className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                <div className="relative flex-shrink-0 w-12 h-12">
                                    <Image
                                        src={counterpart?.image || '/placeholder.png'}
                                        alt={counterpart?.name || 'User'}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover border border-neutral-100 dark:border-neutral-800"
                                    />
                                </div>

                                <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                            {counterpart?.name || 'Unknown User'}
                                        </h3>
                                        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                                            &bull; {formattedTime}
                                        </span>
                                    </div>

                                    {itemInfo && (
                                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                                            Regarding: {itemInfo.title}
                                        </p>
                                    )}

                                    <p className="text-sm font-normal text-neutral-600 dark:text-neutral-300 pr-4 line-clamp-1 break-words italic">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-end sm:flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleOpenChat(chat)} // Updated trigger method
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150"
                                >
                                    Open Chat
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* View Thread Details Modal Container */}
            <Modal isOpen={!!selectedChat} onOpenChange={(open) => !open && setSelectedChat(null)}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl w-full">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                                    <BiEnvelopeOpen className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>
                                    Conversation with {selectedChat?.buyerId === currentUserId ? selectedChat?.seller?.name : selectedChat?.buyer?.name}
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="p-6 max-h-[60vh] overflow-y-auto">
                                <Surface variant="default" className="flex flex-col gap-4">

                                    {selectedChat?.item && (
                                        <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-3 dark:border-neutral-800">
                                            <BiPackage className="size-5 text-neutral-400 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-neutral-400">Linked Item</p>
                                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 truncate">
                                                    {selectedChat.item.title} {selectedChat.item.price ? `($${selectedChat.item.price})` : ''}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                                            Message Log History
                                        </span>

                                        {/* 4. Swapped static layout out for conditional stream injection */}
                                        {isLoadingMessages ? (
                                            <p className="text-sm text-center py-6 text-neutral-500 animate-pulse">
                                                Loading entire chat history...
                                            </p>
                                        ) : messages.length === 0 ? (
                                            <p className="text-sm text-center py-6 text-neutral-400 italic">
                                                No specific logged context.
                                            </p>
                                        ) : (
                                            <MessageListClient messages={messages} currentUserId={currentUserId} />
                                        )}
                                    </div>

                                </Surface>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button slot="close" variant="secondary" type="button" onPress={() => setSelectedChat(null)} className="w-full">
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}