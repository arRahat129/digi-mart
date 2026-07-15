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

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    // Add other fields present in your database model
}

export interface Item {
    _id: string; // MongoDB ObjectId string
    title: string;
    category: string;
    description: string;
    price: string;
    conditionYears: string;
    purchaseDate: string;
    imageUrl: string;
    contactMethod: string;
    contactDetails: string;
    sellerMessage: string;
    address: string;
    userId: string;
    userName: string;
    userImage: string;
    userRole: 'user' | 'admin';
    status: 'pending' | 'approved' | 'rejected';
    availability: 'available' | 'unavailable';
    created_at: string;
    isFeatured?: boolean; // Added for the UI state
}

export interface Meta {
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export interface PaginatedItemsResponse {
    success: boolean;
    data: Item[];
    meta: Meta;
}

interface ToggleResponse {
    success: boolean;
    featured: boolean;
    message: string;
}

interface DeleteResponse {
    success: boolean;
    message: string;
}

interface AdminResponse {
    success: boolean;
    message?: string;
    data?: Product[];
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

export const getAllItemsAdmin = async (page: number = 1): Promise<PaginatedItemsResponse> => {
    return await serverFetch<PaginatedItemsResponse>(`/api/admin/allitems?page=${page}&limit=10`);
};

// Feature a product
export const toggleFeaturedProduct = async (itemId: string, productDetails: Item): Promise<ToggleResponse> => {
    return await serverMutation<ToggleResponse>(
        "/api/admin/featured/toggle",
        { itemId, ...productDetails },
        "POST"
    );
};

// Delete a product from everywhere
export const deleteProductAdmin = async (itemId: string): Promise<DeleteResponse> => {
    return await serverMutation<DeleteResponse>(`/api/admin/items/${itemId}`, {}, "DELETE");
};