import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

interface UseFiltersOptions<T> {
  initialFilters: T;
  debounceDelay?: number;
}

export function useFilters<T extends { search?: string }>({
  initialFilters,
  debounceDelay = 400,
}: UseFiltersOptions<T>) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [page, setPage] = useState(1);

  // Siempre se llama el hook (regla de React)
  const debouncedSearch = useDebounce(
    filters.search ?? "",
    debounceDelay
  );

  const params = useMemo(() => {
    return {
      page,
      ...filters,
      ...(filters.search !== undefined && {
        search: debouncedSearch,
      }),
    };
  }, [page, filters, debouncedSearch]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  return {
    page,
    setPage,
    filters,
    setFilters,
    params,
    resetFilters,
  };
}
