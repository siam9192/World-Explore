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

export function calculatePagination(query: {
  page?: number | string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number | string;
  total?: number;
}) {
  const safePage = Math.max(1, Number(query.page ?? 1) || 1);
  const safeLimit = Math.max(1, Number(query.limit ?? 20) || 20);
  const sortBy = query.sortBy?.trim() || "createdAt";
  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";
  const safeTotal = Number(query.total ?? 0) || 0;

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
    sortBy,
    sortOrder,
    total: safeTotal,
    totalPages:
      safeTotal > 0 ? Math.max(1, Math.ceil(safeTotal / safeLimit)) : 1,
  };
}