'use client';

import { actionDeleteUser, actionUpdateUserRole } from '@/lib/actions/admin';
import { getAllUsers } from '@/lib/api/admin';
import { signOut, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: 'user' | 'admin';
    plan: string;
    location: string;
}

const AllUsersAdminView = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState({ totalPages: 1, totalUsers: 0 });
    const [loading, setLoading] = useState<boolean>(true);

    const [confirmAction, setConfirmAction] = useState<{
        type: 'delete' | 'role' | null;
        userId: string | null;
        newRole?: string;
    }>({ type: null, userId: null });

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                // Log what page we are requesting
                // console.log("Requesting page:", page);

                const res = await getAllUsers(page);

                // console.log("API Response:", res);

                if (res.success) {
                    setUsers(res.data || []);
                    setMeta(res.meta || { totalPages: 1, totalUsers: 0 });
                } else {
                    console.error("API Error message:", res.message);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page]);

    const handleExecuteAction = async () => {
        const { type, userId, newRole } = confirmAction;

        console.log("--- Action Started ---");
        console.log("Action Type:", type);
        console.log("User ID:", userId);
        console.log("New Role:", newRole);

        if (!userId) return;

        if (type === 'delete') {
            await actionDeleteUser(userId);
        } else if (type === 'role' && newRole) {
            await actionUpdateUserRole(userId, newRole);
        }

        // Refresh list after action
        const res = await getAllUsers(page);
        setUsers(res.data || []);
        setConfirmAction({ type: null, userId: null });

        // Session logic: Redirect if current user demotes themselves
        if (type === 'role' && session?.user?.id === userId && newRole === 'user') {
            await signOut();
            router.push('/');
        }
    };

    if (loading) return <div className="p-10 text-center dark:text-white">Loading users...</div>;

    return (
        <div className="p-4 md:p-6 bg-white dark:bg-slate-900 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage Users</h2>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-collapse dark:text-gray-300">
                    <thead>
                        <tr className="border-b dark:border-slate-700">
                            <th className="p-3">User</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Plan</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="border-b dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={u.image} alt={u.name} className="w-8 h-8 rounded-full" /> {u.name}
                                </td>
                                <td className="p-3">{u.role === 'admin' ? "Cannot Share" : u.email}</td>
                                <td className="p-3">
                                    <select
                                        value={u.role}
                                        onChange={(e) => setConfirmAction({ type: 'role', userId: u._id, newRole: e.target.value })}
                                        className="bg-transparent border rounded p-1 dark:border-slate-600"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-3">{u.role === 'admin' && "N/A"}</td>
                                <td className="p-3">
                                    <button onClick={() => setConfirmAction({ type: 'delete', userId: u._id })} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((u) => (
                    <div key={u._id} className="p-4 border rounded-xl dark:border-slate-700 dark:bg-slate-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={u.image} alt={u.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <h3 className="font-bold dark:text-white">{u.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {u.role === 'admin' ? "Cannot Share" : u.email}
                                </p>
                            </div>
                        </div>

                        <div className="text-sm space-y-3 mb-4 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <span>Role:</span>
                                <select
                                    value={u.role}
                                    onChange={(e) => setConfirmAction({ type: 'role', userId: u._id, newRole: e.target.value })}
                                    className="bg-transparent border rounded p-1 dark:border-slate-600"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {u.role !== 'admin' && <p>Loc: {u.location}</p>}
                        </div>

                        <button
                            onClick={() => setConfirmAction({ type: 'delete', userId: u._id })}
                            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-slate-700 disabled:opacity-50 rounded"
                >Prev</button>
                <span className="dark:text-white">Page {page} / {meta.totalPages}</span>
                <button
                    disabled={page >= meta.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-slate-700 disabled:opacity-50 rounded"
                >Next</button>
            </div>
            {confirmAction.type && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-2 dark:text-white">Confirm Action</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to {confirmAction.type === 'delete' ? 'permanently delete this user' : 'update this user\'s role'}?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmAction({ type: null, userId: null })}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded dark:border-slate-600 dark:text-white"
                            >Cancel</button>
                            <button
                                onClick={handleExecuteAction}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsersAdminView;