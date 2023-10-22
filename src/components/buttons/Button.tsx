/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React, { useState } from 'react';
import { Button, type ButtonProps } from '@nextui-org/react';

import cn from '@/utils/helpers/cn';

type CustomButtonProps = Omit<ButtonProps, 'color'>

const DefaultStyles = 'inline-flex items-center py-0 py-4 text-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

interface ButtonComponentProps extends CustomButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
  isLoading?: boolean;
  localLoaderOnClick?: boolean;
  disabled?:boolean;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'danger' | 'premium' | undefined;
  props?: ButtonProps;
}

const ButtonComponent = ({
  onClick,
  className = '',
  isLoading = false,
  localLoaderOnClick = true,
  disabled = false,
  children,
  color = 'primary',
  ...props
}: ButtonComponentProps) => {
  const [localLoading, setLocalLoading] = useState(false);
  const loadingStatus = isLoading || (localLoaderOnClick && localLoading);

  const ButtonVariants = {
    primary: cn(DefaultStyles, 'bg-blue-600'),
    secondary: cn(DefaultStyles, 'bg-violet-600'),
    default: cn(DefaultStyles, 'bg-gray-600'),
    success: cn(DefaultStyles, 'bg-green-500'),
    warning: cn(DefaultStyles, 'bg-amber-500'),
    danger: cn(DefaultStyles, 'bg-red-500'),
    premium: cn(DefaultStyles, 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0'),
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled || loadingStatus) return;

    setLocalLoading(true);
    if (onClick) {
      return onClick(e);
    }
  };

  return (
    <Button
      className={cn(disabled && 'cursor-not-allowed', ButtonVariants[color as keyof typeof ButtonVariants], className)}
      isDisabled={disabled || loadingStatus}
      isLoading={loadingStatus}
      onClick={handleClick}
      {...props}

    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
