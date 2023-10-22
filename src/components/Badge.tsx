/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import { Chip, type ChipProps } from '@nextui-org/react';
import cn from '@/utils/helpers/cn';

type BadgeProps = Omit<ChipProps, 'color'>

interface BadgeComponentProps extends BadgeProps {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'danger' | 'premium' | undefined;
}

const Badge = ({ children, color, ...props }: BadgeComponentProps) => {
  const BadgeVariants = {
    primary: cn('bg-primary-500 text-white'),
    secondary: cn('bg-secondary-500 text-white'),
    default: cn('bg-default-500 text-white'),
    success: cn('bg-success-500 text-white'),
    danger: cn('bg-danger-500 text-white'),
    premium: cn('bg-premium-500 text-white'),
  };
  return (
    <Chip className={cn(BadgeVariants[color as keyof typeof BadgeVariants])} {...props}>
      {children}
    </Chip>
  );
};

export default Badge;
