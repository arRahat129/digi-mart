import DashboardSidebar from '@/components/dashboard/DashboardSidebard';
import React from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen py-10 px-2 md:px-5 gap-2 transition-colors duration-300">
            <DashboardSidebar />
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    );
}