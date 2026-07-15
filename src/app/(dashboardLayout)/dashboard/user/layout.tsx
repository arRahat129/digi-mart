import { requireRole } from "@/lib/core/session";
import React from "react";

interface UserLayoutProps {
    children: React.ReactNode;
}


const UserLayout = async ({ children }: UserLayoutProps) => {
    await requireRole('user');
    return children;
};

export default UserLayout;