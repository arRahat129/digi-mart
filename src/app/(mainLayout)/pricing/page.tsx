import React from 'react';
import { Button, Card, CardHeader } from "@heroui/react";
import { FiCheck, FiShoppingBag, FiCpu, FiTv, FiHome, FiZap } from 'react-icons/fi';
import { IconType } from 'react-icons';

// 1. Updated strict variant types to match your explicit package configuration
interface Tier {
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    buttonText: string;
    variant: "ghost" | "danger" | "danger-soft" | "outline" | "primary" | "secondary" | "tertiary";
    popular: boolean;
    icon: IconType;
    iconColor: string;
}

const tiers: Tier[] = [
    {
        name: "Casual Trader",
        price: "$0",
        description: "Perfect for household items, casual buying, and occasional selling.",
        features: [
            "List up to 5 active items concurrently",
            "Standard P2P Escrow Protection",
            "Sell electronics, appliances, & home goods",
            "Standard 5% successful trade fee",
            "Basic support channel access"
        ],
        buttonText: "Get Started Free",
        variant: "outline", // Matches your package options perfectly
        popular: false,
        icon: FiHome,
        iconColor: "text-slate-500"
    },
    {
        name: "Power Seller",
        price: "$19",
        period: "/month",
        description: "Ideal for frequent traders shifting higher volumes of electronics or appliances.",
        features: [
            "Unlimited active product listings",
            "Priority verified listing check",
            "Reduced 2.5% trade processing fee",
            "Top-of-search placement for items",
            "Dedicated support queue node"
        ],
        buttonText: "Upgrade to Power",
        variant: "primary", // Matches your package options perfectly
        popular: true,
        icon: FiZap,
        iconColor: "text-blue-600 dark:text-cyan-400"
    }
];

export default function PricingPage() {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300 grow flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-cyan-400 text-xs font-mono font-semibold">
                        <FiShoppingBag className="w-3.5 h-3.5" />
                        <span>{"TRANSPARENT P2P FEES"}</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        Simple Plans for Smart Trading
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Whether you are cleaning out household electronics, upgrading home appliances, or scaling up your storefront, we have a structure built for you.
                    </p>
                </div>

                {/* Pricing Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                    {tiers.map((tier: Tier, idx: number) => {
                        const IconComponent = tier.icon;
                        return (
                            <Card
                                key={idx}
                                className={`relative p-6 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col justify-between transition-all duration-300 ${tier.popular
                                        ? "border-blue-500 dark:border-cyan-400 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20"
                                        : "border-slate-200 dark:border-blue-950/40 shadow-xs"
                                    }`}
                            >
                                {tier.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-cyan-400 text-white dark:text-slate-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                                        {"Most Popular"}
                                    </span>
                                )}

                                <div>
                                    <CardHeader className="flex flex-col items-start gap-2 pt-2 px-0 bg-transparent">
                                        <div className="flex items-center justify-between w-full">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wide">
                                                {tier.name}
                                            </h3>
                                            <IconComponent className={`w-6 h-6 ${tier.iconColor}`} />
                                        </div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-1">
                                            {tier.description}
                                        </p>
                                        <div className="flex items-baseline gap-1 mt-4">
                                            <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                                {tier.price}
                                            </span>
                                            {tier.period && (
                                                <span className="text-xs text-slate-400 font-medium">{tier.period}</span>
                                            )}
                                        </div>
                                    </CardHeader>

                                    {/* Swapped CardBody with an HTML div to eliminate unexported member errors */}
                                    <div className="py-6">
                                        <ul className="space-y-3.5 text-sm">
                                            {tier.features.map((feature: string, fIdx: number) => (
                                                <li key={fIdx} className="flex items-start gap-3">
                                                    <div className="p-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 mt-0.5 shrink-0">
                                                        <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Swapped CardFooter with a plain div styled for spacing */}
                                <div className="pt-4 pb-2">
                                    <Button
                                        variant={tier.variant}
                                        className={`w-full py-6 font-bold rounded-xl text-xs sm:text-sm transition-all duration-200 ${tier.popular
                                                ? "bg-blue-600 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-blue-700 dark:hover:bg-cyan-300 border-none"
                                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                            }`}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Bottom Trust Metrics */}
                <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-900 text-center max-w-2xl mx-auto">
                    <p className="text-xs font-mono font-medium text-slate-400 tracking-wider mb-6 uppercase">
                        {"Verified House-To-House Trading Architecture"}
                    </p>
                    <div className="flex justify-center items-center gap-10 md:gap-14 text-slate-400 dark:text-slate-600 select-none">
                        <div className="flex flex-col items-center gap-1.5">
                            <FiCpu className="w-5 h-5 text-blue-500/60" />
                            <span className="text-[10px] font-bold font-mono tracking-wide uppercase">{"Electronics"}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                            <FiTv className="w-5 h-5 text-purple-500/60" />
                            <span className="text-[10px] font-bold font-mono tracking-wide uppercase">{"Appliances"}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                            <FiHome className="w-5 h-5 text-emerald-500/60" />
                            <span className="text-[10px] font-bold font-mono tracking-wide uppercase">{"Home Utilities"}</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}