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
}

interface MessageDetailsModalProps {
    message: DetailedMessageItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export function MessageDetailsModal({ message, isOpen, onClose }: MessageDetailsModalProps) {
    if (!message) return null;

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
                                            <BiMap className="size-5 text-neutral-400 flex-shrink-0" />
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
                                            <BiPhone className="size-5 text-neutral-400 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-neutral-400">Contact Info</p>
                                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 truncate">
                                                    {message.contact}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary" type="button" onPress={onClose} className="w-full sm:w-auto">
                                Close Window
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}