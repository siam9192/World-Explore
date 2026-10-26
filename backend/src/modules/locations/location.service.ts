import { Prisma } from "../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type { PaginationOptions } from "../../utils/interface.js";
import type {
  LocationInput,
  LocationListQuery,
  LocationUpdate,
} from "./location.schema.js";

export async function listLocations(
  query: LocationListQuery,
  pagination: PaginationOptions,
) {
  const search = query.search?.trim();
  const where: Prisma.LocationWhereInput = {
    ...(search && {
      OR: [
        { city: { contains: search, mode: "insensitive" } },
        { state: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { full: { contains: search, mode: "insensitive" } },
        { mapUrl: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(query.city && {
      city: { contains: query.city, mode: "insensitive" },
    }),
    ...(query.state && {
      state: { contains: query.state, mode: "insensitive" },
    }),
    ...(query.country && {
      country: { contains: query.country, mode: "insensitive" },
    }),
    ...(query.address && {
      address: { contains: query.address, mode: "insensitive" },
    }),
    ...(query.full && {
      full: { contains: query.full, mode: "insensitive" },
    }),
    ...(query.mapUrl && {
      mapUrl: { contains: query.mapUrl, mode: "insensitive" },
    }),
  };
  const sortBy = query.sortBy ?? "city";
  const sortOrder = query.sortOrder ?? "asc";
  const orderBy: Prisma.LocationOrderByWithRelationInput[] = [
    { [sortBy]: sortOrder },
    { id: "asc" },
  ];
  const [data, total] = await Promise.all([
    prisma.location.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy,
    }),
    prisma.location.count({ where }),
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

export async function getLocation(id: string) {
  const location = await prisma.location.findUnique({ where: { id } });
  if (!location) throw new HttpError(404, "Location was not found.");
  return location;
}

export function createLocation(input: LocationInput) {
  return prisma.location.create({ data: input });
}

export async function updateLocation(id: string, input: LocationUpdate) {
  try {
    return await prisma.location.update({ where: { id }, data: input });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new HttpError(404, "Location was not found.");
    }
    throw error;
  }
}

export async function deleteLocation(id: string) {
  try {
    await prisma.location.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new HttpError(404, "Location was not found.");
    }
    throw error;
  }
}
