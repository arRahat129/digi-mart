import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { ChatThread, getUserChats } from '@/lib/api/messages';
import { ChatListClient } from '@/components/messages/ChatListClient';

const Communication = async () => {
    const sessionUser = await getUserSession();
    const currentUserId = sessionUser?.id as string;

    let chatThreads: ChatThread[] = [];

    console.log("console", chatThreads, currentUserId);


    try {
        if (currentUserId) {
            const response = await getUserChats(currentUserId);
            console.log(response);
            if (response?.success && Array.isArray(response.data)) {
                chatThreads = response.data;
            }
        }
    } catch (error) {
        console.error("❌ Failed to load chat threads:", error);
    }

    return (
        <section className="w-full max-w-4xl mx-auto p-4 sm:p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                    Messages
                </h1>
                <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    Manage your ongoing inquiries and active item chats.
                </p>
            </header>

            {chatThreads.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        No active conversations found.
                    </p>
                </div>
            ) : (
                <ChatListClient initialThreads={chatThreads} currentUserId={currentUserId} />
            )}
        </section>
    );
};

export default Communication;