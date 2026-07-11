"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, Input, Separator } from "@heroui/react";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiUploadCloud, FiHome, FiGrid, FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { signUp } from '@/lib/auth-client';
import DigiMartLogo from '@/assets/images/DigiMartLogo.png';
import ThemeToggle from '@/components/ThemeToggle';

export default function SignUpPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("File size exceeds 5MB limit");
            toast.error("File size exceeds 5MB limit");
            return;
        }

        setIsUploading(true);
        setError("");

        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setImage(data.data.url);
                toast.success("Image uploaded successfully");
            } else {
                setError("Upload failed. Please try again.");
                toast.error("Upload failed");
            }
        } catch (uploadError) {
            console.error(uploadError);
            setError("Network error occurred during image upload.");
            toast.error("Network error during upload");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setImage("");
        const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        const finalImageUrl = image.trim() || "https://i.ibb.co.com/216mxB4J/user-Sample.png";

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                image: finalImageUrl,
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
                toast.error(authError.message || "Signup failed");
                return;
            }

            setSuccess("Account created successfully!");
            toast.success(`Signed up successfully!, Welcome ${data?.user?.name}`);

            setName("");
            setEmail("");
            setImage("");
            setPassword("");
            setConfirmPassword("");
            router.push('/');

        } catch (networkError) {
            console.error(networkError);
            setError("An unexpected network error occurred.");
            toast.error(`ERROR OCCURRED`);
        } finally {
            setIsLoading(false);
        }
    };

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

                    {error && (
                        <div className="text-xs font-semibold p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-xs font-semibold p-3 rounded-xl bg-green-50 text-green-600 border border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50">
                            {success}
                        </div>
                    )}

                    <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Full Name</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 z-10 text-slate-400 dark:text-slate-500">
                                    <FiUser className="w-4 h-4" />
                                </span>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm font-medium focus:outline-hidden"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Email Address</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 z-10 text-slate-400 dark:text-slate-500">
                                    <FiMail className="w-4 h-4" />
                                </span>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm font-medium focus:outline-hidden"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Password</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 z-10 text-slate-400 dark:text-slate-500">
                                    <FiLock className="w-4 h-4" />
                                </span>
                                <Input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Create secure password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-9 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm font-medium focus:outline-hidden"
                                />
                                <button
                                    type="button"
                                    onClick={toggleVisibility}
                                    className="absolute right-3 z-10 focus:outline-hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    {isVisible ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Confirm Password</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 z-10 text-slate-400 dark:text-slate-500">
                                    <FiLock className="w-4 h-4" />
                                </span>
                                <Input
                                    type={isConfirmVisible ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-9 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm font-medium focus:outline-hidden"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmVisibility}
                                    className="absolute right-3 z-10 focus:outline-hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    {isConfirmVisible ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Profile Image</span>

                            {image ? (
                                <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                                        <Image
                                            src={image}
                                            alt="Profile Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate w-full">Image uploaded successfully</span>
                                        <Button
                                            type="button"
                                            variant="danger-soft"
                                            onClick={handleRemoveImage}
                                            className="px-2 h-7 rounded-lg text-xs font-semibold flex items-center gap-1.5 border-none"
                                        >
                                            <FiX className="w-3.5 h-3.5" />
                                            <span>Cancel Image</span>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
                                    <FiUploadCloud className="w-5 h-5 text-slate-400 shrink-0" />
                                    <span className="text-xs font-medium truncate">{isUploading ? "Uploading..." : "Upload layout profile image..."}</span>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <Button
                            type="submit"
                            isDisabled={isUploading || isLoading}
                            className="w-full py-6 mt-2 font-bold bg-blue-600 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-blue-700 dark:hover:bg-cyan-300 transition-all rounded-xl text-sm border-none shadow-xs"
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
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