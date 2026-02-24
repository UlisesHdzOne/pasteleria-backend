import { useState, useEffect } from "react";
import type { CreateCustomerDTO } from "../../context/customer/types";
import { useCustomer } from "../../context/customer/useCustomer";
import { useToast } from "../../context/toast/useToast";
import CustomerFormModal from "./CustomerFormPage/modal/CustomerFormModal";
import CustomerListPage from "./CustomerListPage";
import { Plus } from "lucide-react";
import Pagination from "../../components/shared/Pagination";
import CustomerHeader from "./CustomerHeader";

const LIMIT = 10;

const CustomerDashboard = () => {
  const { customers, fetchCustomers, createCustomer, loading, error, meta } =
    useCustomer();

  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // 🔥 cargar cuando cambie page o search
  useEffect(() => {
    fetchCustomers({ page, limit: LIMIT, search });
  }, [page, search, fetchCustomers]);

  const handleSave = async (customer: CreateCustomerDTO) => {
    const result = await createCustomer(customer);

    if (!result.success) {
      showToast(result.error || "Error al crear cliente", "error");
      return false;
    }

    showToast("Cliente creado correctamente", "success");
    setIsModalOpen(false);

    // Si no estás en la página 1, vuelve a 1
    if (page !== 1) {
      setPage(1);
    } else {
      // Si ya estás en la 1, fuerza recarga
      fetchCustomers({ page: 1, limit: LIMIT, search });
    }

    return true;
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-lg font-semibold">Clientes</h1>
      </header>

      <main className="flex-1 p-4 pb-24 space-y-4">
        <CustomerHeader
          total={meta?.total}
          search={search}
          onSearchChange={(value) => setSearch(value)}
        />

        {loading && <p className="text-center text-gray-500">Cargando...</p>}

        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && customers.length === 0 && (
          <p className="text-center text-gray-500 py-10">No hay resultados</p>
        )}

        {!loading && !error && customers.length > 0 && (
          <>
            <CustomerListPage customers={customers} />
            {meta && (
              <Pagination
                meta={meta}
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
              />
            )}
          </>
        )}
      </main>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-4 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg z-40 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>

      <CustomerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default CustomerDashboard;
