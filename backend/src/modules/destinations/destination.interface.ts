export interface DestinationFilterQuery {
  search?: string;
  categories?: string;
  sp_sort?: DestinationSpSort;
}

export enum DestinationSpSort {
  top_rated = "top_rated",
  most_viewed = "most_viewed",
  recently_added = "recently_added",
  alphabetical = "alphabetical",
}