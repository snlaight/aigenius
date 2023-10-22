import { use } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import getCurrentUser from '@/utils/helpers/getCurrentUser';
import { checkSubscription } from '@/server/handlers/subscription';
import { getApiLimitCount } from '@/server/handlers/user';

export const dynamic = 'force-dynamic';

const DashboardLayout = ({ children } : {children: React.ReactNode}) => {
  const user = use(getCurrentUser());
  const apiLimitCount = use(getApiLimitCount(user?.id as string));
  const isPro = use(checkSubscription(user?.id as string));

  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900'>
        <Sidebar isPro={isPro as boolean} apiLimitCount={apiLimitCount} />
      </div>
      <main className='md:pl-72 pb-10'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
