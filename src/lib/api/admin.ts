'use server';

import { serverFetch, serverMutation } from "../core/server";

export interface User {
    _id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    role: 'user' | 'admin';
    plan: string;
    contact: string;
    location: string;
}

interface UserResponse {
    success: boolean;
    data: User[]; // Use the User interface here instead of any[]
    meta: {
        totalUsers: number;
        totalPages: number;
        currentPage: number;
    };
    message?: string;
}

export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<UserResponse> => {
    // return await serverFetch<UserResponse>(`/api/users/all?page=${page}&limit=${limit}`);
    const users = await serverFetch<UserResponse>(`/api/users/all?page=${page}&limit=${limit}`);
    console.log(users);
    return users;
};

// Update user role
export const updateUserRole = async (userId: string, role: string) => {
    return await serverMutation(`/api/users/role/${userId}`, { role }, "PATCH");
};

// Delete a user
export const deleteUser = async (userId: string) => {
    return await serverMutation(`/api/users/${userId}`, {}, "DELETE");
};