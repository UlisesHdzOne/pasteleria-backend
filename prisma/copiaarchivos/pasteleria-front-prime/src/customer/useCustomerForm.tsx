import { useCallback, useMemo, useState } from "react";
import type { CreateCustomerDTO } from "../context/customer/types";
import type { NormalizedErrors } from "../utils/normalizeError";
import { useEntityForm } from "../hooks/shared/useEntityForm";
import { validateCustomerField } from "../pages/customers/CustomerFormPage/customer.field";
import { validateCustomerSubmit } from "../pages/customers/CustomerFormPage/customer.submit";
import { FieldStateHelper } from "../pages/customers/CustomerFormPage/helpers/fieldState.helper";
import { InputSanitizer } from "../pages/customers/CustomerFormPage/helpers/inputSanitizer.helper";

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

  const handleFieldChange = useCallback(
    (field: keyof CreateCustomerDTO, value: string) => {
      // Determinar el tipo de entrada según el campo
      const inputType = field === "phone" ? "phone" : "text";

      // Sanitizar el valor en tiempo real
      const sanitized = InputSanitizer.sanitize(value, inputType);

      // Aplicar formato especial para teléfono
      const finalValue =
        inputType === "phone"
          ? InputSanitizer.formatPhone(sanitized.value)
          : sanitized.value;

      // Actualizar el formulario con el valor sanitizado
      form.handleFieldChange(field, finalValue);

      if (externalErrors?.[field]) setHasUserEdited(true);
    },
    [form, externalErrors],
  );

  // Mezclar errores externos solo si ya hubo submit o error del servidor
  const effectiveErrors = useMemo(
    () => (hasUserEdited ? form.errors : { ...form.errors, ...externalErrors }),
    [form.errors, externalErrors, hasUserEdited],
  );

  // Estado de validación para cada campo
  const fieldStates = useMemo(() => {
    const fields: (keyof CreateCustomerDTO)[] = [
      "firstName",
      "lastName",
      "phone",
    ];

    return fields.reduce(
      (acc, field) => {
        const value = form.values[field];
        const errors = effectiveErrors[field] || [];
        const touched = form.touched[field] || false;

        acc[field] = FieldStateHelper.getValidationState(
          value,
          errors,
          touched,
          form.isSubmitting,
        );

        return acc;
      },
      {} as Record<
        keyof CreateCustomerDTO,
        ReturnType<typeof FieldStateHelper.getValidationState>
      >,
    );
  }, [form.values, effectiveErrors, form.touched, form.isSubmitting]);

  // Validación del formulario optimizada
  const isFormValid = useMemo(() => {
    return (
      Object.values(fieldStates).every(
        (state) => state.isValid && !state.hasError,
      ) && !form.isSubmitting
    );
  }, [fieldStates, form.isSubmitting]);

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
    touched: form.touched,
    fieldStates, // 🆕 Estados de validación centralizados
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
