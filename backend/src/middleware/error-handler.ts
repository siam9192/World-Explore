import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { Prisma } from "../generated/prisma/client.js";
import { errorResponse } from "../utils/helpers.js";
import { HttpError } from "../utils/http-error.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    errorResponse(response, 400, "Request body must be valid JSON.");
    return;
  }

  if (error instanceof ZodError) {
    errorResponse(
      response,
      400,
      "Request validation failed.",
      error.issues.map(({ path, message }) => ({ path, message })),
    );
    return;
  }

  if (error instanceof HttpError) {
    errorResponse(response, error.statusCode, error.message, error.details);
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      errorResponse(response, 409, "A record with this value already exists.");
      return;
    }

    if (error.code === "P2003" || error.code === "P2014") {
      errorResponse(response, 400, "The request references an invalid record.");
      return;
    }

    if (error.code === "P2025") {
      errorResponse(response, 404, "The requested record was not found.");
      return;
    }
  }

  console.error("Unhandled API error:", error);
  errorResponse(response, 500, "An unexpected error occurred.");
};
