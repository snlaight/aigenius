import { TRPCError } from '@trpc/server';
import { type ImageGenerateParams } from 'openai/resources';
import { z } from 'zod';

import openai from '@/utils/helpers/clients/openai.client';
import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';
import { checkApiLimit, incrementApiLimit } from '@/server/handlers/user';
import { checkSubscription } from '@/server/handlers/subscription';

const ImageRouter = router({
  createImage: userProcedure.input(z.object({
    prompt: z.string(),
    amount: z.number().default(1),
    resolution: z.string().default('512x512'),
  })).mutation(async ({ ctx, input }) => {
    const freeTrial = await checkApiLimit(ctx.session.user.id);
    const isPro = await checkSubscription(ctx.session.user.id);
    const { prompt, amount, resolution } = input;

    if (!openai.apiKey) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'OpenAI API key not set',
      });
    }

    if (!freeTrial && !isPro) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You have reached your API limit. Please upgrade to a paid plan.',
      });
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount.toString(), 10),
      size: resolution as ImageGenerateParams['size'],
    });

    if (!isPro) {
      await incrementApiLimit(ctx.session.user.id);
    }

    return {
      data: response.data,
    };
  }),
});

export default ImageRouter;
