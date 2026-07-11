"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, CardHeader, Input, Separator } from "@heroui/react";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiUploadCloud, FiHome, FiGrid } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import DigiMartLogo from '@/assets/images/DigiMartLogo.png';
import ThemeToggle from '@/components/ThemeToggle';

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <nav className="w-full max-w-md flex items-center justify-between rounded-2xl border border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl px-5 py-3 shadow-lg shadow-blue-100/50 dark:shadow-black/20">
                <Link href="/" className="flex items-center">
                    <Image
                        src={DigiMartLogo}
                        alt="DigiMart Logo"
                        width={50}
                        height={35}
                        className="object-contain dark:brightness-110"
                        priority
                    />
                </Link>
                <div className="flex items-center gap-2 text-sm font-semibold">
                    <Link href="/" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all text-slate-600 hover:bg-blue-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400">
                        <FiHome className="w-4 h-4" />
                        <span>Home</span>
                    </Link>
                    <Link href="/items" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all text-slate-800 hover:bg-blue-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400">
                        <FiGrid className="w-4 h-4" />
                        <span>All Items</span>
                    </Link>
                    <ThemeToggle
                        isIconOnly={false}
                        variant="outline"
                        className="rounded-xl bg-transparent text-slate-600 hover:bg-blue-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    />
                </div>
            </nav>

            <main className="w-full max-w-md my-auto py-6">
                <Card className="w-full p-6 sm:p-8 border border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-100/40 dark:shadow-black/20 flex flex-col gap-6">
                    <CardHeader className="flex flex-col items-start p-0 gap-1 bg-transparent">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            Join DigiMart
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
                            Start selling electronics, appliances, and home goods directly.
                        </p>
                    </CardHeader>

                    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Full Name</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-slate-400 dark:text-slate-500">
                                    <FiUser className="w-4 h-4" />
                                </span>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm font-medium focus:outline-hidden"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Email Address</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-slate-400 dark:text-slate-500">
                                    <FiMail className="w-4 h-4" />
                                </span>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm font-medium focus:outline-hidden"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Password</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-slate-400 dark:text-slate-500">
                                    <FiLock className="w-4 h-4" />
                                </span>
                                <Input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Create secure password"
                                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm font-medium focus:outline-hidden"
                                />
                                <button
                                    type="button"
                                    onClick={toggleVisibility}
                                    className="absolute right-3 focus:outline-hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    {isVisible ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Profile Image</span>
                            <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
                                <FiUploadCloud className="w-5 h-5 text-slate-400 shrink-0" />
                                <span className="text-xs font-medium truncate">Upload configuration profile file...</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-6 mt-2 font-bold bg-blue-600 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-blue-700 dark:hover:bg-cyan-300 transition-all rounded-xl text-sm border-none shadow-xs"
                        >
                            Sign Up
                        </Button>
                    </form>

                    <div className="flex items-center gap-3 w-full my-1">
                        <Separator className="flex-1 bg-slate-200 dark:bg-slate-800" orientation="horizontal" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">OR</span>
                        <Separator className="flex-1 bg-slate-200 dark:bg-slate-800" orientation="horizontal" />
                    </div>

                    <Button
                        variant="outline"
                        className="w-full py-6 font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl text-sm flex items-center justify-center gap-2 transition-all bg-transparent"
                    >
                        <FcGoogle className="w-5 h-5 shrink-0" />
                        <span>Sign Up with Google</span>
                    </Button>

                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="font-bold text-blue-600 dark:text-cyan-400 hover:underline">
                            Sign In Here
                        </Link>
                    </p>
                </Card>
            </main>
        </div>
    );
}