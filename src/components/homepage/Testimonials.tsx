import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';

const reviews = [
    { text: "Selling my Next.js boilerplates on DigiMart transformed my side projects into a reliable income stream. Payouts are instant.", source: "Alex_Dev92", industry: "Verified Shop Owner" },
    { text: "I bought a complex authentication module here. The code was perfectly clean, verified, and saved me a week of baseline building.", source: "TechStack_Studio", industry: "Verified Buyer" },
    { text: "The automated escrow mechanism gives me absolute confidence when acquiring scripts from new independent authors.", source: "Elena_Codes", industry: "Verified Buyer" }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors border-b border-slate-200 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white"> Feedback From Traders </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">What developers and creators are saying about peer-to-peer exchange.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-950/40 flex flex-col justify-between shadow-xs">
                            <div className="text-blue-500 dark:text-cyan-400 mb-4">
                                <FiShoppingBag className="w-6 h-6" />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed font-medium">{`"${rev.text}"`}</p>
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.source}</span>
                                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{rev.industry}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}