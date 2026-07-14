'use server';

import { ApiResponse } from "../api/messages";
import { serverMutation } from "../core/server";

interface ItemCreationResponse {
    success: boolean;
    message: string;
    insertedId?: string;
}

export interface UpdateItemPayload {
    title?: string;
    price?: string; // Changed from number to string to match ListingItem
    description?: string;
    category?: string;
    isAvailable?: boolean; // Changed to match your ListingItem field
    conditionYears?: string;
    purchaseDate?: string;
    imageUrl?: string;
    contactMethod?: string;
    contactDetails?: string;
    sellerMessage?: string;
}

export async function createSellPost(formData: unknown): Promise<ItemCreationResponse> {
    return await serverMutation<ItemCreationResponse>('/api/allitems', formData, 'POST');
}

export async function deleteItemAction(itemId: string): Promise<ApiResponse<null>> {
    try {
        return await serverMutation<ApiResponse<null>>(`/api/allitems/${itemId}`, {}, "DELETE");
    } catch (error) {
        console.error("Failed to delete item:", error);
        throw error;
    }
}

export async function updateItemAction(
    itemId: string,
    data: UpdateItemPayload
): Promise<ApiResponse<null>> {
    try {
        return await serverMutation<ApiResponse<null>>(`/api/allitems/${itemId}`, data, "PATCH");
    } catch (error) {
        console.error("Failed to patch item:", error);
        throw error;
    }
}