import { actionGetAllItemsAdmin } from '@/lib/actions/admin';
import AdminItemsClient from './AdminItemsClient';

export const dynamic = 'force-dynamic'; // Forces Next.js to fetch new data on page navigations

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function AdminItemsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams.page) || 1;

    // Server action fetches fresh page data
    const initialData = await actionGetAllItemsAdmin(page);
    console.log('Fetching page:', page, 'Data counts:', initialData?.data?.length);

    return (
        <AdminItemsClient
            key={page} // Destroys previous client component states instantly on navigation
            initialData={initialData}
            currentPage={page}
        />
    );
}