import { use } from 'react';
import { Settings } from 'lucide-react';

import Heading from '@/components/Heading';
import SubscriptionButton from '@/components/buttons/SubscriptionButton';
import getCurrentUser from '@/utils/helpers/getCurrentUser';
import { checkSubscription } from '@/server/handlers/subscription';

const SettingsPage = () => {
  const user = use(getCurrentUser());
  const isPro = use(checkSubscription(user?.id as string));
  return (
    <div>
      <Heading
        title='Settings'
        description='Manage your account settings.'
        icon={Settings}
        iconColor='text-gray-700'
        bg='bg-gray-700/10'
      />
      <div className='px-4 lg:px-8 space-y-4'>
        <div className='text-muted-foreground text-sm'>
          {isPro ? 'You are subscribed to Pro.' : 'You are currently on a free plan.'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
