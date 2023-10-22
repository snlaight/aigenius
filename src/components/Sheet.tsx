/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */

'use client';

import { type ElementRef, forwardRef } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, type ModalProps, useDisclosure } from '@nextui-org/react';
import { type ModalSlots, type SlotsToClasses } from '@nextui-org/theme';
import { type HTMLMotionProps } from 'framer-motion';

import cn from '@/utils/helpers/cn';

export interface SheetProps extends Omit<ModalProps, 'placement'> {
  placement?: 'left' | 'right'
}

const Sheet = forwardRef<ElementRef<typeof Modal>, SheetProps>(({ placement = 'left', classNames, ...props }, ref) => {
  const extendedClassNames = {
    backdrop: cn(classNames?.backdrop),
    base: cn('!m-0 h-full !rounded-none', classNames?.base),
    body: cn(classNames?.body),
    closeButton: cn(classNames?.closeButton),
    footer: cn(classNames?.footer),
    header: cn(classNames?.header),
    wrapper: cn(placement === 'left' ? '!justify-start' : placement === 'right' ? 'justify-end' : '', classNames?.wrapper),
  } as SlotsToClasses<ModalSlots>;

  const motionProps = {
    variants: {
      enter: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      },
      exit: {
        x: 40,
        opacity: 40,
        transition: {
          duration: 0.2,
          ease: 'easeIn',
        },
      },
    },
  } as HTMLMotionProps<'section'>;

  return <Modal ref={ref} classNames={extendedClassNames} motionProps={motionProps} {...props} />;
});

Sheet.displayName = 'Sheet';

export const SheetBody = ModalBody;

export const SheetContent = ModalContent;

export const SheetFooter = ModalFooter;

export const SheetHeader = ModalHeader;

export { useDisclosure };

export default Sheet;
