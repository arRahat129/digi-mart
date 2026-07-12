'use server';

import { headers } from "next/headers";
import { auth } from "../auth";

// Define a type based on your Better Auth instance output
type UserSession = typeof auth.$Infer.Session.user;

export const getUserSession = async (): Promise<UserSession | null> => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user || null;
};