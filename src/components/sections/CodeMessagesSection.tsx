/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import ReactMarkdown from 'react-markdown';
import { type ChatCompletionMessageParam } from 'openai/resources';

import Loader from '@/components/Loader';
import Empty from '@/components/sections/Empty';
import UserAvatar from '@/components/avatars/UserAvatar';
import BotAvatar from '@/components/avatars/BotAvatar';
import cn from '@/utils/helpers/cn';

interface CodeMessagesSectionProps {
  isLoading: boolean;
  messages: ChatCompletionMessageParam[];
}

const CodeMessagesSection = ({ isLoading, messages }: CodeMessagesSectionProps) => (
  <div className='space-y-4 mt-4'>
    {isLoading && (
      <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
        <Loader />
      </div>
    )}
    {messages.length === 0 && !isLoading && (
      <Empty label='No conversation started.' />
    )}
    <div className='flex flex-col-reverse gap-y-4'>
      {messages.map((message) => (
        <div key={message.content} className={cn('p-8 w-full flex flex-row items-start gap-x-4 rounded-lg', message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}>
          {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
          <div className='flex flex-col'>
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
                  <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                    <pre {...props} />
                  </div>
                ),
                code: ({ node, ...props }) => (
                  <code className='bg-black/10 rounded-lg p-1' {...props} />
                ),
              }}
            >
              {message.content || ''}
            </ReactMarkdown>
          </div>

        </div>
      ))}
    </div>
  </div>
);

export default CodeMessagesSection;
