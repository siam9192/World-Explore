import { z } from "zod";

export const locationInputSchema = z.object({
  city: z.string().trim().min(1).max(120),
  state: z.string().trim().max(120).nullable().optional(),
  country: z.string().trim().min(1).max(120),
  address: z.string().trim().min(1).max(300),
  full: z.string().trim().min(1).max(500),
  mapUrl: z.string().trim().url().nullable().optional(),
});

export const locationUpdateSchema = locationInputSchema
  .partial()
  .refine((input) => Object.keys(input).length > 0, {
    message: "At least one location field must be provided.",
  });

export const locationListSchema = z.object({
  search: z.string().trim().max(120).optional(),
  city: z.string().trim().max(120).optional(),
  state: z.string().trim().max(120).optional(),
  country: z.string().trim().max(120).optional(),
  address: z.string().trim().max(300).optional(),
  full: z.string().trim().max(500).optional(),
  mapUrl: z.string().trim().max(2000).optional(),
  sortBy: z
    .enum([
      "city",
      "state",
      "country",
      "address",
      "full",
      "mapUrl",
      "createdAt",
      "updatedAt",
    ])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type LocationInput = z.infer<typeof locationInputSchema>;
export type LocationUpdate = z.infer<typeof locationUpdateSchema>;
export type LocationListQuery = z.infer<typeof locationListSchema>;
