import { useCallback } from "react";
import { customerService } from "../../services/customers/customer.service";
import type { CustomerCreateRequest, CustomerUpdateRequest, CustomerResponse } from "../../services/customers/customer.types";

export const useCustomerActions = (refresh?: () => void) => {
  const create = useCallback(
    async (data: CustomerCreateRequest): Promise<CustomerResponse> => {
      const newCustomer = await customerService.create(data);
      refresh?.();
      return newCustomer;
    },
    [refresh],
  );

  const update = useCallback(
    async (id: string, data: CustomerUpdateRequest): Promise<CustomerResponse> => {
      const updated = await customerService.update(id, data);
      refresh?.();
      return updated;
    },
    [refresh],
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      await customerService.delete(id);
      refresh?.();
    },
    [refresh],
  );

  return {
    create,
    update,
    remove,
  };
};
