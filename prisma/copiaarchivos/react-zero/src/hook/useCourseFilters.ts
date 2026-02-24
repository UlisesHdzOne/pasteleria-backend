import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export type StatusFilter = "all" | "active" | "inactive";
export type LifecycleFilter = "all" | "DRAFT" | "ACTIVE" | "ARCHIVED";

export function useCourseFilters() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [lifecycle, setLifecycle] = useState<LifecycleFilter>("all");

  const debouncedSearch = useDebounce(search, 400);

  const params = useMemo(
    () => ({
      page,
      search: debouncedSearch,
      isActive: status === "all" ? undefined : status === "active",
      statusLifecycle: lifecycle === "all" ? undefined : lifecycle,
    }),
    [page, debouncedSearch, status, lifecycle],
  );

  const resetFilters = () => {
    setPage(1);
    setStatus("all");
    setLifecycle("all");
    setSearch("");
  };

  return {
    page,
    setPage,
    status,
    lifecycle,
    setLifecycle,
    setStatus,
    search,
    setSearch,
    params,
    resetFilters,
  };
}
