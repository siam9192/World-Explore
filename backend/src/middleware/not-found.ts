import type { RequestHandler } from "express";

import { errorResponse } from "../utils/helpers.js";

export const notFoundHandler: RequestHandler = (_request, response) => {
  errorResponse(response, 404, "The requested resource was not found.");
};
