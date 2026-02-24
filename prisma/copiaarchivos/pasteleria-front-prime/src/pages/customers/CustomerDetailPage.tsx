import { useParams, useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/customer/useCustomer";

const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customers, loading, error } = useCustomer();

  const customer = customers?.find((c) => c.id === id);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!customer) return <p>Cliente no encontrado</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <main className="max-w-md mx-auto">
        <button
          onClick={() => navigate("/customers")}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Volver a Clientes
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {customer.firstName} {customer.lastName}
          </h1>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <p className="font-medium">{customer.firstName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Apellido</p>
              <p className="font-medium">{customer.lastName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Teléfono</p>
              <p className="font-medium">{customer.phone}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDetailPage;
