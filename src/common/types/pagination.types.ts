export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalGlobal: number;
  };
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
};
