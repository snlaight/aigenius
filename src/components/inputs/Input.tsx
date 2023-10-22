/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form';

import cn from '@/utils/helpers/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  title?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  textArea?: boolean;
}

const Input = ({
  title,
  register,
  required,
  className,
  error,
  textArea = false,
  ...props
} : InputProps) => (
  <div className='mt-2'>
    {title && (
    <div className='flex flex-row'>
      <p className='font-bold text-sm text-gray-700'>
        {title}
      </p>
      {required && <p className='text-red-400 ml-1'>*</p>}
    </div>
    )}
    {!textArea ? (
      <input
        className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)}
        {...register}
        {...props}
      />
    ) : (
      <textarea
        className={cn('py-1 px-2 text-gray-700 border border-gray-400 rounded-sm w-full bg-transparent', className)}
        rows={4}
        {...register}
        {...props}
      />
    )}
    <p className='text-sm font-bold text-red-400 mt-1 text-right'>
      {error && error.message}
    </p>
  </div>
);

export default Input;
