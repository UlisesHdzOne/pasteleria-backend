import type { ApiResponse } from "../types/api-response";
import { api } from "./axios";

/**
 * Responsabilidad: wrapper tipado que devuelve ApiResponse<T> intacto
 * El servicio es quien extrae los datos
 */
export const apiClient = {
  get: async <T>(url: string, config?: { params?: Record<string, any> }): Promise<ApiResponse<T>> => {
    const { data } = await api.get<ApiResponse<T>>(url, config);
    return data;
  },

  post: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    const { data } = await api.post<ApiResponse<T>>(url, body);
    return data;
  },

  patch: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
  const { data } = await api.patch<ApiResponse<T>>(url, body);
  return data;
},

  delete: async (url: string): Promise<void> => {
    await api.delete(url);
  },
};
