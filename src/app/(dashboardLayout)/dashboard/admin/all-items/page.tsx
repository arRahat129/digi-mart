import { actionGetAllItemsAdmin } from '@/lib/actions/admin';
import AdminItemsClient from './AdminItemsClient';

export default async function AdminItemsPage({ searchParams }: { searchParams: { page?: string } }) {
    const page = Number(searchParams.page) || 1;
    const initialData = await actionGetAllItemsAdmin(page);

    return <AdminItemsClient initialData={initialData} currentPage={page} />;
}