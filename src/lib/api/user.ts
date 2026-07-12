'use server';

import { serverFetch } from "../core/server";

export interface UserResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        name?: string;
        email?: string;
        role?: string;
    };
}


export const getIndividualUserInfo = async (userId: string): Promise<UserResponse> => {
    if (!userId) {
        throw new Error("User ID is required to fetch profile information.");
    }

    try {
        const data = await serverFetch<UserResponse>(`/api/users/${userId}`);
        return data;
    } catch (error) {
        console.error(`Failed to execute getIndividualUserInfo for ID: ${userId}`, error);
        throw error;
    }
};