/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

import { TRPCError } from '@trpc/server';

import stripe from '@/utils/servers/stripe.server';
import absoluteUrl from '@/utils/helpers/absoluteUrl';
import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';

const settings_url = absoluteUrl('/settings');

const PaymentRouter = router({
  session: userProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const subscription = await ctx.prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (subscription && subscription.stripeCustomerId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: settings_url,
      });

      if (!session) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to create billing portal session',
        });
      }

      return {
        data: session.url,
      };
    }

    const session = await stripe.checkout.sessions.create({
      success_url: settings_url,
      cancel_url: settings_url,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: ctx.session.user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Genius Pro',
              description: 'Unlimited AI Generations',
            },
            unit_amount: 2000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return {
      data: session.url,
    };
  }),
});

export default PaymentRouter;
