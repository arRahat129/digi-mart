"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { Button, Avatar, Skeleton } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";
import { UserRole } from "./SidebarLinks";

interface SafeUser {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
}

export default function SidebarFooter() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const user = session?.user as SafeUser | undefined;

    if (isPending) {
        return (
            <div className="flex items-center gap-3 p-1 w-full">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                <div className="flex flex-col gap-1.5 w-full">
                    <Skeleton className="h-3.5 w-24 rounded-lg" />
                    <Skeleton className="h-3 w-32 rounded-lg" />
                </div>
            </div>
        );
    }

    if (!user) return null;

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/signin");
                    router.refresh();
                },
            },
        });
    };

    return (
        <div className="flex flex-col gap-3 w-full mb-10">
            <div className="flex items-center gap-3 p-1 text-left">
                <Avatar className="h-10 w-10 shrink-0 rounded-xl">
                    <Avatar.Image
                        alt={user?.name || "User Profile Avatar"}
                        src={user?.image || ""}
                        referrerPolicy="no-referrer"
                    />
                    <Avatar.Fallback>
                        {user?.name ? user?.name[0].toUpperCase() : "U"}
                    </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate leading-tight">
                        {user?.name}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5 leading-none">
                        {user?.email}
                    </span>
                </div>
            </div>

            {user?.role && (
                <div className="flex items-center px-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
                        {user?.role}
                    </span>
                </div>
            )}

            <Button
                size="sm"
                variant="danger"
                onClick={handleSignOut}
                className="w-full justify-start gap-2.5 px-3 py-2 h-9 rounded-xl text-xs font-semibold"
            >
                <FiLogOut className="size-4" />
                Log Out
            </Button>
        </div>
    );
}