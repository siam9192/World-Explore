import prisma from "../../lib/prisma.js";
import { Prisma, UserRole } from "../../generated/prisma/client.js";
import { HttpError } from "../../utils/http-error.js";
import type {
  DestinationInput,
  DestinationUpdate,
} from "./destination.schema.js";
import { DestinationSpSort } from "./destination.interface.js";
import type { DestinationFilterQuery } from "./destination.interface.js";
import type { AuthUser, PaginationOptions } from "../../utils/interface.js";

const destinationInclude = {
  activities: { orderBy: { createdAt: "asc" as const } },
  categories: { include: { category: true } },
  location: true,
};

type DestinationRecord = Prisma.DestinationGetPayload<{
  include: typeof destinationInclude;
}>;

function presentDestination(destination: DestinationRecord) {
  const { categories, ...record } = destination;
  return {
    ...record,
    categories: categories.map(({ category }) => category.name),
  };
}

interface DestinationListResponse {
  id: string;
  shortDescription: string;
  slug: string;
  categories: { id: string; name: string }[];
  images: string[];
  isFavourite: boolean;
  location: {
    city: string;
    state: string | null;
    country: string;
    address: string;
    description: string;
    mapUrl: string | null;
  } | null;
  rating: number;
  totalReviews: number;
  price: Prisma.JsonValue;
}

function activityData(activities: NonNullable<DestinationInput["activities"]>) {
  return activities.map((activity) => ({
    ...activity,
    description: activity.description ?? null,
    clientIconId: activity.clientIconId ?? null,
    image: activity.image ?? null,
    price: activity.price ?? null,
    duration: activity.duration ?? null,
    isFree: activity.isFree ?? null,
    currency: activity.currency ?? null,
    icon: activity.icon ?? null,
  }));
}

async function listDestinations(
  authUser:AuthUser|undefined,
  filterQuery: DestinationFilterQuery,
  paginationOptions: PaginationOptions,
): Promise<{
  data: DestinationListResponse[];
  meta: { page: number; limit: number; total: number };
}> {
  const { limit, skip,page } = paginationOptions;
  const search = filterQuery.search?.trim();
  const categoryIds = filterQuery.categories
    ?.split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const where: Prisma.DestinationWhereInput = {
    status: "active",
    isDeleted: false,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(categoryIds?.length && {
      categories: {
        some: { categoryId: { in: categoryIds } },
      },
    }),
  };

  const sortOrder = paginationOptions.sortOrder ?? "desc";
  let sort: Prisma.DestinationOrderByWithRelationInput;
  switch (filterQuery.sp_sort) {
    case DestinationSpSort.top_rated:
      sort = { rating: "desc" };
      break;
    case DestinationSpSort.most_viewed:
      sort = { totalReviews: "desc" };
      break;
    case DestinationSpSort.recently_added:
      sort = { createdAt: "desc" };
      break;
    case DestinationSpSort.alphabetical:
      sort = { title: "asc" };
      break;
    default:
      switch (paginationOptions.sortBy) {
        case "title":
          sort = { title: sortOrder };
          break;
        case "rating":
          sort = { rating: sortOrder };
          break;
        case "totalReviews":
          sort = { totalReviews: sortOrder };
          break;
        case "createdAt":
        default:
          sort = { createdAt: sortOrder };
      }
  }

  const orderBy: Prisma.DestinationOrderByWithRelationInput[] = [
    sort,
    { id: "asc" as const },
  ];

  const [destinations, total] = await Promise.all([
    prisma.destination.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        categories: { include: { category: true } },
        location: true,
      },
    }),
    prisma.destination.count({ where }),
  ]);

  const favouriteDestinationIds =
    authUser?.role === UserRole.user && destinations.length > 0
      ? new Set(
          (
            await prisma.favouriteDestination.findMany({
              where: {
                userId: authUser.id,
                destinationId: {
                  in: destinations.map(({ id }) => id),
                },
              },
              select: { destinationId: true },
            })
          ).map(({ destinationId }) => destinationId),
        )
      : new Set<string>();

  return {
    data: destinations.map((destination) => ({
      id: destination.id,
      shortDescription: destination.shortDescription,
      slug: destination.slug,
      categories: destination.categories.map(({ category }) => ({
        id: category.id,
        name: category.name,
      })),
      images: Array.isArray(destination.images)
        ? destination.images
            .filter((image): image is string => typeof image === "string")
            .slice(0, 3)
        : [],
      isFavourite: favouriteDestinationIds.has(destination.id),
      location: destination.location,
      rating: destination.rating,
      totalReviews: destination.totalReviews,
      price: destination.price,
    })),
   meta:{
    page,
    limit,
    total
   }
  };
}

