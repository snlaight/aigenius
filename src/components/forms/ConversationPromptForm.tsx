/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type ChatCompletionMessageParam } from 'openai/resources';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/inputs/Input';
import Button from '@/components/buttons/Button';
import CodeMessagesSection from '@/components/sections/CodeMessagesSection';
import { type GenericFormSchema, FormSchema } from '@/utils/validations/code-form.schema';
import useProModal from '@/utils/hooks/useProModal';
import { trpc } from '@/providers/trpcProvider';

const ConversationPromptForm = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const { register, handleSubmit, getValues, reset, formState: { isSubmitting, errors } } = useForm<GenericFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const { onOpen } = useProModal();

  const { isLoading, mutate } = trpc.conversation.createConversation.useMutation({
    onError: (error) => {
      toast.error(error.message);
      if (error.data?.code === 'UNAUTHORIZED') {
        onOpen();
      }
    },
    onSuccess: ({ data }) => {
      toast.success('Conversation created successfully');
      setMessages([...messages, data]);
      reset();
    },
    retry: false,
  });

  const onSubmit = async () => {
    const prompt = getValues('prompt').toString();

    const message: ChatCompletionMessageParam = {
      role: 'user',
      content: prompt,
    };

    const newMessages = [...messages, message];

    await handleSubmit(() => mutate({
      messages: newMessages.map((message) => ({
        ...message,
        content: message.content || '',
      })),
    }))();

    setMessages(newMessages);
  };

  return (
    <div className='px-4 lg:px-8'>
      <div>
        <form
          className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
        >
          <div className='col-span-12 lg:col-span-10'>
            <Input
              className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
              disabled={isLoading || isSubmitting}
              placeholder='Enter your prompt here'
              type='text'
              error={errors.prompt}
              register={register('prompt')}
            />
          </div>
          <Button color='premium' className='col-span-12 lg:col-span-2 w-full' type='button' onPress={onSubmit} disabled={isLoading || isSubmitting} size='sm'>
            Generate
          </Button>
        </form>
      </div>
      <CodeMessagesSection isLoading={isLoading} messages={messages as unknown as ChatCompletionMessageParam[]} />
    </div>
  );
};

export default ConversationPromptForm;
