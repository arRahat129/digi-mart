'use server';

import { serverFetch } from "../core/server";


export interface RelatedItem {
    _id: { $oid: string } | string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
}


interface ApiResponse<T> {
    success: boolean;
    message: string;
    meta?: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
    similarProducts?: RelatedItem[];
    data: T;
}

export type MarketSortBy = 'price' | 'date' | 'condition';
export type MarketSortOrder = 'asc' | 'desc';

export interface MarketQueryParams {
    search?: string;
    category?: string;
    minPrice?: string | number;
    maxPrice?: string | number;
    sortBy?: MarketSortBy;
    sortOrder?: MarketSortOrder;
    page?: number;
    limit?: number;
}

export const getAllSellItems = async <T>(queryParams?: MarketQueryParams): Promise<ApiResponse<T>> => {
    try {
        let path = "/api/allitems";

        if (queryParams) {
            const params = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    params.append(key, String(value));
                }
            });

            const queryString = params.toString();
            if (queryString) {
                path += `?${queryString}`;
            }
        }

        const result = await serverFetch<ApiResponse<T>>(path);
        return result;
    } catch (error) {
        console.error("Error in getAllSellItems action:", error);
        throw error;
    }
};

export const getSingleSellItem = async <T>(id: string): Promise<ApiResponse<T>> => {
    try {
        const path = `/api/allitems/${id}`;

        const result = await serverFetch<ApiResponse<T>>(path);
        return result;
    } catch (error) {
        console.error(`Error in getSingleSellItem action for item ID [${id}]:`, error);
        throw error;
    }
};

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

export const getRelatedProducts = async <T>(userId: string, category: string): Promise<ApiResponse<T>> => {
    try {
        const path = `/api/users/${userId}?category=${encodeURIComponent(category)}`;
        const result = await serverFetch<ApiResponse<ApiResponse<T>>>(path);
        return result as unknown as ApiResponse<T>;
    } catch (error) {
        console.error(`Error in getRelatedProducts action for user [${userId}]:`, error);
        throw error;
    }
};