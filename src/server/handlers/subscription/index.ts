/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import PrismaInstance from '@/utils/helpers/clients/prisma.client';

import { DAY_IN_MS } from '@/utils/constants';

export const checkSubscription = async (userId: string) => {
  const subscription = await PrismaInstance.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!subscription) return false;

  const isValid = subscription.stripePriceId && (subscription.stripeCurrentPeriodEnd?.getTime() ?? 0) + DAY_IN_MS > Date.now();

  return !!isValid;
};
