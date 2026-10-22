import { z } from "zod";

export const registerSchema = z.object({
  name: z.object({
    first: z.string().trim().min(1).max(80),
    last: z.string().trim().min(1).max(80),
  }),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be 72 characters or fewer.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol."),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z.string().min(1).max(72),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1).max(72),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(72, "Password must be 72 characters or fewer.")
      .regex(/\d/, "Password must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol."),
  })
  .refine((input) => input.oldPassword !== input.newPassword, {
    message: "New password must be different from the current password.",
    path: ["newPassword"],
  });
