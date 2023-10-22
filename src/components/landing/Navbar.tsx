/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { Montserrat } from 'next/font/google';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import cn from '@/utils/helpers/cn';
import Button from '@/components/buttons/Button';

const font = Montserrat({ weight: '600', subsets: ['latin'] });

const Navbar = () => {
  const { isSignedIn, signOut } = useAuth();

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
      <Link className='flex items-center' href='/'>
        <div className='relative w-8 h-8 mr-4'>
          <Image fill alt='logo' src='/logo.png' />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          Genius
        </h1>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button color={isSignedIn ? 'success' : 'primary'} className='rounded-full p-4 text-white'>
            {isSignedIn ? 'Dashboard' : 'Get Started'}
          </Button>
        </Link>
        {isSignedIn && (
        <Button onPress={() => signOut()} color='danger' variant='shadow' isIconOnly className=' rounded p-3'>
          <LogOut />
        </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
