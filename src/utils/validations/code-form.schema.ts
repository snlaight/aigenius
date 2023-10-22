import { z } from 'zod';

export const FormSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
});

export type GenericFormSchema = z.infer<typeof FormSchema>;
