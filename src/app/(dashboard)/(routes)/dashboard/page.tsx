'use client';

import { ArrowRight } from 'lucide-react';
import { Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import cn from '@/utils/helpers/cn';
import { tools } from '@/utils/constants';

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Explore the power of AI
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      {tools.map((tool) => (
        <Card
          key={tool.href}
          isPressable
          disableRipple
          onPress={() => router.push(tool.href)}
          className='p-4 w-4/5 mx-auto border-black/5 flex flex-row items-center justify-between hover:shadow-md transition cursor-pointer'
        >
          <CardBody className='flex flex-row items-center gap-x-4'>
            <div className={cn('p-2 w-fit rounded-md ', tool.bg)}>
              <tool.icon className={cn('w-8 h-8 ', tool.color)} />
            </div>
            <div className='font-semibold'>
              {tool.label}
            </div>
          </CardBody>
          <ArrowRight className='w-5 h-5' />
        </Card>
      ))}
    </div>
  );
};

export default DashboardPage;
