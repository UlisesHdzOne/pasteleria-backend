// ─── Customers (API calls) ─────────────────────────

export type FetchCustomersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "deleted" | "all";
  sortBy?: "firstName" | "lastName" | "createdAt";
  sortOrder?: "asc" | "desc";
  createdFrom?: string;
  createdTo?: string;
};