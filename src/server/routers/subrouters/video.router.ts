import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import env from '@/utils/env';
import replicate from '@/utils/helpers/clients/replicate.client';
import { checkApiLimit, incrementApiLimit } from '@/server/handlers/user';
import { checkSubscription } from '@/server/handlers/subscription';
import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';

const VideoRouter = router({
  createVideo: userProcedure.input(
    z.object({
      prompt: z.string(),
    }),
  ).mutation(async ({ ctx, input }) => {
    const freeTrial = await checkApiLimit(ctx.session.user.id);
    const isPro = await checkSubscription(ctx.session.user.id);

    const { prompt } = input;

    if (!replicate.auth) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Replicate API key not set',
      });
    }

    if (!freeTrial && !isPro) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You have reached your API limit. Please upgrade to a paid plan.',
      });
    }

    const response = await replicate.run(`${env.ZEROSCOPE_API_NAME}/${env.ZEROZCOPE_VERSION}:${env.ZEROSCOPE_TOKEN}`, {
      input: {
        prompt,
      },
    });

    if (!isPro) {
      await incrementApiLimit(ctx.session.user.id);
    }

    return {
      data: response,
    };
  }),
});

export default VideoRouter;
