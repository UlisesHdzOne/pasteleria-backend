import { useState } from "react";
import CustomerFormModal from "./modal/CustomerFormModal";
import type { CreateCustomerDTO } from "../../../context/customer/types";
import { useCustomer } from "../../../context/customer/useCustomer";
import { useToast } from "../../../context/toast/useToast";

const CustomerFormPage = () => {
  const { createCustomer, loading, error } = useCustomer();
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(true);

  const handleSave = async (customer: CreateCustomerDTO) => {
    const result = await createCustomer(customer);

    if (result.success) {
      showToast("Cliente creado correctamente", "success");
      setIsOpen(false);
      return true;
    } else {
      const message = result.error || "Error al crear cliente";
      showToast(message, "error");
      return false;
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <main className="max-w-md mx-auto">
        <CustomerFormModal
          isOpen={isOpen}
          onClose={() => window.history.back()}
          onSave={handleSave}
        />
      </main>
    </div>
  );
};

export default CustomerFormPage;
