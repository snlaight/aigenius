import React from 'react';
import { type LucideIcon } from 'lucide-react';

import cn from '@/utils/helpers/cn';

interface HeadingProps {
  title: string;
  description: string;
  iconColor?: string;
  icon?: LucideIcon;
  bg?: string;
}

const Heading = ({ title, description, iconColor, icon: Icon, bg } : HeadingProps) => (
  <div className='flex flex-row'>
    <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-8'>
      <div className={cn('p-2 w-fit rounded-md', bg)}>
        {Icon && <Icon className={cn('w-10 h-10', iconColor)} />}
      </div>
    </div>
    <div>
      <h2 className='text-3xl font-bold'>{title}</h2>
      <p className='text-sm text-muted-foreground'>
        {description}
      </p>
    </div>
  </div>
);

export default Heading;
