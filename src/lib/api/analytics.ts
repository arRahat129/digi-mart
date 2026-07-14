'use server';

import { serverFetch } from "../core/server";

export interface AnalyticsData {
    summary: {
        totalInventory: number;
        totalRequests: number;
        acceptedDeals: number;
        pendingDeals: number;
    };
    activityTrend: Array<{ _id: string; count: number }>;
}

export interface AnalyticsResponse {
    success: boolean;
    data: AnalyticsData;
}

export const getDashboardAnalytics = async (userId: string): Promise<AnalyticsResponse> => {
    if (!userId) {
        throw new Error("User ID is required to fetch analytics.");
    }

    try {
        // Fetch from the new analytics endpoint
        const response = await serverFetch<AnalyticsResponse>(`/api/analytics/${userId}`);

        if (!response.success) {
            throw new Error("Failed to retrieve analytics data.");
        }

        return response;
    } catch (error) {
        console.error(`Failed to execute getDashboardAnalytics for ID: ${userId}`, error);
        throw error;
    }
};