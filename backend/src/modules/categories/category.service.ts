import prisma from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { HttpError } from "../../utils/http-error.js";
import type { PaginationOptions } from "../../utils/interface.js";
import type { CategoryInput, CategoryUpdate } from "./category.schema.js";
import { CategoryListQuery } from "./categories.interface.js";

async function queryCategories(
  query: CategoryListQuery,
  pagination: PaginationOptions,
  admin = false,
) {
  const search = query.search?.trim();
  const activeDestinationFilter: Prisma.DestinationCategoryWhereInput = {
    destination: { status: "active", isDeleted: false },
  };
  const where: Prisma.CategoryWhereInput = {
    ...(!admin && {
      destinations: { some: activeDestinationFilter },
    }),
    ...(search && {
      name: { contains: search, mode: "insensitive" },
    }),
  };
  const sortOrder = query.sortOrder ?? "asc";
  let sort: Prisma.CategoryOrderByWithRelationInput;
  switch (query.sortBy) {
    case "createdAt":
      sort = { createdAt: sortOrder };
      break;
    case "updatedAt":
      sort = { updatedAt: sortOrder };
      break;
    case "totalDestinations":
      sort = {
        destinations: {
          _count: sortOrder,
        },
      };
      break;
    case "name":
    default:
      sort = { name: sortOrder };
  }
  const orderBy: Prisma.CategoryOrderByWithRelationInput[] = [
    sort,
    { id: "asc" },
  ];
  const destinationCountFilter = admin ? undefined : activeDestinationFilter;

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy,
      include: {
        _count: {
          select: {
            destinations: {
              ...(destinationCountFilter && {
                where: destinationCountFilter,
              }),
            },
          },
        },
      },
    }),
    prisma.category.count({ where }),
  ]);

  return {
    data: categories.map(({ _count, ...category }) => ({
      ...category,
      totalDestinations: _count.destinations,
    })),
    meta: {
      page: pagination.page,
      limit: pagination.limit,
      total,
    },
  };
}

export function listCategories(
  query: CategoryListQuery,
  pagination: PaginationOptions,
) {
  return queryCategories(query, pagination);
}

export function listCategoriesForAdmin(
  query: CategoryListQuery,
  pagination: PaginationOptions,
) {
  return queryCategories(query, pagination, true);
}

export async function getCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          destinations: {
            where: { destination: { status: "active", isDeleted: false } },
          },
        },
      },
    },
  });

  if (!category) throw new HttpError(404, "Category was not found.");
  const { _count, ...record } = category;
  return { ...record, totalDestinations: _count.destinations };
}

export function createCategory(input: CategoryInput) {
  return prisma.category.create({ data: input });
}

export async function updateCategory(id: string, input: CategoryUpdate) {
  if (!(await prisma.category.findUnique({ where: { id }, select: { id: true } }))) {
    throw new HttpError(404, "Category was not found.");
  }
  const category = await prisma.category.update({
    where: { id },
    data: input,
    include: {
      _count: {
        select: {
          destinations: {
            where: { destination: { status: "active", isDeleted: false } },
          },
        },
      },
    },
  });
  const { _count, ...record } = category;
  return { ...record, totalDestinations: _count.destinations };
}

export async function deleteCategory(id: string) {
  if (!(await prisma.category.findUnique({ where: { id }, select: { id: true } }))) {
    throw new HttpError(404, "Category was not found.");
  }
  await prisma.category.delete({ where: { id } });
}
