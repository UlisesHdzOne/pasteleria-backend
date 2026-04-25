import type { ApiError } from "../types/api-error";
import { api } from "./axios";

/**
 * Responsabilidad única: normalizar errores HTTP
 * Estructura esperada del backend:
 * {
 *   success: false,
 *   statusCode: 409,
 *   errorCode: "UNIQUE_CONSTRAINT_VIOLATION",
 *   message: "...",
 *   errors: { campo: { message: "...", code: "..." } }
 * }
 */
export function setupInterceptors() {
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      const data = error.response?.data;

      // Normalizar al formato que usa el frontend
    const normalizedError: ApiError = {
        status,
        statusCode: data?.statusCode || status,
        errorCode: data?.errorCode || "UNKNOWN_ERROR",
        success: data?.success ?? false,
        message: data?.message || "Error inesperado",
        data: data?.data ?? null,
        errors: data?.errors || null,
        timestamp: data?.timestamp,
        path: data?.path,
      };

      return Promise.reject(normalizedError);
    }
  );
}