async function listDestinationsForAdmin(
  filterQuery: DestinationFilterQuery,
  paginationOptions: PaginationOptions,
) {
  const { limit, skip,page } = paginationOptions;
  const search = filterQuery.search?.trim();
  const categoryIds = filterQuery.categories
    ?.split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const where: Prisma.DestinationWhereInput = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(categoryIds?.length && {
      categories: {
        some: { categoryId: { in: categoryIds } },
      },
    }),
  };

  const sortOrder = paginationOptions.sortOrder ?? "desc";
  let sort: Prisma.DestinationOrderByWithRelationInput;
  switch (filterQuery.sp_sort) {
    case DestinationSpSort.top_rated:
      sort = { rating: "desc" };
      break;
    case DestinationSpSort.most_viewed:
      sort = { totalReviews: "desc" };
      break;
    case DestinationSpSort.recently_added:
      sort = { createdAt: "desc" };
      break;
    case DestinationSpSort.alphabetical:
      sort = { title: "asc" };
      break;
    default:
      switch (paginationOptions.sortBy) {
        case "title":
          sort = { title: sortOrder };
          break;
        case "rating":
          sort = { rating: sortOrder };
          break;
        case "totalReviews":
          sort = { totalReviews: sortOrder };
          break;
        case "createdAt":
        default:
          sort = { createdAt: sortOrder };
      }
  }

  const orderBy: Prisma.DestinationOrderByWithRelationInput[] = [
    sort,
    { id: "asc" },
  ];
  const [destinations, total] = await Promise.all([
    prisma.destination.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include:{
        categories:{
          include:{
            category:true
          }
        },
        location:true
      }
    }),
    prisma.destination.count({ where }),
  ]);

   return {
    data: destinations.map((destination) => ({
      id: destination.id,
      shortDescription: destination.shortDescription,
      slug: destination.slug,
      categories: destination.categories.map(({ category }) => ({
        id: category.id,
        name: category.name,
      })),
      images: Array.isArray(destination.images)
        ? destination.images
            .filter((image): image is string => typeof image === "string")
            .slice(0, 3)
        : [],
      location: destination.location,
      rating: destination.rating,
      totalReviews: destination.totalReviews,
      price: destination.price,
    })),
   meta:{
    page,
    limit,
    total
   }
  };
}


async function getDestinationBySlug(
  idOrSlug: string,
  authUser?: AuthUser,
) {
  const destination = await prisma.destination.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      isDeleted: false,
      status: "active",
    },
    include: destinationInclude,
  });
  if (!destination) throw new HttpError(404, "Destination was not found.");

  const isFavourite =
    authUser?.role === UserRole.user &&
    Boolean(
      await prisma.favouriteDestination.findFirst({
        where: { userId: authUser.id, destinationId: destination.id },
        select: { id: true },
      }),
    );

  return {
    ...presentDestination(destination),
    isFavourite,
  };
}

