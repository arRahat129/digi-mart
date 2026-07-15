'use server';

import { redirect } from "next/navigation";
import { getJwtToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const isNextRedirect = (error: unknown): boolean => {
    if (error && typeof error === 'object') {
        const err = error as Record<string, unknown>;
        return !!(
            err.message === 'NEXT_REDIRECT' ||
            (typeof err.digest === 'string' && err.digest.startsWith('NEXT_REDIRECT'))
        );
    }
    return false;
};

export const authHeader = async () => {
    const token = await getJwtToken();
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

export const serverFetch = async <T>(path: string): Promise<T> => {
    try {
        const token = await getJwtToken();

        const headers: Record<string, string> = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${baseUrl}${path}`, {
            headers: headers,
            cache: 'no-store'
        });

        return await handleStatusCode<T>(res);
    } catch (error) {
        if (isNextRedirect(error)) throw error;
        console.error(`Fetch failure on path [${path}]:`, error);
        throw error;
    }
};

export const serverMutation = async <T>(
    path: string,
    data: unknown,
    method: "POST" | "PUT" | "DELETE" | "PATCH" = "POST"
): Promise<T> => {
    try {
        const token = await getJwtToken();

        // Create the headers object explicitly
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Conditionally add the authorization property
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: headers, // Now this is always a clean Record<string, string>
            body: JSON.stringify(data)
        });

        return await handleStatusCode<T>(res);
    } catch (error) {
        if (isNextRedirect(error)) throw error;
        throw error;
    }
};

export const handleStatusCode = async <T>(res: Response): Promise<T> => {
    if (res.status === 401) redirect('/unauthorized');
    if (res.status === 403) redirect('/forbidden');
    return await res.json() as T;
};