import { UserPlus } from "lucide-react";
import { useCustomer } from "../context/customer/useCustomer";
import { useEffect } from "react";
import CustomerList from "../components/CustomerList";

const ClientePage = () => {
  const { customers,fetchCustomers, loading, error } = useCustomer();

    useEffect(() => {
    fetchCustomers({ });
  }, [fetchCustomers]);

  return (
    <div className="max-w-6xl max-auto">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Gestion de Clientes{" "}
        </h1>
        <p className="text-slate-600 text-lg">
          Administra tu base de datos de clientes de manera eficiente
        </p>
      </section>

      <section className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              Total de Clientes
            </h2>
            <p className="text-3xl font-bold text-blue-600"></p>
          </div>

          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <UserPlus className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-200" />
            <span className="relative z-10 text-lg">Crear Cliente</span>
          </button>
        </div>
      </section>

      {/* Customer List */}

      {loading && <p className="text-center text-gray-500">Cargando...</p>}

      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && customers.length === 0 && (
        <p className="text-center text-gray-500 py-10">No hay resultados</p>
      )}

      {!loading && !error && customers.length > 0 && (
        <div className="animate-fadeIn">
          <CustomerList customers={customers} />
        </div>
      )}
    </div>
  );
};

export default ClientePage;
