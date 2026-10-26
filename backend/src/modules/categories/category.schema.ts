import { z } from "zod";

export const categoryInputSchema = z.object({
  name: z.string().trim().min(1).max(80),
  image: z.string().trim().url(),
});

export const categoryUpdateSchema = categoryInputSchema
  .partial()
  .refine((input) => Object.keys(input).length > 0, {
    message: "At least one field must be provided.",
  });

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;
