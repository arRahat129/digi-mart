import React from 'react';
import { Button } from "@heroui/react";
import { FiTrendingUp, FiShoppingBag } from 'react-icons/fi';

export default function CTA() {
    return (
        <section className="py-20 bg-linear-to-br from-slate-900 to-blue-950 dark:from-black dark:to-slate-950 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                    Turn Your Code Into Recurring Revenue
                </h2>
                <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
                    Join thousands of independent software engineers listing UI components, scripts, and custom landing setups directly to digital consumers.
                </p>

                <div className="pt-4 flex flex-wrap gap-4 justify-center">
                    <Button variant="primary" className="bg-blue-500 text-white font-bold px-6 shadow-lg shadow-blue-500/20">
                       <FiTrendingUp /> Become a Seller
                    </Button>
                    <Button variant="outline" className="border-slate-700 text-slate-200 font-bold px-6 hover:bg-slate-800">
                       <FiShoppingBag /> Explore Products
                    </Button>
                </div>
            </div>
        </section>
    );
}