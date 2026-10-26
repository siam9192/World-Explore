import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import { paginationValues } from "../shared/pagination.js";
import { routeParam } from "../shared/route-param.js";
import { catchAsync } from "../../middleware/catch-async.js";
import { successResponse } from "../../utils/helpers.js";
import {
  createLocation,
  deleteLocation,
  getLocation,
  listLocations,
  updateLocation,
} from "./location.service.js";
import {
  locationListSchema,
  type LocationInput,
  type LocationUpdate,
} from "./location.schema.js";

export const list: RequestHandler = catchAsync(async (request, response) => {
  const { page, limit, skip } = paginationValues(request.query);
  const query = locationListSchema.parse(request.query);
  const result = await listLocations(query, {
    page,
    limit,
    skip,
    take: limit,
    sortBy: query.sortBy ?? "city",
    sortOrder: query.sortOrder ?? "asc",
  });
  return successResponse(
    response,
    200,
    "Locations were retrieved.",
    result.data,
    result.meta,
  );
});

export const get: RequestHandler<ParamsDictionary> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Location was retrieved.",
    await getLocation(routeParam(request.params.id, "location ID")),
  ));

export const create: RequestHandler<ParamsDictionary, unknown, LocationInput> = catchAsync(async (
  request,
  response,
) =>
  successResponse(
    response,
    201,
    "Location was created.",
    await createLocation(request.body),
  ));

export const update: RequestHandler<
  ParamsDictionary,
  unknown,
  LocationUpdate
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Location was updated.",
    await updateLocation(routeParam(request.params.id, "location ID"), request.body),
  ));

export const remove: RequestHandler<ParamsDictionary> = catchAsync(async (
  request,
  response,
) => {
  await deleteLocation(routeParam(request.params.id, "location ID"));
  return successResponse(response, 200, "Location was deleted.");
});
