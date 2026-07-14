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


export async function updateMessageStatus(
    messageId: string,
    status: "accepted" | "rejected"
): Promise<ApiResponse<{ messageId: string }>> {
    try {
        return await serverMutation<ApiResponse<{ messageId: string }>>(
            `/api/messages/${messageId}`,
            { status },
            "PATCH"
        );
    } catch (error) {
        console.error("Failed to update message status:", error);
        throw error;
    }
}

export async function processRequestAction(
    messageId: string,
    itemId: string,
    action: "accept" | "reject"
): Promise<ApiResponse<{ messageId: string }>> {
    try {
        // This matches the PATCH endpoint we added to your express backend
        return await serverMutation<ApiResponse<{ messageId: string }>>(
            `/api/messages/process/${messageId}`,
            { action, itemId },
            "PATCH"
        );
    } catch (error) {
        console.error(`Failed to ${action} request:`, error);
        throw error;
    }
}