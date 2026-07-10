'use client';

import React, { useState } from 'react';
import { Button, Separator } from "@heroui/react";
import { FiMenu, FiX, FiHome, FiPackage, FiDollarSign } from 'react-icons/fi';
import logoImg from '@/assets/images/DigiMartLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const routes = [
        { name: 'Home', path: '/', icon: <FiHome className="w-4 h-4" /> },
        { name: 'All Items', path: '/items', icon: <FiPackage className="w-4 h-4" /> },
        { name: 'Pricing', path: '/pricing', icon: <FiDollarSign className="w-4 h-4" /> }
    ];

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-blue-50/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-blue-100 dark:border-blue-950 text-slate-800 dark:text-slate-100 shadow-sm">
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">

                <div className="flex-1 flex justify-start">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded">
                            <Image
                                src={logoImg}
                                alt="DigiMart Logo"
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            DigiMart
                        </span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center justify-center space-x-6 flex-1">
                    {routes.map((route, idx) => {
                        const isActive = pathname === route.path;
                        return (
                            <Link
                                key={idx}
                                href={route.path}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 relative py-1
                                    ${isActive
                                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                                        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    }`}
                            >
                                {route.icon}
                                <span>{route.name}</span>
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle
                            isIconOnly={false}
                            variant="outline"
                            className="border-none text-slate-300 hover:text-blue-400"
                        />
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium rounded-lg shadow-md shadow-blue-500/20 transition-all">
                            Login
                        </Button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className=" inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-blue-50 dark:bg-slate-900 backdrop-blur-md border-t border-blue-100 dark:border-blue-950">
                    <div className="flex flex-col space-y-1">
                        {routes.map((route, idx) => {
                            const isActive = pathname === route.path;
                            return (
                                <Link
                                    key={idx}
                                    href={route.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-3 rounded-md bg-transparent px-3 py-2.5 text-base font-medium transition-colors
                                        ${isActive
                                            ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-l-2 border-blue-600"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    <span
                                        className={
                                            isActive
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-slate-500 dark:text-slate-400"
                                        }
                                    >
                                        {route.icon}
                                    </span>
                                    <span>{route.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <Separator className="bg-blue-950/60" />

                    <div className="flex flex-col gap-3 pt-1">
                        <div className="flex justify-start px-1">
                            <ThemeToggle
                                isIconOnly={false}
                                variant="outline"
                                className=" border-none bg-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 justify-center w-full
"
                            />
                        </div>
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium rounded-lg shadow-md shadow-blue-500/20 transition-all">
                            Login
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;