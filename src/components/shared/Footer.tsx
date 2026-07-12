import React from "react";
import Link from "next/link";
import { Link as HeroLink } from "@heroui/react";
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import logoImg from "@/assets/images/DigiMartLogo.png"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const productLinks = [
        { name: "Features", href: "/#features" },
        { name: "Documentation", href: "/docs" },
        { name: "Pricing", href: "/pricing" },
        { name: "Changelog", href: "/changelog" },
    ];

    const companyLinks = [
        { name: "About Us", href: "/about" },
        { name: "Community", href: "/community" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy" },
    ];

    const socialLinks = [
        { icon: <FiGithub className="w-5 h-5" />, href: "https://github.com/arRahat129", label: "GitHub" },
        { icon: <FiTwitter className="w-5 h-5" />, href: "https://x.com/A_R_Rahat", label: "Twitter" },
        { icon: <FiLinkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/mohammad-ashikur-rahman-rahat", label: "LinkedIn" },
    ];

    return (
        <footer className="w-full text-slate-600 dark:text-slate-400 font-sans border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

                {/* Main Grid Hierarchy */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-12">

                    {/* Brand Column */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-mono font-bold text-lg tracking-wider">
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
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed max-w-xs">
                            {"Optimized data monitoring and system health processing architecture."}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            {socialLinks.map((social, idx) => (
                                <HeroLink
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </HeroLink>
                            ))}
                        </div>
                    </div>

                    {/* Product Links Column */}
                    <div>
                        <h3 className="text-xs font-bold font-mono uppercase text-slate-800 dark:text-slate-200 tracking-widest mb-4">
                            {"Product"}
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {productLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links Column */}
                    <div>
                        <h3 className="text-xs font-bold font-mono uppercase text-slate-800 dark:text-slate-200 tracking-widest mb-4">
                            {"System"}
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {companyLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* System Contact Column */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold font-mono uppercase text-slate-800 dark:text-slate-200 tracking-widest mb-4">
                            {"Contact Node"}
                        </h3>
                        <div className="flex items-start gap-2.5 text-sm">
                            <FiMail className="w-4 h-4 mt-0.5 text-slate-400 dark:text-slate-500" />
                            <HeroLink
                                href="mailto:ops@keenkeeper.io"
                                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 text-sm transition-colors"
                            >
                                {"rahashik129@gmail.com"}
                            </HeroLink>
                        </div>
                        <div className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                            <FiMapPin className="w-4 h-4 mt-0.5 text-slate-400 dark:text-slate-500" />
                            <span className="leading-relaxed">
                                {"Grid Sector 7, Suite 404"}<br />
                                {"Tech District, CA 94103"}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Separator / Footer Bottom */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-600 font-mono">
                    <div>
                        {`© ${currentYear} DigiMart Inc. All environments verified.`}
                    </div>
                    <div className="flex items-center gap-6">
                        <span>{"STATUS: 200 OK"}</span>
                        <span>{"V3-TURBO ENGINE"}</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}