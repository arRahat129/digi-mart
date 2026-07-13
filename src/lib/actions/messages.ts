'use server';

import { ApiResponse } from "../api/messages";
import { serverMutation } from "../core/server";

export interface ExtendedMessagePayload {
    buyerId: string;
    sellerId: string;
    itemId: string;
    senderId: string;
    message: string;
    buyerName: string;
    buyerImage: string;
    buyerEmail: string;
    sellerName: string;
    sellerImage: string;
    location: string;
    contact: string;
}

interface CreateMessageResponse {
    chatId: string;
    messageId: string;
}

export async function createMessageToSeller(payload: ExtendedMessagePayload): Promise<ApiResponse<CreateMessageResponse>> {
    try {
        return await serverMutation<ApiResponse<CreateMessageResponse>>("/api/messages", payload, "POST");
    } catch (error) {
        console.error("Failed to execute createMessageToSeller action:", error);
        throw error;
    }
}