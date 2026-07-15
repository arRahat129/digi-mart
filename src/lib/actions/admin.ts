'use server';

import { revalidatePath } from 'next/cache';
import { deleteProductAdmin, deleteUser, getAllItemsAdmin, Item, toggleFeaturedProduct, updateUserRole } from '../api/admin';

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

export const actionGetAllItemsAdmin = async (page: number = 1) => {
    return await getAllItemsAdmin(page);
};

export const actionToggleFeaturedProduct = async (itemId: string, productDetails: Item) => {
    try {
        const result = await toggleFeaturedProduct(itemId, productDetails);
        revalidatePath('/dashboard/products'); // Ensure this matches your route
        return result;
    } catch (error) {
        console.error("Action Error: Failed to toggle featured status", error);
        throw error;
    }
};

export const actionDeleteProduct = async (itemId: string) => {
    try {
        const result = await deleteProductAdmin(itemId);
        revalidatePath('/dashboard/products');
        return result;
    } catch (error) {
        console.error("Action Error: Failed to delete product", error);
        throw error;
    }
};