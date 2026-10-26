import { z } from "zod";

const activitySchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(5000).optional(),
  clientIconId: z.number().int().optional(),
  image: z.string().trim().url().optional(),
  price: z.number().finite().min(0).optional(),
  duration: z.string().trim().max(80).optional(),
  isFree: z.boolean().optional(),
  currency: z.string().trim().min(1).max(8).optional(),
  icon: z.string().trim().max(80).optional(),
});

const locationSchema = z.object({
  city: z.string().trim().min(1).max(120),
  state: z.string().trim().max(120).optional(),
  country: z.string().trim().min(1).max(120),
  address: z.string().trim().min(1).max(300),
  description: z.string().trim().min(1).max(5000),
  mapUrl: z.string().trim().url().optional(),
});

const destinationFields = {
  id: z.string().trim().min(1).optional(),
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tagline: z.string().trim().min(1).max(300).optional(),
  images: z.array(z.string().url()).min(1),
  categories: z.array(z.string().trim().min(1).max(80)).default([]),
  badge: z.string().trim().max(80).nullable().optional(),
  isFavorite: z.boolean().default(false),
  rating: z.number().min(0).max(5).default(0),
  totalReviews: z.number().int().min(0).default(0),
  description: z.string().trim().min(1).max(20000),
  shortDescription: z.string().trim().min(1).max(1000),
  editorNote: z.string().trim().min(1).max(5000),
  price: z.object({
    amount: z.number().min(0),
    currency: z.string().trim().min(1).max(8),
    period: z.string().trim().min(1).max(40),
  }),
  guideVerified: z.boolean().default(false),
  bestTimes: z.array(z.string().trim().min(1)).default([]),
  dailyBudget: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string().trim().min(1).max(8),
  }),
  idealTrip: z.string().trim().min(1).max(120),
  gettingAround: z.array(z.string().trim().min(1)).default([]),
  languages: z.array(z.string().trim().min(1)).default([]),
  highlights: z.array(z.object({
    label: z.string().trim().min(1),
    value: z.string().trim().min(1),
    icon: z.string().trim().min(1),
  })).default([]),
  status: z.enum(["active", "inactive"]).default("active"),
  activities: z.array(activitySchema).optional(),
  location: locationSchema.nullable().optional(),
};

export const destinationInputSchema = z.object(destinationFields).refine(
  ({ dailyBudget }) => dailyBudget.min <= dailyBudget.max,
  { message: "dailyBudget.min cannot exceed dailyBudget.max.", path: ["dailyBudget"] },
);

export const destinationUpdateSchema = z
  .object({
    ...destinationFields,
    id: z.never().optional(),
  })
  .partial()
  .refine((input) => Object.keys(input).length > 0, {
    message: "At least one field must be provided.",
  })
  .refine(
    ({ dailyBudget }) =>
      !dailyBudget || dailyBudget.min <= dailyBudget.max,
    {
      message: "dailyBudget.min cannot exceed dailyBudget.max.",
      path: ["dailyBudget"],
    },
  );

export type DestinationInput = z.infer<typeof destinationInputSchema>;
export type DestinationUpdate = z.infer<typeof destinationUpdateSchema>;