async function createDestination(input: DestinationInput) {
  const { categories, activities, location, ...fields } = input;
  const categoryIds = [...new Set(categories)];

  const existCategories = (
    await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      select: {
        id: true,
      },
    })
  ).map((cat) => cat.id);

  const missingCategories = categoryIds.filter(
    (id) => !existCategories.includes(id),
  );

  if (missingCategories.length > 0) {
    throw new HttpError(
      404,
      `The following category IDs do not exist: ${missingCategories.join(", ")}`,
    );
  }

  const destination = await prisma.$transaction(async (transaction) => {
    if (location) {
      const existingLocation = await transaction.location.findFirst({
        where: {
          city: { equals: location.city, mode: "insensitive" },
          state: location.state
            ? { equals: location.state, mode: "insensitive" }
            : null,
          country: { equals: location.country, mode: "insensitive" },
          address: { equals: location.address, mode: "insensitive" },
        },
        select: { id: true },
      });

      if (!existingLocation) {
        const full = [
          location.address,
          location.city,
          location.state,
          location.country,
        ]
          .filter(Boolean)
          .join(", ");
        await transaction.location.create({
          data: {
            city: location.city,
            state: location.state ?? null,
            country: location.country,
            address: location.address,
            full,
            mapUrl: location.mapUrl ?? null,
          },
        });
      }
    }

    return transaction.destination.create({
      data: {
        ...fields,
        tagline: fields.tagline ?? fields.shortDescription,
        categories: {
          create: categoryIds.map((catId) => ({
            categoryId: catId,
          })),
        },
        ...(activities && {
          activities: { create: activityData(activities) },
        }),
        ...(location && { location: { create: location } }),
      },
      include: destinationInclude,
    });
  });
  return presentDestination(destination);
}

async function updateDestination(
  destinationId: string,
  input: DestinationUpdate,
) {
  const { id, categories, activities, location, ...fields } = input;
  if (id !== undefined) {
    throw new HttpError(400, "Destination IDs cannot be changed.");
  }

  const destination = await prisma.$transaction(async (transaction) => {
    const existing = await transaction.destination.findFirst({
      where: { id: destinationId, isDeleted: false },
      select: { id: true },
    });
    if (!existing) throw new HttpError(404, "Destination was not found.");

    const relationData: Prisma.DestinationUpdateInput = {};
    if (categories !== undefined) {
      const categoryIds = [...new Set(categories)];
      const existingCategories = await transaction.category.findMany({
        where: { id: { in: categoryIds } },
        select: { id: true },
      });
      const existingCategoryIds = new Set(
        existingCategories.map(({ id }) => id),
      );
      const missingCategoryIds = categoryIds.filter(
        (categoryId) => !existingCategoryIds.has(categoryId),
      );
      if (missingCategoryIds.length > 0) {
        throw new HttpError(
          404,
          `The following category IDs do not exist: ${missingCategoryIds.join(", ")}`,
        );
      }
      relationData.categories = {
        deleteMany: {},
        create: categoryIds.map((categoryId) => ({ categoryId })),
      };
    }
    if (activities !== undefined) {
      relationData.activities = {
        deleteMany: {},
        create: activityData(activities),
      };
    }
    if (location !== undefined) {
      await transaction.destinationLocation.deleteMany({
        where: { destinationId },
      });
      if (location) {
        relationData.location = { create: location };
      }
    }

    return transaction.destination.update({
      where: { id: destinationId },
      data: {
        ...fields,
        ...(fields.shortDescription &&
          !fields.tagline && { tagline: fields.shortDescription }),
        ...relationData,
      },
      include: destinationInclude,
    });
  });
  return presentDestination(destination);
}

async function deleteDestination(id: string) {
  const result = await prisma.destination.updateMany({
    where: { id, isDeleted: false },
    data: { isDeleted: true, status: "inactive" },
  });
  if (result.count === 0)
    throw new HttpError(404, "Destination was not found.");
}


const destinationService = {
  listDestinations,
  listDestinationsForAdmin,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
};

export default destinationService;