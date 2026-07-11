import React from 'react';
import { Button } from "@heroui/react";
import { FiLayout, FiCode, FiLayers, FiImage } from 'react-icons/fi';

const categories = [
    { id: 1, title: "UI Kits & Templates", count: "1,420 Items", icon: FiLayout, desc: "Premium landing pages, dashboards, and full themes sold by top creators." },
    { id: 2, title: "Scripts & Plugins", count: "890 Assets", icon: FiCode, desc: "Production-ready backend utilities, extension systems, and tools." },
    { id: 3, title: "SaaS Boilerplates", count: "340 Bundles", icon: FiLayers, desc: "Complete pre-configured stacks to launch software products instantly." },
    { id: 4, title: "Graphics & Vectors", count: "2,100 Visuals", icon: FiImage, desc: "Abstract designs, icon packs, and landing assets for modern interfaces." }
];

export default function Categories() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors border-b border-slate-200 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Browse Marketplace Categories
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Discover premium digital assets created and listed by developers worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <div key={cat.id} className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-950/40 hover:border-blue-500 dark:hover:border-blue-500 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                                <div>
                                    <div className="p-3 w-fit rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">{cat.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{cat.desc}</p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">{cat.count}</span>
                                    <Button size="sm" variant="ghost" className="text-xs h-8 px-3">Explore</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}