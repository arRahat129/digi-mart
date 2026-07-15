'use client';

import React, { useEffect, useState } from 'react';
import { getUserAnalytics, UserAnalyticsResponse } from '@/lib/api/analytics';
import { useSession } from '@/lib/auth-client';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const UserDashboard = () => {
    const sessionUser = useSession();
    const userId = sessionUser?.data?.user?.id as string;
    const [stats, setStats] = useState<UserAnalyticsResponse['data'] | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (userId) {
            getUserAnalytics(userId).then(res => setStats(res.data));
        }
    }, [userId]);

    if (!stats) return (
        <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
            <div className="mb-8 h-10 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 rounded-2xl bg-slate-200 animate-pulse dark:bg-slate-800" />
                ))}
            </div>
            <div className="fixed inset-0 flex items-center justify-center w-full">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-[#244D3F] dark:border-slate-700 dark:border-t-emerald-400" />
            </div>
        </div>
    );

    // Summary configuration
    const summaryCards = [
        { label: 'Inventory', value: stats.inventoryCount ?? 0 },
        { label: 'Requests Sent', value: stats.totalRequestsSent ?? 0 },
        { label: 'Requests Received', value: stats.totalRequestsReceived ?? 0 },
        { label: 'Accepted Deals', value: stats.acceptedDeals ?? 0 },
    ];

    const chartData = [
        { name: 'Inventory', value: stats.inventoryCount ?? 0 },
        { name: 'Requests Sent', value: stats.totalRequestsSent ?? 0 },
        { name: 'Requests Received', value: stats.totalRequestsReceived ?? 0 },
        { name: 'Accepted Deals', value: stats.acceptedDeals ?? 0 }
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-950">
            <h2 className="mb-8 text-3xl font-extrabold text-[#244D3F] dark:text-emerald-400">My Dashboard</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <div key={card.label} className="flex h-32 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                        <p className="text-4xl font-bold text-[#244D3F] dark:text-white">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* High-Visibility 4-Bar Chart */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-6 text-lg font-semibold text-slate-800 dark:text-white">Activity Trends</h3>
                <div className="h-64 w-full mt-4 flex items-center justify-center">
                    {isMounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false} // Stops fractional numbers (no 0.5, 1.5, etc.)
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#10b981' }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={60}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            
                                            fill={entry.value > 0 ? '#10b981' : 'transparent'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;