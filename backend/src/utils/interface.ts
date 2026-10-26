export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
  meta?: ApiMeta;
}

export interface PaginationOptions {
  page: number ;
  sortBy: string;
  sortOrder?:"asc"|"desc";
  limit: number;
  skip:number,
  take:number
}


export interface AuthUser {
  id:string
  role:string
}