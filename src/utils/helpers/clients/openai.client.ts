/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources';

import env from '@/utils/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const InstructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
};

export default openai;
