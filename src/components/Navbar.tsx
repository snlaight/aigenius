import { use } from 'react';
import { UserButton } from '@clerk/nextjs';

import MobileSidebar from '@/components/menus/MobileSidebar';
import { getApiLimitCount } from '@/server/handlers/user';
import { checkSubscription } from '@/server/handlers/subscription';
import getCurrentUser from '@/utils/helpers/getCurrentUser';

const Navbar = () => {
  const user = use(getCurrentUser());
  const apiLimitCount = use(getApiLimitCount(user?.id as string));
  const isPro = use(checkSubscription(user?.id as string));

  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro as boolean} />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
