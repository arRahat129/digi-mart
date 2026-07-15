'use client';

import React, { useEffect, useState } from 'react';
import { getAdminAnalytics, AdminAnalyticsResponse } from '@/lib/api/analytics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
    const [data, setData] = useState<AdminAnalyticsResponse['data']['platformOverview'] | null>(null);

    useEffect(() => {
        getAdminAnalytics().then(res => setData(res.data.platformOverview));
    }, []);

    if (!data) return <div className="flex h-64 items-center justify-center">Loading Analytics...</div>;

    const chartData = [
        { name: 'Users', val: data.totalUsers },
        { name: 'Items', val: data.totalItems },
        { name: 'Deals', val: data.completedDeals },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-950">
            <h2 className="mb-8 text-3xl font-extrabold text-[#244D3F] dark:text-emerald-400">
                Platform Overview
            </h2>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {chartData.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.name}</p>
                        <p className="text-4xl font-bold text-[#244D3F] dark:text-white">{item.val}</p>
                    </div>
                ))}
            </div>

            {/* Chart Container */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="h-[400px] w-full">
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="#244D3F" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;