import { useCustomerActions } from "./useCustomerActions";
import { useCustomerList, type UseCustomerListFilters } from "./useCustomerList";

export { type UseCustomerListFilters };

export const useCustomers = (
  search?: string,
  setSearch?: (value: string) => void,
  filters?: UseCustomerListFilters,
  setFilters?: (filters: UseCustomerListFilters) => void,
) => {
  const list = useCustomerList(search, setSearch, filters, setFilters);
  const actions = useCustomerActions(() => list.fetchCustomers({ page: list.page }));

  return {
    ...list,
    ...actions,
  };
};
