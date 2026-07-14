import MyListingsDisplay from '@/components/dashboard/user/MyListingsDisplay';
import { getAllSellItemIndividualUser } from '@/lib/api/sell-item';
// import { getIndividualUserInfo } from '@/lib/api/user';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { HiPlus } from 'react-icons/hi';

type ExpectedListingItem = React.ComponentProps<typeof MyListingsDisplay>['items'][number];

const MyListingsPage = async () => {
    const sessionUser = await getUserSession();
    // console.log(sessionUser);

    if (!sessionUser?.id) {
        redirect('/unauthorized');
    }

    // const userResponse = await getIndividualUserInfo(sessionUser?.id);
    // console.log(userResponse);

    const individualUserItems = await getAllSellItemIndividualUser(sessionUser.id) as { data: ExpectedListingItem[] };

    const itemsArray = Array.isArray(individualUserItems?.data) ? individualUserItems.data : [];

    // console.log("📦 User Listings Response Data:", individualUserItems);
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 mt-16 transition-colors duration-200">
            <div className="max-w-6xl mx-auto">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                            All My Listings
                        </h2>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Manage and keep track of all the items you have published for sale on the marketplace.
                        </p>
                    </div>

                    {
                        itemsArray.length > 0 ? (
                            <Link
                                href="/dashboard/user/sell-item"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#244D3F] hover:bg-[#1a382e] active:scale-[0.98] transition-all shadow-xs"
                            >
                                <HiPlus className="w-5 h-5" />
                                <span>Sell Product</span>
                            </Link>
                        )
                            : null
                    }
                </div>

                <MyListingsDisplay
                    items={itemsArray}
                />
            </div>
        </div>
    );
};

export default MyListingsPage;