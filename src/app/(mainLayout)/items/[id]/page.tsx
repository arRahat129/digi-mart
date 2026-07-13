import { RelatedAdverts } from '@/components/all-items/RelatedAdverts';
import { ActionSidebar } from '@/components/item-details/ActionSidebar';
import { DescriptionPanel } from '@/components/item-details/DescriptionPanel';
import { ItemOverview } from '@/components/item-details/ItemOverView';
import { MediaShowcase } from '@/components/item-details/MediaShowcase';
import { getRelatedProducts, getSingleSellItem, RelatedItem } from '@/lib/api/sell-item';
import React from 'react';

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
    // console.log(id)
    const itemId = typeof id === 'string' ? id : '';

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
                            price={itemData.price}
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