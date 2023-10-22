/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';

import Button from '@/components/buttons/Button';
import { trpc } from '@/providers/trpcProvider';
import cn from '@/utils/helpers/cn';

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false } : SubscriptionButtonProps) => {
  const router = useRouter();

  const { isLoading, mutate } = trpc.payment.session.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ data }) => {
      if (!data) {
        toast.error('There was an error creating your subscription, please try again later.');
      }
      router.push(data as any);
    },
    retry: false,
  });

  return (
    <Button
      color={isPro ? 'primary' : 'premium'}
      disabled={isLoading}
      onPress={() => mutate()}
      className={cn('px-4 py-2 text-md', isPro && 'text-white')}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  );
};

export default SubscriptionButton;
