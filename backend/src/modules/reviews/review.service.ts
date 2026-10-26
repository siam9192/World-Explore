import prisma from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { HttpError } from "../../utils/http-error.js";
import type { PaginationOptions } from "../../utils/interface.js";
import type {
  ReviewInput,
  ReviewListQuery,
  ReviewUpdate,
} from "./review.schema.js";

const reviewInclude = {
  author: {
    select: { id: true, firstName: true, lastName: true, profilePicture: true },
  },
};

async function refreshDestinationRating(
  transaction: Prisma.TransactionClient,
  destinationId: string,
) {
  const aggregate = await transaction.review.aggregate({
    where: { destinationId },
    _avg: { rating: true },
    _count: { _all: true },
  });
  await transaction.destination.update({
    where: { id: destinationId },
    data: {
      rating: aggregate._avg.rating ?? 0,
      totalReviews: aggregate._count._all,
    },
  });
}

export async function listReviews(
  query: ReviewListQuery,
  pagination: PaginationOptions,
) {
  const search = query.search?.trim();
  const where: Prisma.ReviewWhereInput = {
    ...(query.destinationId && { destinationId: query.destinationId }),
    ...(query.authorId && { authorId: query.authorId }),
    ...(query.rating !== undefined && { rating: query.rating }),
    ...((query.minRating !== undefined || query.maxRating !== undefined) && {
      AND: [
        {
          rating: {
            ...(query.minRating !== undefined && { gte: query.minRating }),
            ...(query.maxRating !== undefined && { lte: query.maxRating }),
          },
        },
      ],
    }),
    ...(search && {
      comment: { contains: search, mode: "insensitive" },
    }),
  };
  const orderBy: Prisma.ReviewOrderByWithRelationInput[] = [
    { [query.sortBy ?? "createdAt"]: query.sortOrder ?? "desc" },
    { id: "asc" },
  ];
  const [data, total] = await Promise.all([
    prisma.review.findMany({
      where,
      include: reviewInclude,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy,
    }),
    prisma.review.count({ where }),
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

export async function getReviewsByDestination(
  destinationId: string,
  query: ReviewListQuery,
  pagination: PaginationOptions,
) {
  return listReviews({ ...query, destinationId }, pagination);
}

export async function getDestinationReviewSummary(destinationId: string) {
  const destination = await prisma.destination.findFirst({
    where: { id: destinationId, status: "active", isDeleted: false },
    select: { id: true },
  });
  if (!destination) throw new HttpError(404, "Destination was not found.");

  const [aggregate, ratingCounts] = await Promise.all([
    prisma.review.aggregate({
      where: { destinationId },
      _avg: { rating: true },
      _count: { _all: true },
    }),
    prisma.review.groupBy({
      by: ["rating"],
      where: { destinationId },
      _count: { _all: true },
      orderBy: { rating: "desc" },
    }),
  ]);

  return {
    destinationId,
    averageRating: aggregate._avg.rating ?? 0,
    totalReviews: aggregate._count._all,
    ratingBreakdown: ratingCounts.map(({ rating, _count }) => ({
      rating,
      count: _count._all,
    })),
  };
}

export async function getReview(id: string) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: reviewInclude,
  });
  if (!review) throw new HttpError(404, "Review was not found.");
  return review;
}

export async function createReview(authorId: string, input: ReviewInput) {
  return prisma.$transaction(async (transaction) => {
    const destination = await transaction.destination.findFirst({
      where: { id: input.destinationId, isDeleted: false, status: "active" },
      select: { id: true },
    });
    if (!destination) throw new HttpError(404, "Destination was not found.");

    const review = await transaction.review.create({
      data: { ...input, authorId },
      include: reviewInclude,
    });
    await refreshDestinationRating(transaction, input.destinationId);
    return review;
  });
}

export async function updateReview(
  id: string,
  authorId: string,
  input: ReviewUpdate,
) {
  return prisma.$transaction(async (transaction) => {
    const review = await transaction.review.findUnique({ where: { id } });
    if (!review) throw new HttpError(404, "Review was not found.");
    if (review.authorId !== authorId) {
      throw new HttpError(403, "You can only update your own reviews.");
    }

    const updated = await transaction.review.update({
      where: { id },
      data: input,
      include: reviewInclude,
    });
    await refreshDestinationRating(transaction, review.destinationId);
    return updated;
  });
}

export async function deleteReview(id: string, authorId: string) {
  await prisma.$transaction(async (transaction) => {
    const review = await transaction.review.findUnique({ where: { id } });
    if (!review) throw new HttpError(404, "Review was not found.");
    if (review.authorId !== authorId) {
      throw new HttpError(403, "You can only delete your own reviews.");
    }

    await transaction.review.delete({ where: { id } });
    await refreshDestinationRating(transaction, review.destinationId);
  });
}
