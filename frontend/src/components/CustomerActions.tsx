import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import type { Customer } from "../services/customers/customer.types";

type Props = {
  customer: Customer;
  onDelete: (id: string) => void;
  onEdit?: (customer: Customer) => void;
};

const CustomerActions = ({ customer, onDelete, onEdit }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(customer.id);
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Botón Editar */}
        {onEdit && (
          <button
            onClick={() => onEdit(customer)}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Editar
          </button>
        )}

        {/* Separador */}
        {onEdit && <span className="text-border">|</span>}

        {/* Botón Eliminar */}
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-destructive hover:text-destructive/80 text-sm font-medium"
        >
          Eliminar
        </button>
      </div>

      {/* Modal de confirmación */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar cliente?"
        message={`¿Estás seguro de que quieres eliminar a ${customer.fullName}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </>
  );
};

export default CustomerActions;
