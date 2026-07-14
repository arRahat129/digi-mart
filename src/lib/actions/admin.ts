'use server';

import { revalidatePath } from 'next/cache';
import { deleteUser, updateUserRole } from '../api/admin';

// Action to update user role
export const actionUpdateUserRole = async (userId: string, role: string) => {
    try {
        const result = await updateUserRole(userId, role);
        revalidatePath('/dashboard/users'); // Revalidate the users list page
        return result;
    } catch (error) {
        console.error("Action Error: Failed to update role", error);
        throw error;
    }
};

// Action to delete a user
export const actionDeleteUser = async (userId: string) => {
    try {
        const result = await deleteUser(userId);
        revalidatePath('/dashboard/users');
        return result;
    } catch (error) {
        console.error("Action Error: Failed to delete user", error);
        throw error;
    }
};