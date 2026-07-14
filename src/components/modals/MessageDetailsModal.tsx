"use client";

import React from 'react';
import { Modal, Surface, Button } from "@heroui/react";
import { BiEnvelopeOpen, BiMap, BiPhone } from "react-icons/bi";

export interface DetailedMessageItem {
    _id: string;
    message: string;
    timestamp: string;
    buyerId: string;
    sellerId: string;
    buyerName?: string;
    buyerImage?: string;
    sellerName?: string;
    sellerImage?: string;
    location?: string;
    contact?: string;
    status?: "pending" | "accepted" | "rejected";
}

interface MessageDetailsModalProps {
    message: DetailedMessageItem | null;
    isOpen: boolean;
    onClose: () => void;
    currentUserId: string; // Add this
    onStatusChange: (msgId: string, status: "accepted" | "rejected", sellerId: string) => void; // Add this
}

export function MessageDetailsModal({ message, isOpen, onClose, currentUserId, onStatusChange }: MessageDetailsModalProps) {
    console.log("Debug Modal State:", {
        currentUserId,
        sellerId: message?.sellerId,
        messageStatus: message?.status,
        isSellerMatch: message?.sellerId === currentUserId,
        isStatusPending: message?.status === 'pending'
    });
    if (!message) return null;

    const isSeller = message.sellerId === currentUserId;
    const isPending = message.status === 'pending';

    const formattedTime = new Date(message.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                                <BiEnvelopeOpen className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Conversation Details</Modal.Heading>
                            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                                Sent on {formattedTime}
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default" className="flex flex-col gap-5">
                                {/* Core Message Body */}
                                <div className="space-y-1.5">
                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                        Message Content
                                    </span>
                                    <p className="rounded-xl bg-neutral-50 p-4.5 text-sm leading-relaxed text-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 border border-neutral-100 dark:border-neutral-800">
                                        {message.message}
                                    </p>
                                </div>

                                {/* Transaction / Meta Info Grid */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {message.location && (
                                        <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-3 dark:border-neutral-800">
                                            <BiMap className="size-5 text-neutral-400 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-neutral-400">Location</p>
                                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 truncate">
                                                    {message.location}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {message.contact && (
                                        <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-3 dark:border-neutral-800">
                                            <BiPhone className="size-5 text-neutral-400 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-neutral-400">Contact Info</p>
                                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 truncate">
                                                    {message.contact}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {isSeller && isPending ? (
                                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                                        <p className="text-xs font-bold text-neutral-500 mb-3 uppercase">Action Required</p>
                                        <div className="flex gap-3">
                                            <Button
                                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                                                onPress={() => onStatusChange(message._id, 'accepted', message.sellerId)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
                                                onPress={() => onStatusChange(message._id, 'rejected', message.sellerId)}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 p-3 rounded-lg text-sm text-neutral-600">
                                        Status: <span className="font-bold capitalize">{message.status}</span>
                                    </div>
                                )}
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer className="flex flex-col gap-2">
                            <Button slot="close" variant="secondary" onPress={onClose} className="w-full">
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}