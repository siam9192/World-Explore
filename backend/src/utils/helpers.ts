import type { Response } from "express";
import type { ApiMeta, ApiResponse } from "./interface.js";

export function successResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  meta?: ApiMeta,
) {
  const response: ApiResponse<T> = {
    status: statusCode,
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta }),
  };

  return res.status(statusCode).json(response);
}

export function errorResponse(
  res: Response,
  statusCode: number,
  message: string,
  errors?: unknown,
  meta?: ApiMeta,
) {
  const response: ApiResponse = {
    status: statusCode,
    success: false,
    message,
    ...(errors !== undefined && { errors }),
    ...(meta !== undefined && { meta }),
  };

  return res.status(statusCode).json(response);
}