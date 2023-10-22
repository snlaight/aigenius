/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Select, SelectItem } from '@nextui-org/react';
import { type Image } from 'openai/resources';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/inputs/Input';
import Button from '@/components/buttons/Button';
import GeneratedImagesSection from '@/components/sections/GeneratedImagesSection';
import useProModal from '@/utils/hooks/useProModal';
import { ImageSchema, type ImageFormSchema } from '@/utils/validations/image-form.schema';
import { trpc } from '@/providers/trpcProvider';
import { AmountOptions, ResolutionOptions } from '@/utils/constants';

const ImagePromptForm = () => {
  const [images, setImages] = useState<Image[]>([]);

  const { register, handleSubmit, getValues, reset, setValue, formState: { isSubmitting, errors } } = useForm<ImageFormSchema>({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const { onOpen } = useProModal();

  const { isLoading, mutate } = trpc.image.createImage.useMutation({
    onError: (error) => {
      toast.error(error.message);
      if (error.data?.code === 'UNAUTHORIZED') {
        onOpen();
      }
    },
    onSuccess: ({ data }) => {
      toast.success('Image created successfully');
      setImages([...images, ...data]);
      reset();
    },
    retry: false,
  });

  const onSubmit = async () => {
    const prompt = getValues('prompt').toString();
    const amount = getValues('amount').toString();
    const resolution = getValues('resolution').toString();

    const newImages = [...images];

    await handleSubmit(() => mutate({
      prompt,
      amount: +amount,
      resolution,
    }))();

    setImages(newImages);
  };

  return (
    <>
      <div className='px-4 lg:px-8'>
        <form className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
          <div className='col-span-12 lg:col-span-6'>
            <Input
              className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
              disabled={isLoading || isSubmitting}
              placeholder='A picture of a horse in Swiss alps'
              type='text'
              error={errors.prompt}
              register={register('prompt')}
            />
          </div>
          <div className='col-span-12 lg:col-span-2'>
            <Select
              items={AmountOptions}
              disabled={isLoading || isSubmitting}
              label='Amount'
              onChange={(event) => setValue('amount', event.target.value)}
            >
              {AmountOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='col-span-12 lg:col-span-2'>
            <Select
              items={ResolutionOptions}
              label='Resolution'
              disabled={isLoading || isSubmitting}
              onChange={(event) => setValue('resolution', event.target.value)}
            >
              {ResolutionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Button
            className='col-span-12 lg:col-span-2 w-full'
            type='button'
            onPress={onSubmit}
            disabled={isLoading || isSubmitting}
            size='sm'
            color='premium'
          >
            Generate
          </Button>
        </form>
      </div>
      <GeneratedImagesSection isLoading={isLoading} images={images} />
    </>
  );
};

export default ImagePromptForm;
