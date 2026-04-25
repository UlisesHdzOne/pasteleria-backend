import { useState } from "react";
import toast from "react-hot-toast";
import CustomerList from "./CustomerList";
import { Loading } from "./Loading";
import CreateCustomerModal from "./CreateCustomerModal";
import CustomerSuccessModal from "./CustomerSuccessModal";
import Pagination from "./Pagination";
import CustomerFilters from "./CustomerFilters";
import { useCustomers } from "../hooks/customers/useCustomers";
import type {
  Customer,
  CustomerCreateRequest,
} from "../services/customers/customer.types";
import EditCustomerModal from "./EditCustomerModal";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (value: boolean) => void;
};

const CustomerListContainer = ({
  search,
  setSearch,
  isCreateOpen,
  setIsCreateOpen,
}: Props) => {
  const {
    data,
    meta,
    page,
    totalAll,
    loading,
    error,
    filters,
    remove,
    create,
    update,
    goToPrevPage,
    goToNextPage,
    updateFilter,
  } = useCustomers(search, setSearch);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [createdCustomer, setCreatedCustomer] = useState<Customer | null>(null);
  const [updatedCustomer, setUpdatedCustomer] = useState<Customer | null>(null);

  const handleCreate = async (
    data: CustomerCreateRequest,
  ): Promise<Customer> => {
    return await create(data);
  };

  return (
    <div>
      {loading && <Loading />}

      <CustomerFilters filters={filters} onUpdateFilter={updateFilter} />

      <CustomerList
        customers={data}
        onDelete={async (id) => {
          await remove(id);
          toast.success("Cliente eliminado");
        }}
        onEdit={setEditingCustomer}
        error={error}
        showActions={filters.status !== "deleted"}
      />

      {meta && (
        <Pagination
          meta={meta}
          page={page}
          totalAll={totalAll}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
        />
      )}

      {/* CREATE */}
      <CreateCustomerModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
        onSuccess={(customer) => {
          setCreatedCustomer(customer);
          setIsCreateOpen(false);
        }}
      />

      {/* SUCCESS CREATE */}
      <CustomerSuccessModal
        isOpen={!!createdCustomer}
        customer={createdCustomer}
        onClose={() => setCreatedCustomer(null)}
        onCreateAnother={() => {
          setCreatedCustomer(null);
          setIsCreateOpen(true);
        }}
      />

      {/* EDIT */}
      <EditCustomerModal
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        customer={editingCustomer}
        onUpdate={update}
        onSuccess={(customer) => {
          setUpdatedCustomer(customer);
          setEditingCustomer(null);
        }}
      />

      {/* SUCCESS UPDATE */}
      <CustomerSuccessModal
        isOpen={!!updatedCustomer}
        customer={updatedCustomer}
        onClose={() => setUpdatedCustomer(null)}
        mode="update"
      />
    </div>
  );
};

export default CustomerListContainer;