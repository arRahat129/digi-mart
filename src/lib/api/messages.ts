'use server';

import { serverFetch } from "../core/server";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ProfileSnapshot {
    _id: string;
    name: string;
    image?: string;
    email?: string;
}

export interface ItemSnapshot {
    _id: string;
    title: string;
    price?: number;
    images?: string[];
}

export interface ChatThread {
    _id: string;
    buyerId: string;
    sellerId: string;
    itemId: string;
    lastMessage: string;
    lastMessageAt: Date;
    buyer: { name: string; image: string; email: string };
    seller: { name: string; image: string; location: string };
    item: {
        title: string;
        price: number;
        image: string;
        status: "pending" | "accepted" | "rejected";
    };
}

export interface ChatMessage {
    _id: string;
    chatId: string;
    senderId: string;
    message: string;
    timestamp: string;
    status?: "pending" | "accepted" | "rejected";
}


export const getUserChats = async (userId: string): Promise<ApiResponse<ChatThread[]>> => {
    return await serverFetch<ApiResponse<ChatThread[]>>(`/api/chats/user/${userId}`);
};


export const getChatMessages = async (chatId: string): Promise<ApiResponse<ChatMessage[]>> => {
    return await serverFetch<ApiResponse<ChatMessage[]>>(`/api/messages/chat/${chatId}`);
};