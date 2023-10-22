'use client';

import { Check, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, Card, CardBody } from '@nextui-org/react';

import Badge from '@/components/Badge';
import Button from '@/components/buttons/Button';
import useProModal from '@/utils/hooks/useProModal';
import cn from '@/utils/helpers/cn';
import { tools } from '@/utils/constants';
import { trpc } from '@/providers/trpcProvider';

const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  const router = useRouter();

  const { isLoading, mutate } = trpc.payment.session.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ data }) => {
      if (!data) {
        toast.error('There was an error creating your subscription, please try again later.');
      }
      router.push(data as string);
    },
    retry: false,
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <section className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold text-xl'>
              Upgrade to Genius
              <Badge color='premium' className='uppercase text-sm py-1'>
                pro
              </Badge>
            </div>
          </section>
          <ModalBody className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            {tools.map((tool) => (
              <Card key={tool.href} className='p-3 border-black/5 flex items-center justify-between'>
                <CardBody className='flex items-center gap-x-4'>
                  <div className={cn('p-2 w-fit rounded-md', tool.bg)}>
                    <tool.icon className={cn('w-6 h-6', tool.color)} />
                  </div>
                  <div className='font-semibold text-sm'>
                    {tool.label}
                  </div>
                </CardBody>
                <Check className='text-primary w-5 h-5' />
              </Card>
            ))}
          </ModalBody>
        </ModalHeader>
        <ModalFooter>
          <Button
            disabled={isLoading}
            onPress={() => mutate()}
            size='lg'
            color='premium'
            className='w-full'
          >
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProModal;
