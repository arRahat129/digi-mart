import React from 'react';
import { Button } from "@heroui/react";
import { FiArrowRight, FiShield, FiCpu, FiDollarSign } from 'react-icons/fi';

export default function Highlights() {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors border-b border-slate-200 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Text and Checkmarks */}
                <div className="space-y-6">
                    <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Secure Trade Infrastructure</div>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Safe, Transparent P2P Digital Commerce
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        DigiMart eliminates complex corporate middlemen. Buy tools directly from original developers, or list your own projects to establish a scalable source of passive revenue.
                    </p>

                    <div className="space-y-3.5 pt-2">
                        {[
                            { icon: FiShield, text: "Automated escrow protecting buyers until file confirmation." },
                            { icon: FiCpu, text: "Instant code structure verification check upon product submission." },
                            { icon: FiDollarSign, text: "Direct seller payouts through integrated payment rails." }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <item.icon className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Button variant="primary" className="bg-slate-900 dark:bg-blue-600 text-white font-semibold">
                            Learn How It Works <FiArrowRight />
                        </Button>
                    </div>
                </div>

                {/* Right Side: Geometric Code Abstract Display (No Humans) */}
                <div className="relative p-1 rounded-2xl bg-linear-to-tr from-blue-500 to-cyan-500 shadow-xl opacity-95">
                    <div className="bg-slate-950 rounded-xl p-6 font-mono text-xs text-cyan-400 space-y-2 overflow-x-auto select-none">
                        <p className="text-slate-600">{"// DigiMart Secure P2P Escrow Contract"}</p>
                        <p><span className="text-purple-400">import</span> &#123; escrow &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">{"\"@digimart/core\""}</span>;</p>
                        <p className="text-slate-400">{"const deal = { buyer: \"user_78\", seller: \"user_02\", price: 49.00 };"}</p>
                        <p>&nbsp;</p>
                        <p><span className="text-purple-400">export async function</span> <span className="text-blue-400">executeTrade</span>() &#123;</p>
                        <p className="text-emerald-500">&nbsp;&nbsp;{"const status = await escrow.holdFunds(deal);"}</p>
                        <p>&nbsp;&nbsp;{"console.log(\"Escrow Active: Awaiting File Download\");"}</p>
                        <p>&nbsp;&nbsp;{"return status.releaseOnVerification();"}</p>
                        <p>&#125;</p>
                    </div>
                </div>

            </div>
        </section>
    );
}