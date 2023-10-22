'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import Button from '@/components/buttons/Button';
import Sheet, { SheetContent, useDisclosure } from '@/components/Sheet';
import Sidebar from '@/components/Sidebar';

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const MobileSidebar = ({ apiLimitCount = 0, isPro = false }: MobileSidebarProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Button variant='ghost' size='sm' className='md:hidden' onPress={onOpen}>
        <Menu />
      </Button>
      <Sheet
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='left'
      >
        <SheetContent className='p-0'>
          <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
