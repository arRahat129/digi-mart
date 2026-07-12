"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoPng from '@/assets/images/DigiMartLogo.png';
import { UserRole } from './SidebarLinks';
import ThemeToggle from '../ThemeToggle';

interface SidebarHeaderProps {
    user?: {
        role?: UserRole;
        name?: string;
        email?: string;
    } | null;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ user }) => (
    <div className="flex justify-between items-center pb-5 mb-3 border-b border-default w-full px-1">
        <Link href="/" className="flex items-center gap-2">
            <Image
                src={logoPng}
                alt="Digi Mart Logo"
                width={28}
                height={28}
                className="object-contain"
            />
            <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 dark:text-white tracking-wide leading-none">
                    Digi<span className="text-blue-600">Mart</span>
                </span>
                {user?.role === "admin" && (
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 tracking-wider uppercase mt-0.5 leading-none">
                        Admin Mode
                    </span>
                )}
            </div>
        </Link>
        <ThemeToggle />
    </div>
);

export default SidebarHeader;