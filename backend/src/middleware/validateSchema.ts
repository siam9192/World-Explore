
import type { RequestHandler } from "express";
import type { ZodType } from "zod";

import { HttpError } from "../utils/http-error.js";

export function validateSchema(schema: ZodType): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      next(new HttpError(400, "Request validation failed.", details));
      return;
    }

    request.body = result.data;
    next();
  };
}
