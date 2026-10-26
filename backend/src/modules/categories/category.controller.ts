import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { z } from "zod";

import { paginationValues } from "../shared/pagination.js";
import { routeParam } from "../shared/route-param.js";
import { catchAsync } from "../../middleware/catch-async.js";
import { successResponse } from "../../utils/helpers.js";
import {
  createCategory,
  deleteCategory,
  getCategory,
  listCategories,
  listCategoriesForAdmin,
  updateCategory,
} from "./category.service.js";
import type { CategoryInput, CategoryUpdate } from "./category.schema.js";

const categoryListSchema = z.object({
  search: z.string().trim().max(120).optional(),
  sortBy: z
    .enum(["name", "createdAt", "updatedAt", "totalDestinations"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const list: RequestHandler = catchAsync(async (request, response) => {
  const { page, limit, skip } = paginationValues(request.query);
  const query = categoryListSchema.parse(request.query);
  const result = await listCategories(query, {
    page,
    limit,
    skip,
    take: limit,
    sortBy: query.sortBy ?? "name",
    sortOrder: query.sortOrder ?? "asc",
  });
  return successResponse(response, 200, "Categories were retrieved.", result.data, result.meta);
});

export const listForAdmin: RequestHandler = catchAsync(
  async (request, response) => {
    const { page, limit, skip } = paginationValues(request.query);
    const query = categoryListSchema.parse(request.query);
    const result = await listCategoriesForAdmin(query, {
      page,
      limit,
      skip,
      take: limit,
      sortBy: query.sortBy ?? "name",
      sortOrder: query.sortOrder ?? "asc",
    });
    return successResponse(response, 200, "Categories were retrieved.", result.data, result.meta);
  },
);

export const get: RequestHandler<ParamsDictionary> = catchAsync(
  async (request, response) =>
    successResponse(
      response,
      200,
      "Category was retrieved.",
      await getCategory(routeParam(request.params.id, "category ID")),
    ),
);

export const create: RequestHandler<
  ParamsDictionary,
  unknown,
  CategoryInput
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    201,
    "Category was created.",
    await createCategory(request.body),
  ),
);

export const update: RequestHandler<
  ParamsDictionary,
  unknown,
  CategoryUpdate
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Category was updated.",
    await updateCategory(
      routeParam(request.params.id, "category ID"),
      request.body,
    ),
  ),
);

export const remove: RequestHandler<ParamsDictionary> = catchAsync(async (
  request,
  response,
) => {
  await deleteCategory(routeParam(request.params.id, "category ID"));
  return successResponse(response, 200, "Category was deleted.");
});
