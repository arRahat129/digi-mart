"use client";

import React, { useState } from 'react';
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BiEnvelope } from "react-icons/bi";
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createMessageToSeller } from '@/lib/actions/messages';

interface InAppMessageModalProps {
    sellerInfo: {
        id: string;
        name: string;
        image: string;
    };
    itemId: string;
}

export function InAppMessageModal({ sellerInfo, itemId }: InAppMessageModalProps) {
    const { data: sessionUser } = useSession();
    const user = sessionUser?.user;

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusMessage(null);

        if (!user) {
            setStatusMessage({ type: 'error', text: 'You must be signed in to send a message.' });
            return;
        }

        const formElement = e.currentTarget;
        setIsLoading(true);

        try {
            const formData = new FormData(formElement);

            // Constructing properties to match your message backend API 
            const payload = {
                buyerId: user.id,
                sellerId: sellerInfo.id,
                itemId: itemId, // Passed down from props
                senderId: user.id, // Buyer initiates the chat thread, so they are the sender
                message: formData.get("message") as string,

                // Keep these if your custom database logic persists optional data fields
                buyerName: user?.name || 'Anonymous Buyer',
                buyerImage: user?.image || '',
                buyerEmail: user?.email || '',
                sellerName: sellerInfo.name,
                sellerImage: sellerInfo.image,
                location: formData.get("location") as string,
                contact: formData.get("contact") as string,
            };

            const response = await createMessageToSeller(payload);

            if (response.success) {
                toast.success('Message sent to Current Owner.');
                formElement.reset();
                setIsOpen(false);
                router.push(`/items/${itemId}`);
            } else {
                setStatusMessage({ type: 'error', text: response.message || 'Failed to send message.' });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setStatusMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button
                type="button"
                onPress={() => setIsOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
                <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
                In-App Message
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <BiEnvelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Send a Message to {sellerInfo.name}</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out your transaction details below to reach the seller.
                            </p>
                        </Modal.Header>

                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="p-6">
                                <Surface variant="default" className="flex flex-col gap-4">
                                    {statusMessage && (
                                        <div className={`p-3 rounded-lg text-sm font-medium ${statusMessage.type === 'success'
                                            ? 'bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-400'
                                            : 'bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-400'
                                            }`}>
                                            {statusMessage.text}
                                        </div>
                                    )}

                                    <TextField className="w-full" name="message" variant="secondary">
                                        <Label>Message</Label>
                                        <Input placeholder={`Type your message to {sellerInfo.name}...`} required disabled={isLoading} />
                                    </TextField>

                                    <TextField className="w-full" name="location" variant="secondary">
                                        <Label>Your Location</Label>
                                        <Input placeholder="Enter your city or area" required disabled={isLoading} />
                                    </TextField>

                                    <TextField className="w-full" name="contact" variant="secondary">
                                        <Label>Your Contact Info</Label>
                                        <Input placeholder="Enter email or phone number" required disabled={isLoading} />
                                    </TextField>
                                </Surface>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary" type="button" isDisabled={isLoading}>
                                    Cancel
                                </Button>
                                <Button type="submit" isDisabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}