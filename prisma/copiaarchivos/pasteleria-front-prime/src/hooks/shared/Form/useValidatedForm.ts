import { useState, useCallback } from "react";

export function useValidatedForm<T extends object, E extends object>(
  initialValues: T,
  validateField: <K extends keyof T>(
    field: K,
    value: T[K],
  ) => string[] | undefined,
  validateOnSubmit: (values: T) => E,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<Partial<E>>({});

  const handleChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // marcar como touched mientras escribe para feedback inmediato
      setTouched((prev) => ({ ...prev, [field]: true }));

      // validar el campo
      const fieldErrors = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors }));
    },
    [validateField],
  );

  const handleBlur = useCallback(
    <K extends keyof T>(field: K) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, values[field]),
      }));
    },
    [validateField, values],
  );

  const validateForm = useCallback(() => {
    const submitErrors = validateOnSubmit(values);
    setErrors(submitErrors);
    return submitErrors;
  }, [validateOnSubmit, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  }, [initialValues]);

  return {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    reset,
  };
}
