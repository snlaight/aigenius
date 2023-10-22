'use client';

import NextLink from 'next/link';
import { Code, ImageIcon, MessageSquare, Music, VideoIcon, LayoutDashboard, Settings } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@nextui-org/react';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';

import FreeCounterCard from '@/components/cards/FreeCounterCard';
import cn from '@/utils/helpers/cn';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-violet-300',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    href: '/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    href: '/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    href: '/code',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount, isPro }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
          <div className='relative w-8 h-8 mr-4'>
            <Image fill alt='logo' src='/logo.png' />
          </div>
          <h1 className={cn('text-2xl font-bold', poppins.className)}>
            Genius
          </h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              as={NextLink}
              className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400')}
            >
              <div className='flex items-center flex-1'>
                <route.icon className={cn(route.color, 'h-5 w-5 mr-3')} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounterCard isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
