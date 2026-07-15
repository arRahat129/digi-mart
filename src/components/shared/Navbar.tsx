'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Separator, Avatar, Skeleton } from "@heroui/react";
import { FiMenu, FiX, FiHome, FiPackage, FiDollarSign, FiLogOut, FiLayout, FiChevronDown } from 'react-icons/fi';
import logoImg from '@/assets/images/DigiMartLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import { useSession, signOut } from '@/lib/auth-client';

interface UserWithRole {
    role?: string;
}

const Navbar: React.FC = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<boolean>(false);
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState<boolean>(false);

    const desktopDropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { data: session, isPending } = useSession();

    const user = session?.user;
    const userRole = (user as UserWithRole)?.role || 'user';

    const routes = [
        { name: 'Home', path: '/', icon: <FiHome className="w-4 h-4" /> },
        { name: 'All Items', path: '/items', icon: <FiPackage className="w-4 h-4" /> },
        // { name: 'Pricing', path: '/pricing', icon: <FiDollarSign className="w-4 h-4" /> }
    ];

    // Close desktop menu if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
                setIsDesktopDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMobileAction = (action: () => void) => {
        setIsMobileDropdownOpen(false);
        setIsMenuOpen(false);
        action();
    };

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/auth/signin');
                },
            },
        });
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-blue-50/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-blue-100 dark:border-blue-950 text-slate-800 dark:text-slate-100 shadow-sm">
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">

                {/* Logo Section */}
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

                {/* Desktop Navigation Links */}
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

                {/* Right Side Utility Controls */}
                <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle
                            isIconOnly={false}
                            variant="outline"
                            className="border-none text-slate-500 hover:text-blue-400"
                        />
                        {isPending ? (
                            <Skeleton className="flex h-10 w-10 rounded-full" />
                        ) : !user ? (
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 transition hover:text-blue-700 dark:hover:text-blue-500"
                                >
                                    Login
                                </Link>
                                <Link href="/auth/signup">
                                    <Button
                                        className="h-11 bg-blue-600 dark:bg-blue-100 px-6 text-sm font-semibold text-white dark:text-blue-700 hover:bg-blue-700 shadow-md shadow-blue-200"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            /* Desktop Profile Dropdown (Completely Fixed & Refactored) */
                            <div className="relative" ref={desktopDropdownRef}>
                                <button
                                    onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                                    className="flex items-center gap-3 text-left cursor-pointer rounded-xl p-1 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus:outline-hidden group"
                                >
                                    <div className="relative">
                                        <Avatar className="h-10 w-10 text-xs border border-blue-200 dark:border-slate-700">
                                            <Avatar.Image
                                                alt={user.name || "User Avatar"}
                                                src={user.image || ""}
                                                referrerPolicy="no-referrer"
                                            />
                                            <Avatar.Fallback>
                                                {user.name ? user.name[0].toUpperCase() : "U"}
                                            </Avatar.Fallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col max-w-30">
                                        <span className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">{user?.name}</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{user?.email}</span>
                                    </div>
                                    <FiChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isDesktopDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Desktop Menu Items Dropdown Panel */}
                                {isDesktopDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-xl shadow-lg py-1.5 z-50 transition-all duration-200">
                                        <Link
                                            href={`/dashboard/${userRole || 'user'}`}
                                            onClick={() => setIsDesktopDropdownOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors w-full"
                                        >
                                            <FiLayout className="w-4 h-4 text-slate-500" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsDesktopDropdownOpen(false);
                                                handleSignOut();
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full text-left"
                                        >
                                            <FiLogOut className="w-4 h-4" />
                                            <span>Log Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Menu Trigger */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                setIsMobileDropdownOpen(false);
                            }}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Navigation Panel (ORIGINAL UNTOUCHED CODE) */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-50 dark:bg-slate-900 backdrop-blur-md border-t border-blue-100 dark:border-blue-950 px-4 py-4 flex flex-col gap-4">
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
                                    <span className={isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}>
                                        {route.icon}
                                    </span>
                                    <span>{route.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <Separator className="bg-blue-200 dark:bg-blue-950" />

                    {isPending ? (
                        <div className="flex items-center gap-3 px-3 py-2">
                            <Skeleton className="flex h-10 w-10 rounded-full" />
                            <div className="flex flex-col gap-1 w-full">
                                <Skeleton className="h-3 w-24 rounded-lg" />
                                <Skeleton className="h-2 w-32 rounded-lg" />
                            </div>
                        </div>
                    ) : user ? (
                        /* Mobile Profile Dropdown Configuration */
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                                className="flex items-center justify-between w-full rounded-xl p-2 bg-white dark:bg-slate-800/40 border border-blue-100 dark:border-slate-800 text-left focus:outline-hidden"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 text-xs border border-blue-200 dark:border-slate-700">
                                        <Avatar.Image
                                            alt={user.name || "User Avatar"}
                                            src={user.image || ""}
                                            referrerPolicy="no-referrer"
                                        />
                                        <Avatar.Fallback>
                                            {user.name ? user.name[0].toUpperCase() : "U"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <div className="flex flex-col max-w-40">
                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user?.name}</span>
                                        <span className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</span>
                                    </div>
                                </div>
                                <FiChevronDown className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Mobile Dropdown Sub-menu Items */}
                            {isMobileDropdownOpen && (
                                <div className="flex flex-col gap-2 pl-2 mt-1 transition-all duration-200">
                                    <Link href={`/dashboard/${userRole || 'user'}`} onClick={() => handleMobileAction(() => { })} className="w-full">
                                        <Button
                                            variant="outline"
                                            className="w-full border-blue-200 dark:border-blue-900 text-slate-700 dark:text-slate-300 font-medium rounded-lg flex items-center justify-start gap-3 px-4"
                                        >
                                            <FiLayout className="w-4 h-4 text-slate-500" />
                                            <span>Dashboard</span>
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleMobileAction(() => handleSignOut())}
                                        variant="outline"
                                        className="w-full font-medium rounded-lg text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 flex items-center justify-start gap-3 px-4"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        <span>Log Out</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)} className="w-full">
                                <Button
                                    variant="outline"
                                    className="w-full border-blue-200 dark:border-blue-900 text-slate-700 dark:text-slate-300 font-medium rounded-lg"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)} className="w-full">
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium rounded-lg shadow-md shadow-blue-500/20 transition-all"
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}

                    <Separator className="bg-blue-200 dark:bg-blue-950" />

                    <div className="flex justify-start px-1">
                        <ThemeToggle
                            isIconOnly={false}
                            variant="outline"
                            className="border-none bg-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 justify-center w-full"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;