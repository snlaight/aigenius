import { z } from 'zod';

export const ImageSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Photo prompt is required',
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export type ImageFormSchema = z.infer<typeof ImageSchema>;
