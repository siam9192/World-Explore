import { Prisma, UserRole, UserStatus } from "../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type { PaginationOptions } from "../../utils/interface.js";
import type { AdminUserUpdate, ProfileUpdate } from "./user.schema.js";

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  profilePicture: true,
  email: true,
  role: true,
  status: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export interface UserListQuery {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortBy?: "firstName" | "email" | "createdAt" | "lastLoginAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export async function listUsers(
  query: UserListQuery,
  pagination: PaginationOptions,
) {
  const search = query.search?.trim();
  const where: Prisma.UserWhereInput = {
    ...(search && {
      OR: [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(query.role && { role: query.role }),
    ...(query.status && { status: query.status }),
  };
  const sortBy = query.sortBy ?? "createdAt";
  const sortOrder = query.sortOrder ?? "desc";
  const orderBy: Prisma.UserOrderByWithRelationInput[] = [
    { [sortBy]: sortOrder },
    { id: "asc" },
  ];

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy,
      select: userSelect,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    meta: {
      page: pagination.page,
      limit: pagination.limit,
      total,
    },
  };
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
  if (!user) throw new HttpError(404, "User was not found.");
  return user;
}

export async function getOwnProfile(id: string) {
  return getUser(id);
}

export async function updateOwnProfile(id: string, input: ProfileUpdate) {
  try {
    return await prisma.user.update({
      where: { id },
      data: input,
      select: userSelect,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new HttpError(404, "User was not found.");
    }
    throw error;
  }
}

export async function updateUser(id: string, input: AdminUserUpdate) {
  if (input.role !== undefined || input.status !== undefined) {
    const existing = await prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true, status: true },
    });
    if (!existing) throw new HttpError(404, "User was not found.");

    const isDisablingActiveAdmin =
      existing.role === UserRole.admin &&
      existing.status === UserStatus.active &&
      (input.status === UserStatus.inactive || input.role === UserRole.user);
    if (isDisablingActiveAdmin) {
      const activeAdmins = await prisma.user.count({
        where: { role: UserRole.admin, status: UserStatus.active },
      });
      if (activeAdmins <= 1) {
        throw new HttpError(409, "The last active administrator cannot be disabled.");
      }
    }
  }

  try {
    return await prisma.user.update({
      where: { id },
      data: input,
      select: userSelect,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new HttpError(404, "User was not found.");
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new HttpError(409, "A user with this email already exists.");
    }
    throw error;
  }
}
