
export interface CategoryListQuery {
  search?: string;
  sortBy?: "name" | "createdAt" | "updatedAt" | "totalDestinations";
  sortOrder?: "asc" | "desc";
}
