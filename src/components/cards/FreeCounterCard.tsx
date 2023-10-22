'use client';

import { Zap } from 'lucide-react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';

import Button from '@/components/buttons/Button';
import ProgressBar from '@/components/Progress';
import useProModal from '@/utils/hooks/useProModal';
import { MAX_FREE_COUNTS } from '@/utils/constants';

interface FreeCounterCardProps {
  isPro: boolean;
  apiLimitCount: number;
}

const FreeCounterCard = ({ isPro = false, apiLimitCount = 0 } : FreeCounterCardProps) => {
  const { onOpen } = useProModal();
  if (isPro) return null;
  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardBody className='py-6'>
          <div className='text-center text-sm text-white mb-5 space-y-2'>
            <p>
              {apiLimitCount}
              {' '}
              /
              {' '}
              {MAX_FREE_COUNTS}
              {' '}
              Free Generations
            </p>
            <ProgressBar
              size='lg'
              radius='lg'
              aria-label='Loading ...'
              classNames={{
                base: 'max-w-[100px] mx-auto',
                indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                value: 'text-foreground/60',
              }}
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}

            />
          </div>
        </CardBody>
        <CardFooter>
          <Button onPress={onOpen} color='premium' className='w-full'>
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FreeCounterCard;
