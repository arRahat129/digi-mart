'use server';

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

type UserSession = typeof auth.$Infer.Session.user;

export const getUserSession = async (): Promise<UserSession | null> => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session?.user || null;
};

export const getJwtToken = async () => {
    const cookie = (await headers()).get("cookie");
    const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, {
        headers: { cookie: cookie ?? "" },
        cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.token;
};

export const requireRole = async (role: string) => {
    const user = await getUserSession();
    
    if (!user) {
        redirect('/unauthorized');
    }
    
    if (user.role !== role) {
        redirect('/forbidden');
    }
    
    return user;
};