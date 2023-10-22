/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type inferAsyncReturnType, initTRPC } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
// import { uneval } from 'devalue';
import { type SignedInAuthObject, type SignedOutAuthObject } from '@clerk/nextjs/server';
import { ZodError } from 'zod';

import getServerAuthSession from '@/server/common/get-server-auth-session';
import PrismaInstance from '@/utils/helpers/clients/prisma.client';
import { type NextRequest } from 'next/server';
import { type NextApiRequest } from 'next';

type Request = NextRequest | NextApiRequest;

interface CreateContextOptions {
  session: SignedInAuthObject | SignedOutAuthObject | null;
  req: Request;
}

export const createContextInner = async (opts: CreateContextOptions) => ({
  session: opts.session,
  prisma: PrismaInstance,
  req: opts.req,
});

export const createContext = async ({ req }: CreateNextContextOptions) => {
  const session = await getServerAuthSession({ req });

  return createContextInner({
    session,
    req,
  });
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zod: error.cause instanceof ZodError ? error.cause.flatten().fieldErrors : null,
      },
    };
  },
});

export const { router, procedure, middleware } = t;
