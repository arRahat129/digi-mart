'use server';

import { serverMutation } from "../core/server";

interface ItemCreationResponse {
    success: boolean;
    message: string;
    insertedId?: string;
}

export async function createSellPost(formData: unknown): Promise<ItemCreationResponse> {
    return await serverMutation<ItemCreationResponse>('/api/allitems', formData, 'POST');
}