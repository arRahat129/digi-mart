import { getDashboardAnalytics } from '@/lib/api/analytics';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const UserDashboard = async () => {
    const user = await getUserSession();
    const { data } = await getDashboardAnalytics(user?.id as string);
    console.log(data);
    return (
        <div>
            <h2>User Dashboard</h2>
        </div>
    );
};

export default UserDashboard;