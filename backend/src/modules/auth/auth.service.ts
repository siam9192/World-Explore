import bcrypt from "bcryptjs";

import { Prisma, UserRole, UserStatus } from "../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type {
  ChangePasswordPayload,
  RegisterPayload,
  UserLoginPayload,
} from "./auth.interface.js";
import { createAccessToken } from "./auth.token.js";

const PASSWORD_SALT_ROUNDS = 12;

const safeUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  profilePicture: true,
  email: true,
  role: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function registerUser(input: RegisterPayload) {
  const passwordHash = await bcrypt.hash(input.password, PASSWORD_SALT_ROUNDS);

  try {
    const user = await prisma.user.create({
      data: {
        firstName: input.name.first,
        lastName: input.name.last,
        email: input.email,
        passwordHash,
        status:UserStatus.active,
        role: UserRole.user,
        lastLoginAt: new Date(),
      },
      select: safeUserSelect,
    });

    return { user, token: createAccessToken(user.id) };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new HttpError(409, "An account with this email already exists.");
    }

    throw error;
  }
}

export async function loginUser(input: UserLoginPayload) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      ...safeUserSelect,
      passwordHash: true,
    },
  });

  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new HttpError(401, "Email or password is incorrect.");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
    select: safeUserSelect,
  });

  return { user: updatedUser, token: createAccessToken(updatedUser.id) };
}

export async function changeUserPassword(
  userId: string,
  input: ChangePasswordPayload,
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  });

  if (!user) {
    throw new HttpError(404, "Account was not found.");
  }

  if (!(await bcrypt.compare(input.oldPassword, user.passwordHash))) {
    throw new HttpError(401, "Current password is incorrect.");
  }

  const passwordHash = await bcrypt.hash(
    input.newPassword,
    PASSWORD_SALT_ROUNDS,
  );

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
}
