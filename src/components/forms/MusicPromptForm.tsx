/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/inputs/Input';
import Button from '@/components/buttons/Button';
import GeneratedMusicSection from '@/components/sections/GeneratedMusicSection';
import { type GenericFormSchema, FormSchema } from '@/utils/validations/code-form.schema';
import useProModal from '@/utils/hooks/useProModal';
import { trpc } from '@/providers/trpcProvider';

const MusicPromptForm = () => {
  const [music, setMusic] = useState<string>('');

  const { register, handleSubmit, getValues, reset, formState: { isSubmitting, errors } } = useForm<GenericFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const { onOpen } = useProModal();

  const { isLoading, mutate } = trpc.music.createMusic.useMutation({
    onError: (error) => {
      toast.error(error.message);

      if (error.data?.code === 'UNAUTHORIZED') {
        onOpen();
      }
    },
    onSuccess: ({ data }) => {
      toast.success('Music created successfully');
      setMusic((data as any).audio);
      reset();
    },
    retry: false,
  });

  const onSubmit = async () => {
    const prompt = getValues('prompt').toString();

    await handleSubmit(() => mutate({ prompt }))();
  };

  return (
    <div className='px-4 lg:px-8'>
      <form className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-12'>
        <div className='col-span-12 lg:col-span-10'>
          <Input
            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
            disabled={isLoading || isSubmitting}
            placeholder='Piano solo'
            type='text'
            error={errors.prompt}
            register={register('prompt')}
          />
        </div>
        <Button color='premium' className='col-span-12 lg:col-span-2 w-full' type='button' onPress={onSubmit} disabled={isLoading || isSubmitting} size='sm'>
          Generate
        </Button>
      </form>
      <GeneratedMusicSection isLoading={isLoading} music={music} />
    </div>
  );
};

export default MusicPromptForm;
