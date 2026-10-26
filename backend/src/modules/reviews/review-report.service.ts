import { Prisma, ReportStatus } from "../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type { PaginationOptions } from "../../utils/interface.js";
import type {
  CreateReviewReportInput,
  ReviewReportListQuery,
  UpdateReviewReportInput,
} from "./review-report.schema.js";

const reviewReportInclude = {
  review: {
    include: {
      author: {
        select: { id: true, firstName: true, lastName: true, profilePicture: true },
      },
      destination: {
        select: { id: true, title: true, slug: true },
      },
    },
  },
  user: {
    select: { id: true, firstName: true, lastName: true, email: true },
  },
};

export async function createReviewReport(
  reviewId: string,
  userId: string,
  input: CreateReviewReportInput,
) {
  try {
    return await prisma.reviewReport.create({
      data: {
        reviewId,
        userId,
        reason: input.reason,
        details: input.details,
      },
      include: reviewReportInclude,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new HttpError(409, "You have already reported this review.");
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw new HttpError(404, "Review was not found.");
    }
    throw error;
  }
}

export async function listReviewReports(
  query: ReviewReportListQuery,
  pagination: PaginationOptions,
  userId?: string,
) {
  const search = query.search?.trim();
  const reporterId = userId ?? query.userId;
  const where: Prisma.ReviewReportWhereInput = {
    ...(reporterId && { userId: reporterId }),
    ...(query.status && { status: query.status }),
    ...(query.reviewId && { reviewId: query.reviewId }),
    ...(query.destinationId && {
      review: { destinationId: query.destinationId },
    }),
    ...(search && {
      OR: [
        { reason: { contains: search, mode: "insensitive" } },
        { details: { contains: search, mode: "insensitive" } },
      ],
    }),
  };
  const sortBy = query.sortBy ?? "createdAt";
  const sortOrder = query.sortOrder ?? "desc";
  const orderBy: Prisma.ReviewReportOrderByWithRelationInput[] = [
    { [sortBy]: sortOrder },
    { id: "asc" },
  ];
  const [data, total] = await Promise.all([
    prisma.reviewReport.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy,
      include: reviewReportInclude,
    }),
    prisma.reviewReport.count({ where }),
  ]);

  return {
    data,
    meta: {
      page: pagination.page,
      limit: pagination.limit,
      total,
    },
  };
}

export async function getReviewReport(id: string, userId?: string) {
  const report = await prisma.reviewReport.findFirst({
    where: { id, ...(userId && { userId }) },
    include: reviewReportInclude,
  });
  if (!report) throw new HttpError(404, "Review report was not found.");
  return report;
}

export async function updateReviewReport(
  id: string,
  input: UpdateReviewReportInput,
) {
  const report = await prisma.reviewReport.findUnique({
    where: { id },
    select: { id: true, status: true },
  });
  if (!report) throw new HttpError(404, "Review report was not found.");
  const allowedTransitions: Record<ReportStatus, ReportStatus[]> = {
    [ReportStatus.pending]: [
      ReportStatus.reviewed,
      ReportStatus.resolved,
      ReportStatus.dismissed,
    ],
    [ReportStatus.reviewed]: [ReportStatus.resolved, ReportStatus.dismissed],
    [ReportStatus.resolved]: [],
    [ReportStatus.dismissed]: [],
  };
  if (!allowedTransitions[report.status].includes(input.status)) {
    throw new HttpError(409, "This review report status transition is not allowed.");
  }

  return prisma.reviewReport.update({
    where: { id },
    data: { status: input.status },
    include: reviewReportInclude,
  });
}
