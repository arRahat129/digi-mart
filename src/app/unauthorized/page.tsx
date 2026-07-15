import Link from "next/link";

export default function UnauthorizedPage() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="text-9xl font-black text-blue-600 dark:text-blue-400">401</h1>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Authentication Required</h2>
                <p className="text-slate-600 dark:text-slate-400">
                    You are not currently logged in. Please sign in to continue accessing our platform.
                </p>

                <div className="flex flex-col gap-3">
                    <a
                        href="/auth/signin"
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all text-center"
                    >
                        Sign In
                    </a>
                    
                    <Link
                        href={'/'}
                        className="w-full py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}