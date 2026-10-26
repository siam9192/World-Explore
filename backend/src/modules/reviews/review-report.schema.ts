import { ReportStatus } from "../../generated/prisma/enums.js";
import { z } from "zod";

export const createReviewReportSchema = z.object({
  reason: z.string().trim().min(1).max(120),
  details: z.string().trim().max(5000).optional(),
});

export const updateReviewReportSchema = z.object({
  status: z.nativeEnum(ReportStatus),
});

export const reviewReportListSchema = z.object({
  search: z.string().trim().max(120).optional(),
  status: z.nativeEnum(ReportStatus).optional(),
  reviewId: z.string().trim().min(1).optional(),
  destinationId: z.string().trim().min(1).optional(),
  userId: z.string().trim().min(1).optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "status"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type CreateReviewReportInput = z.infer<typeof createReviewReportSchema>;
export type UpdateReviewReportInput = z.infer<typeof updateReviewReportSchema>;
export type ReviewReportListQuery = z.infer<typeof reviewReportListSchema>;
