import { requireRole } from "@/lib/core/session";
import React from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}


const AdminLayout = async ({ children }: AdminLayoutProps) => {
    await requireRole('admin');
    return children;
};

export default AdminLayout;