import { apiClient } from "../../api/apiClient";
import type { Customer } from "./customer.types";
import type { PaginationMeta } from "../../types/pagination";
import type { FetchCustomersParams } from "../../hooks/customers/customer";
import type {
  CustomerCreateRequest,
  CustomerUpdateRequest,
} from "./customer.types";

/**
 * Responsabilidad: extraer datos de ApiResponse<T>
 * Pueden acceder a success, message, meta si lo necesitan
 */
export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const res = await apiClient.get<Customer[]>("/customer");
    return res.data;
  },

  getAllWithMeta: async (
    params?: FetchCustomersParams,
  ): Promise<{ data: Customer[]; meta?: PaginationMeta }> => {
    const res = await apiClient.get<Customer[]>("/customer", { params });
    return {
      data: res.data,
      meta: res.meta,
    };
  },

  create: async (data: CustomerCreateRequest): Promise<Customer> => {
    const res = await apiClient.post<Customer>("/customer", data);
    return res.data;
  },

  update: async (
    id: string,
    data: CustomerUpdateRequest,
  ): Promise<Customer> => {
    const res = await apiClient.patch<Customer>(`/customer/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/customer/${id}`);
  },
};
