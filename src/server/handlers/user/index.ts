import PrismaInstance from '@/utils/helpers/clients/prisma.client';

import { MAX_FREE_COUNTS } from '@/utils/constants';

export const incrementApiLimit = async (userId: string) => {
  const currentLimit = await PrismaInstance.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (currentLimit) {
    return PrismaInstance.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: currentLimit.count + 1,
      },
    });
  }

  return PrismaInstance.userApiLimit.create({
    data: {
      userId,
      count: 1,
    },
  });
};

export const checkApiLimit = async (userId: string) => {
  const currentLimit = await PrismaInstance.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!currentLimit || currentLimit.count < MAX_FREE_COUNTS) return true;

  return false;
};

export const getApiLimitCount = async (userId: string) => {
  const currentLimit = await PrismaInstance.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!currentLimit) {
    return 0;
  }

  return currentLimit.count;
};
