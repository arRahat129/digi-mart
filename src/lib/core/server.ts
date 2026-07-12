'use server';

import { redirect } from "next/navigation";

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

export const serverFetch = async <T>(path: string): Promise<T> => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            cache: 'no-store'
        });

        return await handleStatusCode<T>(res);
    } catch (error) {
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
        const res = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await handleStatusCode<T>(res);
    } catch (error) {
        if (isNextRedirect(error)) throw error;
        throw error;
    }
};

export const handleStatusCode = async <T>(res: Response): Promise<T> => {
    if (res.status === 401) {
        redirect('/unauthorized');
    }
    if (res.status === 403) {
        redirect('/forbidden');
    }

    return await res.json() as T;
};