import Replicate from 'replicate';

import env from '@/utils/env';

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

export default replicate;
