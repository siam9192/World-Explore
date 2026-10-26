import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { paginationValues } from "../shared/pagination.js";
import { routeParam } from "../shared/route-param.js";
import { catchAsync } from "../../middleware/catch-async.js";
import { successResponse } from "../../utils/helpers.js";
import { HttpError } from "../../utils/http-error.js";
import {
  createReview,
  deleteReview,
  getDestinationReviewSummary,
  getReview,
  getReviewsByDestination,
  listReviews,
  updateReview,
} from "./review.service.js";
import type { ReviewInput, ReviewUpdate } from "./review.schema.js";
import { reviewListSchema } from "./review.schema.js";

export const list: RequestHandler = catchAsync(async (request, response) => {
  const { page, limit, skip } = paginationValues(request.query);
  const query = reviewListSchema.parse(request.query);
  const result = await listReviews(
    query,
    {
      page,
      limit,
      skip,
      take: limit,
      sortBy: query.sortBy ?? "createdAt",
      sortOrder: query.sortOrder ?? "desc",
    },
  );
  return successResponse(
    response,
    200,
    "Reviews were retrieved.",
    result.data,
    result.meta,
  );
});

export const listByDestination: RequestHandler<ParamsDictionary> = catchAsync(
  async (request, response) => {
    const { page, limit, skip } = paginationValues(request.query);
    const query = reviewListSchema.parse(request.query);
    const result = await getReviewsByDestination(
      routeParam(request.params.destinationId, "destination ID"),
      query,
      {
        page,
        limit,
        skip,
        take: limit,
        sortBy: query.sortBy ?? "createdAt",
        sortOrder: query.sortOrder ?? "desc",
      },
    );
    return successResponse(
      response,
      200,
      "Destination reviews were retrieved.",
      result.data,
      result.meta,
    );
  },
);

export const destinationSummary: RequestHandler<ParamsDictionary> = catchAsync(
  async (request, response) =>
    successResponse(
      response,
      200,
      "Destination review summary was retrieved.",
      await getDestinationReviewSummary(
        routeParam(request.params.destinationId, "destination ID"),
      ),
    ),
);

export const get: RequestHandler<ParamsDictionary> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Review was retrieved.",
    await getReview(routeParam(request.params.id, "review ID")),
  ));

export const create: RequestHandler<ParamsDictionary, unknown, ReviewInput> = catchAsync(async (
  request,
  response,
) => {
  const authorId = request.auth?.id;
  if (!authorId) throw new HttpError(401, "Authentication is required.");
  return successResponse(
    response,
    201,
    "Review was created.",
    await createReview(authorId, request.body),
  );
});

export const update: RequestHandler<
  ParamsDictionary,
  unknown,
  ReviewUpdate
> =
  catchAsync(async (request, response) => {
    const authorId = request.auth?.id;
    if (!authorId) throw new HttpError(401, "Authentication is required.");
    return successResponse(
      response,
      200,
      "Review was updated.",
      await updateReview(
        routeParam(request.params.id, "review ID"),
        authorId,
        request.body,
      ),
    );
  });

export const remove: RequestHandler<ParamsDictionary> = catchAsync(async (
  request,
  response,
) => {
  const authorId = request.auth?.id;
  if (!authorId) throw new HttpError(401, "Authentication is required.");
  await deleteReview(routeParam(request.params.id, "review ID"), authorId);
  return successResponse(response, 200, "Review was deleted.");
});
