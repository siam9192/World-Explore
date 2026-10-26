import { z } from "zod";

export const reviewInputSchema = z.object({
  destinationId: z.string().trim().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().trim().min(1).max(5000),
});

export const reviewUpdateSchema = reviewInputSchema
  .omit({ destinationId: true })
  .partial()
  .refine((input) => Object.keys(input).length > 0, {
    message: "At least one field must be provided.",
  });

export const reviewListSchema = z.object({
  search: z.string().trim().max(120).optional(),
  destinationId: z.string().trim().min(1).optional(),
  authorId: z.string().trim().min(1).optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  maxRating: z.coerce.number().min(1).max(5).optional(),
  sortBy: z.enum(["createdAt", "rating"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
}).refine(
  ({ minRating, maxRating }) =>
    minRating === undefined || maxRating === undefined || minRating <= maxRating,
  {
    message: "minRating cannot exceed maxRating.",
    path: ["minRating"],
  },
);

export type ReviewInput = z.infer<typeof reviewInputSchema>;
export type ReviewUpdate = z.infer<typeof reviewUpdateSchema>;
export type ReviewListQuery = z.infer<typeof reviewListSchema>;
