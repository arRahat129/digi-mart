import SellItemForm from '@/components/dashboard/user/SellItemForm';
import { getIndividualUserInfo } from '@/lib/api/user';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
    title: 'List Your Item for Sale | Marketplace',
    description: 'Fill out the details below to publish your marketplace item directly.',
};

export default async function SellItemPage() {
    const sessionUser = await getUserSession();
    // console.log(sessionUser);

    if (!sessionUser?.id) {
        redirect('/unauthorized');
    }

    const userResponse = await getIndividualUserInfo(sessionUser?.id);
    // console.log(userResponse);
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 mt-16 transition-colors duration-200">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                        List Your Item for Sale
                    </h1>
                    <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
                        Fill out the details below to publish your marketplace item directly.
                    </p>
                </div>

                <SellItemForm user={userResponse?.data} />

            </div>
        </div>
    );
}