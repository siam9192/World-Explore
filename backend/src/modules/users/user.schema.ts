import { UserRole, UserStatus } from "../../generated/prisma/enums.js";
import { z } from "zod";

const profileFields = {
  firstName: z.string().trim().min(1).max(80).optional(),
  lastName: z.string().trim().min(1).max(80).optional(),
  profilePicture: z.string().trim().url().nullable().optional(),
};

export const profileUpdateSchema = z
  .object(profileFields)
  .refine((input) => Object.keys(input).length > 0, {
    message: "At least one profile field must be provided.",
  });

export const adminUserUpdateSchema = z
  .object({
    ...profileFields,
    email: z
      .string()
      .trim()
      .email()
      .max(254)
      .transform((email) => email.toLowerCase())
      .optional(),
    role: z.nativeEnum(UserRole).optional(),
    status: z.nativeEnum(UserStatus).optional(),
  })
  .refine((input) => Object.keys(input).length > 0, {
    message: "At least one user field must be provided.",
  });

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type AdminUserUpdate = z.infer<typeof adminUserUpdateSchema>;
