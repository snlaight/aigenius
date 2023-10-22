/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TRPCError } from '@trpc/server';

import openai, { InstructionMessage } from '@/utils/helpers/clients/openai.client';
import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';
import { PostMessageInput } from '@/utils/validations/code-routes.schema';
import { checkApiLimit, incrementApiLimit } from '@/server/handlers/user';
import { checkSubscription } from '@/server/handlers/subscription';

const CodeRouter = router({
  createCode: userProcedure.input(PostMessageInput).mutation(async ({ ctx, input }) => {
    const freeTrial = await checkApiLimit(ctx.session.user.id);
    const isPro = await checkSubscription(ctx.session.user.id);

    if (!openai.apiKey) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'OpenAI API key not set',
      });
    }

    if (!freeTrial && !isPro) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You have reached your API limit. Please upgrade to a paid plan.',
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [InstructionMessage, ...input.messages],
    });

    if (response.object === 'chat.completion' && !isPro) {
      await incrementApiLimit(ctx.session.user.id);
    }

    // send the response back as json
    return {
      data: response.choices[0].message,
    };
  }),

});

export default CodeRouter;
