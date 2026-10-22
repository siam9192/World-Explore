
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