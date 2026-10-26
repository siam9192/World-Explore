import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { UserRole, UserStatus } from "../../generated/prisma/enums.js";
import { z } from "zod";

import { catchAsync } from "../../middleware/catch-async.js";
import { HttpError } from "../../utils/http-error.js";
import { successResponse } from "../../utils/helpers.js";
import { paginationValues } from "../shared/pagination.js";
import { routeParam } from "../shared/route-param.js";
import {
  getOwnProfile,
  getUser,
  listUsers,
  updateOwnProfile,
  updateUser,
} from "./user.service.js";
import type { AdminUserUpdate, ProfileUpdate } from "./user.schema.js";

const userListSchema = z.object({
  search: z.string().trim().max(120).optional(),
  role: z.nativeEnum(UserRole).optional(),
  status: z.nativeEnum(UserStatus).optional(),
  sortBy: z
    .enum(["firstName", "email", "createdAt", "lastLoginAt", "updatedAt"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

function authenticatedUserId(id: string | undefined) {
  if (!id) throw new HttpError(401, "Authentication is required.");
  return id;
}

export const getMe: RequestHandler = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Your profile was retrieved.",
    await getOwnProfile(authenticatedUserId(request.auth?.id)),
  ),
);

export const updateMe: RequestHandler<
  ParamsDictionary,
  unknown,
  ProfileUpdate
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Your profile was updated.",
    await updateOwnProfile(
      authenticatedUserId(request.auth?.id),
      request.body,
    ),
  ),
);

export const list: RequestHandler = catchAsync(async (request, response) => {
  const { page, limit, skip } = paginationValues(request.query);
  const query = userListSchema.parse(request.query);
  const { data, meta } = await listUsers(query, {
    page,
    limit,
    skip,
    take: limit,
    sortBy: query.sortBy ?? "createdAt",
    sortOrder: query.sortOrder,
  });
  return successResponse(response, 200, "Users were retrieved.", data, meta);
});

export const get: RequestHandler<ParamsDictionary> = catchAsync(
  async (request, response) =>
    successResponse(
      response,
      200,
      "User was retrieved.",
      await getUser(routeParam(request.params.id, "user ID")),
    ),
);

export const update: RequestHandler<
  ParamsDictionary,
  unknown,
  AdminUserUpdate
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "User was updated.",
    await updateUser(
      routeParam(request.params.id, "user ID"),
      request.body,
    ),
  ),
);
