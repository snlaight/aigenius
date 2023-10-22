import { z } from 'zod';

export const PostMessageInput = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['function', 'user', 'system', 'assistant']),
      content: z.string(),
    }),
  ),
});

export type PostMessageInputType = z.infer<typeof PostMessageInput>;
