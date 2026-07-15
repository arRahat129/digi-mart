'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { RiLoader2Fill } from "react-icons/ri";

export default function ForbiddenPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);
    function useMounted() {
        const [mounted, setMounted] = useState(false);
        useEffect(() => {
            setMounted(true);
        }, []);
        return mounted;
    }
    const mounted = useMounted();

    const handleSignOut = async () => {
        setIsSigningOut(true);
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/signin");
                    router.refresh();
                }
            }
        });
        setIsSigningOut(false);
    };

    if (!mounted || isPending) return null;

    const hasUser = !!session?.user;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-lg w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-2xl">
                    <FiAlertTriangle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>

                <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
                    Access Forbidden
                </h2>

                <p className="text-slate-600 dark:text-slate-400">
                    You have sufficient authentication, but you do not have the necessary
                    permissions to view this specific resource.
                    {hasUser && " If you think this is a mistake, try signing out and using a different account."}
                </p>

                <div className="flex flex-col gap-4 pt-4">
                    {hasUser ? (
                        <button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSigningOut && <RiLoader2Fill className="w-5 h-5 animate-spin" />}
                            {isSigningOut ? "Signing out..." : "Clear Session & Sign Out"}
                        </button>
                    ) : (
                        <Link
                            href="/auth/signin"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all text-center"
                        >
                            Sign In
                        </Link>
                    )}

                    <button
                        onClick={() => router.push('/')}
                        className="w-full py-3 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}