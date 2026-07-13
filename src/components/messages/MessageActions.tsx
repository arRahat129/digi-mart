'use client';

import React from 'react';

interface MessageActionsProps {
    messageId: string;
}

export const MessageActions = ({ messageId }: MessageActionsProps) => {
    const handleView = () => {
        console.log(`Viewing message ${messageId}`);
        // Add your modal opening or navigation logic here later
    };

    return (
        <button
            onClick={handleView}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-neutral-500/20"
        >
            View
        </button>
    );
};