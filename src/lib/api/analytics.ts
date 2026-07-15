'use server';

import { serverFetch } from "../core/server";


export interface UserAnalyticsResponse {
    success: boolean;
    data: {
        inventoryCount: number;
        totalRequestsSent: number;
        totalRequestsReceived: number;
        acceptedDeals: number;
        activityTrend: Array<{ _id: string; count: number }>;
    };
}

export interface AdminAnalyticsResponse {
    success: boolean;
    data: {
        platformOverview: {
            totalUsers: number;
            totalItems: number;
            totalMessages: number;
            activeListings: number;
            completedDeals: number;
        };
    };
}

// 1. Fetch User Analytics
export const getUserAnalytics = async (userId: string): Promise<UserAnalyticsResponse> => {
    return await serverFetch<UserAnalyticsResponse>(`/api/analytics/${userId}`);
};

// 2. Fetch Admin Analytics
export const getAdminAnalytics = async (): Promise<AdminAnalyticsResponse> => {
    return await serverFetch<AdminAnalyticsResponse>(`/api/admin/analytics`);
};