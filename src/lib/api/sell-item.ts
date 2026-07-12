'use server';

import { serverFetch } from "../core/server";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    count?: number;
    data: T;
}

export const getAllSellItemIndividualUser = async <T>(userId: string): Promise<ApiResponse<T>> => {
    try {
        const path = `/api/allitems/user/${userId}`;

        const result = await serverFetch<ApiResponse<T>>(path);

        return result;
    } catch (error) {
        console.error(`Error in getAllSellItemIndividualUser action for user [${userId}]:`, error);
        throw error;
    }
};