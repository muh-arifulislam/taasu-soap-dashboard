export interface Meta {
  total: number;
  page: number;
  limit: number;
  skip: number;
  hasMore?: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: Meta;
}
