'use client';

import React, { useEffect, useState } from 'react';
import { getUserAnalytics, UserAnalyticsResponse } from '@/lib/api/analytics';
import { useSession } from '@/lib/auth-client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const UserDashboard = () => {
    const sessionUser = useSession();
    const userId = sessionUser?.data?.user?.id as string;
    const [stats, setStats] = useState<UserAnalyticsResponse['data'] | null>(null);

    useEffect(() => {
        if (userId) {
            getUserAnalytics(userId).then(res => setStats(res.data));
        }
    }, [userId]);

    if (!stats) return (
        <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
            <div className="mb-8 h-10 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

            {/* Skeleton Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 rounded-2xl bg-slate-200 animate-pulse dark:bg-slate-800" />
                ))}
            </div>

            {/* Spinner Overlay */}
            <div className="fixed inset-0 flex items-center justify-center w-full">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-[#244D3F] dark:border-slate-700 dark:border-t-emerald-400" />
            </div>
        </div>
    );

    const summaryCards = stats ? [
        { label: 'Inventory', value: stats.inventoryCount },
        { label: 'Requests Sent', value: stats.totalRequestsSent },
        { label: 'Requests Received', value: stats.totalRequestsReceived },
        { label: 'Accepted Deals', value: stats.acceptedDeals },
    ] : [];

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

            {/* Recharts Activity Trend */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-6 text-lg font-semibold text-slate-800 dark:text-white">Activity Trends</h3>
                <div className="h-64 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats?.activityTrend || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="_id" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;