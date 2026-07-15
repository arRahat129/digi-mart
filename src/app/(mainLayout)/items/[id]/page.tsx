import { RelatedAdverts } from '@/components/all-items/RelatedAdverts';
import { ActionSidebar } from '@/components/item-details/ActionSidebar';
import { DescriptionPanel } from '@/components/item-details/DescriptionPanel';
import { ItemOverview } from '@/components/item-details/ItemOverView';
import { MediaShowcase } from '@/components/item-details/MediaShowcase';
import { getRelatedProducts, getSingleSellItem, RelatedItem } from '@/lib/api/sell-item';
import { getUserSession } from '@/lib/core/session';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FiLock, FiLogIn } from 'react-icons/fi';

interface PageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface ItemDoc {
    _id: { $oid: string } | string;
    title: string;
    category: string;
    description: string;
    price: string;
    conditionYears: string;
    purchaseDate: string;
    imageUrl: string;
    contactMethod: string;
    contactDetails: string;
    sellerMessage: string;
    address: string;
    userId: string;
    userName: string;
    userImage: string;
    userRole: string;
    status: string;
    availability: string;
    created_at: { $date: string } | string;
}

const ItemDetailsPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const sessionUser = await getUserSession();
    const itemId = typeof id === 'string' ? id : '';


    if (!sessionUser?.id) {
        return (
            <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16 px-4 flex items-center justify-center">
                <div className="w-full max-w-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 bg-white/50 dark:bg-slate-900/50 shadow-2xl backdrop-blur-xl">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                        <FiLock size={28} className="animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Authentication Required
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                            Sign in to access the full details, seller contact methods, and architecture of this item listing.
                        </p>
                    </div>
                    <Link href={`/auth/signin?redirect=/items/${itemId}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                            <FiLogIn size={16} />
                            Sign In to Access
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }


    // console.log(id)

    if (!itemId) {
        return (
            <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16 px-4 flex items-center justify-center">
                <p className="text-sm text-zinc-500">No item identifier provided.</p>
            </div>
        );
    }

    const response = await getSingleSellItem<ItemDoc>(itemId);

    if (!response || !response.success || !response.data) {
        return (
            <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16 px-4 flex items-center justify-center">
                <p className="text-sm text-zinc-500">{response?.message || 'Failed to load item details.'}</p>
            </div>
        );
    }

    const itemData = response.data;
    const isAvailable = itemData.availability === 'available';

    let relatedProducts: RelatedItem[] = [];
    try {
        const relatedResponse = await getRelatedProducts(itemData.userId, itemData.category);
        if (relatedResponse.success && relatedResponse.similarProducts) {
            relatedProducts = relatedResponse.similarProducts.filter(item => {
                const fetchedId = typeof item._id === 'object' ? item._id.toString() : item._id;
                return fetchedId !== itemId;
            });
        }
    } catch (err) {
        console.error(err);
    }

    const dateStr = typeof itemData.created_at === 'object' && itemData.created_at.$date
        ? itemData.created_at.$date
        : (itemData.created_at as string);

    const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <MediaShowcase
                            imageUrl={itemData.imageUrl}
                            title={itemData.title}
                        />
                        <ItemOverview
                            title={itemData.title}
                            category={itemData.category}
                            address={itemData.address}
                            conditionYears={itemData.conditionYears}
                            purchaseDate={itemData.purchaseDate}
                            isAvailable={isAvailable}
                            formattedDate={formattedDate}
                        />
                        <DescriptionPanel
                            description={itemData.description}
                            sellerMessage={itemData.sellerMessage}
                        />
                    </div>
                    <aside>
                        <ActionSidebar
                            itemId={id as string}
                            price={itemData.price}
                            userId={itemData.userId}
                            userImage={itemData.userImage}
                            userName={itemData.userName}
                            userRole={itemData.userRole}
                            contactMethod={itemData.contactMethod}
                            contactDetails={itemData.contactDetails}
                            isAvailable={isAvailable}
                        />
                    </aside>
                </div>
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                        Similar Recommended Adverts
                    </h2>
                    <RelatedAdverts items={relatedProducts} />
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsPage;