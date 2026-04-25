import { useCallback, useEffect, useState } from "react";
import { customerService } from "../../services/customers/customer.service";

import type { Customer } from "../../services/customers/customer.types";
import type { PaginationMeta } from "../../types/pagination";
import type { FetchCustomersParams } from "./customer";
import { useDebounce } from "./useDebounce";

const PAGE_LIMIT = 10;
const DEBOUNCE_MS = 300;

export interface UseCustomerListFilters {
  search?: string;
  status?: "active" | "deleted" | "all";
  sortBy?: "firstName" | "lastName" | "createdAt";
  sortOrder?: "asc" | "desc";
  createdFrom?: string;
  createdTo?: string;
}

interface NormalizedError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export const useCustomerList = (
  search?: string,
  setSearch?: (value: string) => void,
  filters?: UseCustomerListFilters,
  setFilters?: (filters: UseCustomerListFilters) => void,
) => {
  const [data, setData] = useState<Customer[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const [internalSearch, setInternalSearch] = useState("");
  const [internalFilters, setInternalFilters] =
    useState<UseCustomerListFilters>({});

  const currentSearch = search ?? internalSearch;
  const currentSetFilters = setFilters ?? setInternalFilters;
  const currentFilters = filters ?? internalFilters;

  const [totalAll, setTotalAll] = useState<number | null>(null);
  const debouncedSearch = useDebounce(currentSearch, DEBOUNCE_MS);

  const clearError = useCallback(() => setError(null), []);

  const fetchTotalAll = useCallback(async () => {
    try {
      const res = await customerService.getAllWithMeta({
        page: 1,
        limit: 1,
      });
      if (res?.meta) {
        setTotalAll(res.meta.total);
      }
    } catch (err) {
      console.error("Error al obtener total global:", err);
    }
  }, []);

  const fetchCustomers = useCallback(async (params?: FetchCustomersParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await customerService.getAllWithMeta(params);
      if (result && Array.isArray(result.data)) {
        setData(result.data);
        setMeta(result.meta);
        setPage(params?.page || 1);
      } else {
        setData([]);
        setError("Respuesta inválida del servidor");
      }
    } catch (err) {
      const error = err as NormalizedError;
      setError(error.message || "Error al cargar clientes");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Resetear página cuando cambian filtros de búsqueda
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCustomers({
      page,
      limit: PAGE_LIMIT,
      search: debouncedSearch || undefined,
      ...currentFilters,
    });
  }, [page, debouncedSearch, currentFilters, fetchCustomers]);

  // 👉 Obtener total global cuando cambian filtros relevantes
  useEffect(() => {
    fetchTotalAll();
  }, [fetchTotalAll]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const goToNextPage = useCallback(() => {
    if (meta?.hasNext) {
      setPage((prev) => prev + 1);
    }
  }, [meta?.hasNext]);

  const goToPrevPage = useCallback(() => {
    if (meta?.hasPrev) {
      setPage((prev) => prev - 1);
    }
  }, [meta?.hasPrev]);

  const updateFilter = useCallback(
    <K extends keyof UseCustomerListFilters>(
      key: K,
      value: UseCustomerListFilters[K],
    ) => {
      currentSetFilters({
        ...currentFilters,
        [key]: value,
      });
      setPage(1); // Resetear página al cambiar filtros
    },
    [currentFilters, currentSetFilters],
  );

  return {
    data,
    meta,
    loading,
    error,
    clearError,
    page,
    totalAll,
    search: currentSearch,
    setSearch: setSearch ?? setInternalSearch,
    filters: currentFilters,
    setFilters: currentSetFilters,
    fetchCustomers,
    goToPage,
    goToNextPage,
    goToPrevPage,
    updateFilter,
  };
};
