import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import { catchAsync } from "../../middleware/catch-async.js";
import { HttpError } from "../../utils/http-error.js";
import { successResponse } from "../../utils/helpers.js";
import { paginationValues } from "../shared/pagination.js";
import { routeParam } from "../shared/route-param.js";
import {
  createReviewReport as createReport,
  getReviewReport,
  listReviewReports,
  updateReviewReport,
} from "./review-report.service.js";
import {
  reviewReportListSchema,
  type CreateReviewReportInput,
  type UpdateReviewReportInput,
} from "./review-report.schema.js";

export const createReviewReport: RequestHandler<
  ParamsDictionary,
  unknown,
  CreateReviewReportInput
> = catchAsync(async (request, response) => {
  const userId = request.auth?.id;
  if (!userId) throw new HttpError(401, "Authentication is required.");
  return successResponse(
    response,
    201,
    "Review was reported.",
    await createReport(
      routeParam(request.params.id, "review ID"),
      userId,
      request.body,
    ),
  );
});

export const list: RequestHandler = catchAsync(async (request, response) => {
  const { page, limit, skip } = paginationValues(request.query);
  const query = reviewReportListSchema.parse(request.query);
  const result = await listReviewReports(query, {
    page,
    limit,
    skip,
    take: limit,
    sortBy: query.sortBy ?? "createdAt",
    sortOrder: query.sortOrder ?? "desc",
  });
  return successResponse(
    response,
    200,
    "Review reports were retrieved.",
    result.data,
    result.meta,
  );
});

export const listMine: RequestHandler = catchAsync(async (request, response) => {
  const userId = request.auth?.id;
  if (!userId) throw new HttpError(401, "Authentication is required.");
  const { page, limit, skip } = paginationValues(request.query);
  const query = reviewReportListSchema.parse(request.query);
  const result = await listReviewReports(
    query,
    {
      page,
      limit,
      skip,
      take: limit,
      sortBy: query.sortBy ?? "createdAt",
      sortOrder: query.sortOrder ?? "desc",
    },
    userId,
  );
  return successResponse(
    response,
    200,
    "Your review reports were retrieved.",
    result.data,
    result.meta,
  );
});

export const get: RequestHandler<ParamsDictionary> = catchAsync(
  async (request, response) =>
    successResponse(
      response,
      200,
      "Review report was retrieved.",
      await getReviewReport(routeParam(request.params.id, "report ID")),
    ),
);

export const update: RequestHandler<
  ParamsDictionary,
  unknown,
  UpdateReviewReportInput
> = catchAsync(async (request, response) =>
  successResponse(
    response,
    200,
    "Review report was updated.",
    await updateReviewReport(
      routeParam(request.params.id, "report ID"),
      request.body,
    ),
  ),
);
