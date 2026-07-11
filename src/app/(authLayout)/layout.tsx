import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="w-full min-h-fit flex flex-col justify-center items-center">
                {children}
            </div>
        </div>
    );
}