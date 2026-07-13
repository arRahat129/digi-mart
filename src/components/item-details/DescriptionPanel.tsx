import React from 'react';

interface DescriptionPanelProps {
    description: string;
    sellerMessage: string;
}

export const DescriptionPanel = ({
    description,
    sellerMessage,
}: DescriptionPanelProps) => {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="border-b border-blue-100 pb-3 text-sm font-bold tracking-wide text-slate-900 dark:border-slate-800 dark:text-slate-100">
                    Description & Overview
                </h3>

                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                    <p className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
                        {description}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="border-b border-blue-100 pb-3 text-sm font-bold tracking-wide text-slate-900 dark:border-slate-800 dark:text-slate-100">
                    Message from Seller
                </h3>

                <blockquote className="mt-5 rounded-xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4 text-sm italic leading-7 text-slate-700 dark:border-blue-400 dark:bg-slate-800 dark:text-slate-300">
                    {sellerMessage}
                </blockquote>
            </div>
        </div>
    );
};