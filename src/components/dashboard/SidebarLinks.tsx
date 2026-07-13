"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiHome,
    FiShoppingBag,
    FiTag,
    FiTrendingUp,
    FiMessageSquare,
    FiSettings,
    FiUsers,
    FiPercent,
    FiAlertTriangle
} from "react-icons/fi";
import { FaHouse, FaSellcast } from "react-icons/fa6";
import { BsHouse } from "react-icons/bs";

export type UserRole = "user" | "admin";

interface UserProp {
    role?: UserRole;
    name?: string;
    email?: string;
}

interface SidebarLinksProps {
    user?: UserProp | null;
}

interface SidebarRoute {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ user }) => {
    const pathname = usePathname();
    const userRole: UserRole = user?.role === "admin" ? "admin" : "user";

    const userNavLinks: SidebarRoute[] = [
        { label: "Home", path: '/', icon: FaHouse},
        { label: "Dashboard", path: `/dashboard/user`, icon: BsHouse},
        { label: "Sell Item", path: `/dashboard/user/sell-item`, icon: FaSellcast },
        { label: "My Listings (To Sell)", path: "/dashboard/user/my-listings", icon: FiTag },
        { label: "My Purchases", path: "/dashboard/user/my-purchases", icon: FiShoppingBag },
        { label: "Inbox Messages", path: "/dashboard/user/messages", icon: FiMessageSquare },
        { label: "Store Settings", path: "/dashboard/user/settings", icon: FiSettings },
    ];
    
    const adminNavLinks: SidebarRoute[] = [
        { label: "Home", path: '/', icon: FaHouse},
        { label: "Dashboard", path: `/dashboard/${userRole}`, icon: BsHouse},
        { label: "Admin Analytics", path: "/dashboard/admin", icon: FiHome },
        { label: "Manage Users", path: "/dashboard/admin/all-users", icon: FiUsers },
        { label: "All Product Listings", path: "/dashboard/admin/all-listings", icon: FiTag },
        { label: "Platform Payments", path: "/dashboard/admin/payments", icon: FiPercent },
        { label: "Reported Items", path: "/dashboard/admin/reports", icon: FiAlertTriangle },
        { label: "Global Settings", path: "/dashboard/admin/settings", icon: FiSettings },
    ];

    const navigationItems = userRole === "admin" ? adminNavLinks : userNavLinks;

    return (
        <nav className="flex flex-col gap-1 w-full">
            {navigationItems.map((route) => {
                const isActive = pathname === route.path;
                const IconComponent = route.icon;

                return (
                    <Link
                        key={route.path}
                        href={route.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group
                            ${isActive
                                ? "bg-blue-600/10 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                            }`}
                    >
                        <IconComponent
                            className={`w-4 h-4 transition-colors 
                                ${isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                                }`}
                        />
                        <span>{route.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default SidebarLinks;