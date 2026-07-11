import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen transition-colors duration-300">
            <Navbar />
            <main className="grow flex flex-col w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}