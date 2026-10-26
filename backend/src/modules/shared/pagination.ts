import { z } from "zod";

import { calculatePagination } from "../../utils/helpers.js";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export function paginationValues(input: unknown) {
  const parsed = paginationSchema.parse(input);
  const { page, limit, skip } = calculatePagination({
    page: parsed.page,
    limit: parsed.limit,
  });

  return { page, limit, skip };
}
