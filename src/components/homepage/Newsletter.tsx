import React from 'react';
import { Button } from "@heroui/react";
import { FiMail } from 'react-icons/fi';

export default function Newsletter() {
    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <div className="p-3 w-fit rounded-full bg-linear-to-tr from-blue-500 to-cyan-500 text-white mx-auto shadow-md">
                    <FiMail className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Sync Platform Technical Logs</h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Receive real-time release matrices, architectural patch files, and system vulnerability reports straight to your inbox.
                    </p>
                </div>

                <form className="max-w-md mx-auto flex gap-2">
                    <input
                        type="email"
                        required
                        placeholder="developer@endpoint.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-blue-950 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <Button type="submit" variant="primary" className="bg-blue-600 text-white text-xs font-bold px-5">
                        Subscribe
                    </Button>
                </form>
            </div>
        </section>
    );
}