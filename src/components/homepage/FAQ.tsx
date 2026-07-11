import React from 'react';

const items = [
    { q: "How does the buyer protection escrow work?", a: "When you purchase a digital product, your funds are safely held by our automated system until you download and verify that the file architecture matches the listing description." },
    { q: "What cut does DigiMart take from asset sales?", a: "We believe in prioritizing creators, which is why we only take a minimal processing cut per transaction, ensuring you take home the absolute max value of your code." },
    { q: "Can I sell themes or modules built with any technical framework?", a: "Yes! DigiMart supports all digital products, including React components, Tailwind assets, WordPress themes, Laravel modules, Python scripts, and mobile application templates." }
];

export default function FAQ() {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors border-b border-slate-200 dark:border-slate-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white text-center mb-12">
                    Marketplace & Trading FAQ
                </h2>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-blue-950/30">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="text-blue-500">▶</span> {item.q}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 pl-4 leading-relaxed font-medium">
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}