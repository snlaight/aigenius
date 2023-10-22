import { TRPCError } from '@trpc/server';

import openai from '@/utils/helpers/clients/openai.client';
import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';
import { PostMessageInput } from '@/utils/validations/code-routes.schema';
import { checkApiLimit, incrementApiLimit } from '@/server/handlers/user';
import { checkSubscription } from '@/server/handlers/subscription';

const ConversationRouter = router({
  createConversation: userProcedure.input(PostMessageInput).mutation(async ({ ctx, input }) => {
    const freeTrial = await checkApiLimit(ctx.session.user.id);
    const isPro = await checkSubscription(ctx.session.user.id);

    if (!openai.apiKey) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'OpenAI API key not set',
      });
    }

    if (!input.messages) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No messages provided',
      });
    }

    if (!freeTrial && !isPro) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You have reached your API limit. Please upgrade to a paid plan.',
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: input.messages,
    });

    if (!isPro) {
      await incrementApiLimit(ctx.session.user.id);
    }

    return {
      data: response.choices[0].message,
    };
  }),
});

export default ConversationRouter;
