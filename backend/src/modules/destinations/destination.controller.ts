import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { z } from "zod";

import { paginationValues } from "../shared/pagination.js";
import { routeParam } from "../shared/route-param.js";
import { catchAsync } from "../../middleware/catch-async.js";
import { successResponse } from "../../utils/helpers.js";
import destinationService from "./destination.service.js";
import { DestinationSpSort } from "./destination.interface.js";
import type {
  DestinationInput,
  DestinationUpdate,
} from "./destination.schema.js";

const filterSchema = z.object({
  search: z.string().trim().max(120).optional(),
  category: z.string().trim().min(1).max(80).optional(),
  categories: z.string().trim().optional(),
  sp_sort: z.nativeEnum(DestinationSpSort).optional(),
  sortBy: z.enum(["createdAt", "title", "rating", "totalReviews"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

const list: RequestHandler = catchAsync(async (request, response) => {
  const { page, limit, skip } = paginationValues(request.query);
  const {
    search,
    category,
    categories,
    sp_sort,
    sortBy,
    sortOrder,
  } = filterSchema.parse(request.query);
  const categoryFilter = categories ?? category;
  const { data, meta } = await destinationService.listDestinations(
    request.auth,
    { search, categories: categoryFilter, sp_sort },
    {
      page,
      limit,
      skip,
      take: limit,
      sortBy: sortBy ?? "createdAt",
      sortOrder,
    },
  );

  return successResponse(
    response,
    200,
    "Destinations were retrieved.",
    data,
    meta,
  );
});

const listForAdmin: RequestHandler = catchAsync(async (request, response) => {
  const { page, limit, skip } = paginationValues(request.query);
  const {
    search,
    category,
    categories,
    sp_sort,
    sortBy,
    sortOrder,
  } = filterSchema.parse(request.query);
  const { data, meta } = await destinationService.listDestinationsForAdmin(
    { search, categories: categories ?? category, sp_sort },
    {
      page,
      limit,
      skip,
      take: limit,
      sortBy: sortBy ?? "createdAt",
      sortOrder,
    },
  );

  return successResponse(
    response,
    200,
    "Destinations were retrieved.",
    data,
    meta,
  );
});

const get: RequestHandler<ParamsDictionary> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Destination was retrieved.",
    await destinationService.getDestinationBySlug(
      routeParam(request.params.id, "destination ID"),
      request.auth,
    ),
  ));

const create: RequestHandler<
  ParamsDictionary,
  unknown,
  DestinationInput
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    201,
    "Destination was created.",
    await destinationService.createDestination(request.body),
  ));

const update: RequestHandler<
  ParamsDictionary,
  unknown,
  DestinationUpdate
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Destination was updated.",
    await destinationService.updateDestination(
      routeParam(request.params.id, "destination ID"),
      request.body,
    ),
  ));

const remove: RequestHandler<ParamsDictionary> = catchAsync(async (
  request,
  response,
) => {
  await destinationService.deleteDestination(
    routeParam(request.params.id, "destination ID"),
  );
  return successResponse(response, 200, "Destination was deleted.");
});

const destinationController = { list, listForAdmin, get, create, update, remove };

export default destinationController;
