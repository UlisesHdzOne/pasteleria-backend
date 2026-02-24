import { useCallback, useMemo, useState } from "react";
import type { CreateCustomerDTO } from "../../context/customer/types";
import type { NormalizedErrors } from "../../utils/normalizeError";
import { validateCustomerField } from "../../pages/customers/CustomerFormPage/customer.field";
import { validateCustomerSubmit } from "../../pages/customers/CustomerFormPage/customer.submit";
import { useEntityForm } from "../shared/useEntityForm";

export function useCustomerForm(
  onSave: (customer: CreateCustomerDTO) => Promise<boolean>,
  externalErrors?: NormalizedErrors,
) {
  const form = useEntityForm<CreateCustomerDTO>({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    validateField: validateCustomerField,
    validateOnSubmit: validateCustomerSubmit,
    onSave,
    externalErrors,
  });

  const [hasUserEdited, setHasUserEdited] = useState(false);

  // manejar cambios de campo con control de errores externos
  const handleFieldChange = useCallback(
    (field: keyof CreateCustomerDTO, value: string) => {
      form.handleFieldChange(field, value);
      if (externalErrors?.[field]) setHasUserEdited(true);
    },
    [form, externalErrors],
  );

  const effectiveErrors = useMemo(
    () => (hasUserEdited ? form.errors : { ...form.errors, ...externalErrors }),
    [form.errors, externalErrors, hasUserEdited],
  );

  const isFormValid = useMemo(() => {
    const { firstName, lastName, phone } = form.values;

    // validamos cada campo con las reglas
    const firstNameErrors = validateCustomerField("firstName", firstName);
    const lastNameErrors = validateCustomerField("lastName", lastName);
    const phoneErrors = validateCustomerField("phone", phone);

    return (
      firstNameErrors.length === 0 &&
      lastNameErrors.length === 0 &&
      phoneErrors.length === 0 &&
      !form.isSubmitting
    );
  }, [form.values, form.isSubmitting]);

  const reset = useCallback(() => {
    form.reset();
    setHasUserEdited(false);
  }, [form]);

  return {
    // valores
    firstName: form.values.firstName,
    lastName: form.values.lastName,
    phone: form.values.phone,

    // estado
    isSubmitting: form.isSubmitting,
    isFormValid,
    effectiveErrors,

    // handlers
    handleSubmit: form.handleSubmit,
    reset,

    handleFirstNameChange: (v: string) => handleFieldChange("firstName", v),
    handleFirstNameBlur: () => form.handleBlur("firstName"),

    handleLastNameChange: (v: string) => handleFieldChange("lastName", v),
    handleLastNameBlur: () => form.handleBlur("lastName"),

    handlePhoneChange: (v: string) => handleFieldChange("phone", v),
    handlePhoneBlur: () => form.handleBlur("phone"),
  };
}
