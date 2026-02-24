import { Plus } from "lucide-react";

const AddressesDashboard = () => {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-lg font-semibold">Direcciones</h1>
      </header>

      <main className="flex-1 p-4 pb-32">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            No hay direcciones registradas aún
          </p>
          <p className="text-sm text-gray-400">
            Usa el botón flotante (+) para agregar tu primera dirección
          </p>
        </div>
      </main>

      <button
        className="fixed bottom-24 right-4 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 z-40 flex items-center justify-center"
        aria-label="Agregar dirección"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
export default AddressesDashboard;
