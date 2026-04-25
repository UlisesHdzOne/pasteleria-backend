import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User, Phone, Mail } from "lucide-react";
import { Modal } from "./Modal";
import { ValidatedInput } from "./ValidatedInput";
import type {
  Customer,
  CustomerCreateRequest,
} from "../services/customers/customer.types";
import {
  useCustomerValidation,
  type CustomerField,
} from "../hooks/customers/useCustomerValidation";
import { getFieldStyles } from "./fieldStyles.helper";
import { mapBackendErrors } from "../lib/errors/backendError";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  onUpdate: (
    id: string,
    data: CustomerCreateRequest,
  ) => Promise<Customer>;
  onSuccess: (customer: Customer) => void;
}

const getInitialFormData = (customer: Customer | null) => {
  if (!customer) {
    return { firstName: "", lastName: "", phone: "", email: "" };
  }
  const nameParts = customer.fullName.split(" ");
  return {
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    phone: customer.phone,
    email: customer.email || "",
  };
};

const EditCustomerModal = ({
  isOpen,
  onClose,
  customer,
  onUpdate,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastCustomerId, setLastCustomerId] = useState<string | null>(null);

  const {
    fields,
    getFieldState,
    handleFieldChange,
    handleFieldBlur,
    validateForm,
    resetForm,
    setFieldErrors,
    clearFieldErrors,
    getSanitizedData,
  } = useCustomerValidation(getInitialFormData(customer));

  useEffect(() => {
    if (customer) {
      resetForm(getInitialFormData(customer));
      setLastCustomerId(customer.id);
      setSubmitError(null);
    }
  }, [customer?.id, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    setSubmitError(null);
    clearFieldErrors();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const dataToSubmit = getSanitizedData();
      const updated = await onUpdate(customer.id, dataToSubmit);

      toast.success(`¡${updated.fullName} actualizado exitosamente!`);
      onSuccess(updated); // 👉 clave
    } catch (err) {
      const error = err as {
        message?: string;
        errors?: Record<string, { message: string; code?: string }>;
      };

      if (error.errors) {
        Object.entries(error.errors).forEach(([field, fieldError]) => {
          if (fieldError) {
            setFieldErrors(field as CustomerField, mapBackendErrors(fieldError));
          }
        });
      } else {
        setSubmitError(error.message || "Error al actualizar cliente");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <h2 className="text-xl font-semibold">Editar Cliente</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {submitError && (
            <div className="p-3 bg-destructive/10 border rounded-md">
              {submitError}
            </div>
          )}

          <ValidatedInput
            id="edit-firstName"
            value={fields.firstName.value}
            fieldState={getFieldState("firstName")}
            styles={getFieldStyles(getFieldState("firstName"))}
            leftIcon={<User />}
            label="Nombre"
            onChange={(v) => handleFieldChange("firstName", v)}
            onBlur={() => handleFieldBlur("firstName")}
          />

          <ValidatedInput
            id="edit-lastName"
            value={fields.lastName.value}
            fieldState={getFieldState("lastName")}
            styles={getFieldStyles(getFieldState("lastName"))}
            leftIcon={<User />}
            label="Apellido"
            onChange={(v) => handleFieldChange("lastName", v)}
            onBlur={() => handleFieldBlur("lastName")}
          />

          <ValidatedInput
            id="edit-phone"
            value={fields.phone.value}
            fieldState={getFieldState("phone")}
            styles={getFieldStyles(getFieldState("phone"))}
            leftIcon={<Phone />}
            label="Teléfono"
            onChange={(v) => handleFieldChange("phone", v)}
            onBlur={() => handleFieldBlur("phone")}
          />

          <ValidatedInput
            id="edit-email"
            value={fields.email.value}
            fieldState={getFieldState("email")}
            styles={getFieldStyles(getFieldState("email"))}
            leftIcon={<Mail />}
            label="Email"
            onChange={(v) => handleFieldChange("email", v)}
            onBlur={() => handleFieldBlur("email")}
          />

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCustomerModal;