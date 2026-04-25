import { CheckCircle, Eye, List, Plus } from "lucide-react";
import { Modal } from "./Modal";
import type { Customer } from "../services/customers/customer.types";

type ModalMode = "create" | "update";

type CustomerSuccessModalProps = {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onCreateAnother?: () => void;
  onViewDetails?: (customer: Customer) => void;
  onViewList?: () => void;
  mode?: ModalMode;
};

const CustomerSuccessModal = ({
  isOpen,
  customer,
  onClose,
  onCreateAnother,
  onViewDetails,
  onViewList,
  mode = "create",
}: CustomerSuccessModalProps) => {
  // 👉 fix importante
  if (!isOpen || !customer) return null;

  const isCreate = mode === "create";

  const title = isCreate ? "¡Cliente Creado!" : "¡Cliente Actualizado!";

  const message = isCreate
    ? `El cliente ${customer.fullName} ha sido registrado exitosamente.`
    : `El cliente ${customer.fullName} ha sido actualizado exitosamente.`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto text-center">
        {/* Icon + Title */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h2>

          <p className="text-muted-foreground">{message}</p>
        </div>

        {/* Info */}
        <div className="bg-muted rounded-lg p-4 mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono text-foreground">
                {customer.id.slice(0, 8)}...
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Nombre:</span>
              <span className="text-foreground">{customer.fullName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Teléfono:</span>
              <span className="text-foreground">{customer.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground">
                {customer.email || "No registrado"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Creado:</span>
              <span className="text-foreground">
                {new Date(customer.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(customer)}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ver Detalles
            </button>
          )}

          {onViewList && (
            <button
              onClick={onViewList}
              className="w-full rounded-md border px-4 py-2 text-sm font-medium flex items-center justify-center gap-2"
            >
              <List className="w-4 h-4" />
              Ver Lista de Clientes
            </button>
          )}

          {isCreate && onCreateAnother && (
            <button
              onClick={onCreateAnother}
              className="w-full rounded-md border px-4 py-2 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crear Otro Cliente
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80"
          >
            {isCreate ? "Cerrar" : "Finalizar"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerSuccessModal;
