import { useState } from "react";
import toast from "react-hot-toast";
import { User, Phone, Mail } from "lucide-react";
import { Modal } from "./Modal";
import { ValidatedInput } from "./ValidatedInput";
import type {
  CustomerCreateRequest,
  Customer,
} from "../services/customers/customer.types";
import {
  useCustomerValidation,
  type CustomerField,
} from "../hooks/customers/useCustomerValidation";
import { getFieldStyles } from "./fieldStyles.helper";
import type { ApiError } from "../types/api-error";
import { mapBackendErrors } from "../lib/errors/backendError";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CustomerCreateRequest) => Promise<Customer>;
  onSuccess: (customer: Customer) => void;
}

const initialFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

const CreateCustomerModal = ({
  isOpen,
  onClose,
  onCreate,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
  } = useCustomerValidation(initialFormData);

  const handleClose = () => {
    resetForm();
    setSubmitError(null);
    setLoading(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setSubmitError(null);
    clearFieldErrors();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = getSanitizedData();
      const customer = await onCreate(data);

      toast.success(`¡${customer.fullName} creado!`);
      onSuccess(customer);
      resetForm();
    } catch (err) {
      const error = err as ApiError;

      if (error?.errors) {
        Object.entries(error.errors).forEach(([field, e]) => {
          if (field in fields) {
            setFieldErrors(field as CustomerField, mapBackendErrors(e));
          }
        });
      } else {
        setSubmitError(error?.message || "Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form className="p-6 space-y-4" onSubmit={handleSubmit}>
        {submitError && <p className="text-red-500">{submitError}</p>}

        <ValidatedInput
          id="firstName"
          value={fields.firstName.value}
          fieldState={getFieldState("firstName")}
          styles={getFieldStyles(getFieldState("firstName"))}
          leftIcon={<User />}
          label="Nombre"
          onChange={(v) => handleFieldChange("firstName", v)}
          onBlur={() => handleFieldBlur("firstName")}
        />

        <ValidatedInput
          id="lastName"
          value={fields.lastName.value}
          fieldState={getFieldState("lastName")}
          styles={getFieldStyles(getFieldState("lastName"))}
          leftIcon={<User />}
          label="Apellido"
          onChange={(v) => handleFieldChange("lastName", v)}
          onBlur={() => handleFieldBlur("lastName")}
        />

        <ValidatedInput
          id="phone"
          value={fields.phone.value}
          fieldState={getFieldState("phone")}
          styles={getFieldStyles(getFieldState("phone"))}
          leftIcon={<Phone />}
          label="Teléfono"
          onChange={(v) => handleFieldChange("phone", v)}
          onBlur={() => handleFieldBlur("phone")}
        />

        <ValidatedInput
          id="email"
          value={fields.email.value}
          fieldState={getFieldState("email")}
          styles={getFieldStyles(getFieldState("email"))}
          leftIcon={<Mail />}
          label="Email"
          onChange={(v) => handleFieldChange("email", v)}
          onBlur={() => handleFieldBlur("email")}
        />

        <div className="flex gap-3">
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>

          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Cliente"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCustomerModal;
