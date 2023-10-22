/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import NextImage from 'next/image';
import { Image, Card, CardHeader, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import Badge from '@/components/Badge';

interface ToolCardProps {
  src: string;
  href: string;
  title: string;
  description: string;
  premium?: boolean
}

const ToolCard = ({ src, href, title, description, premium } : ToolCardProps) => {
  const router = useRouter();

  return (
    <Card isPressable onPress={() => router.push(href)} className='group cursor-pointer'>
      <CardHeader>
        <div className='text-lg font-bold flex items-center'>
          <div className='relative h-8 w-8 mr-2 group-hover:scale-125 transition duration-150'>
            <Image as={NextImage} alt='icon' src={src} fill />
          </div>
          {title}
        </div>
        <CardBody>
          {description}
          {premium && (
            <div className='p-0'>
              <Badge color='premium' className='uppercase'> pro </Badge>
            </div>
          )}
        </CardBody>
      </CardHeader>
    </Card>
  );
};

export default ToolCard;
