import { useState, useCallback } from "react";

export function useValidatedForm<T extends Record<string, any>, E>(
  initialValues: T,
  validateField: (field: keyof T, value: any) => string[] | undefined,
  validateOnSubmit: (values: T) => E
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);
  const [errors, setErrors] = useState<E>({} as E);

  const handleChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((p) => ({ ...p, [field]: value }));

      if (touched[field]) {
        setErrors((p: any) => ({
          ...p,
          [field]: validateField(field, value),
        }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    <K extends keyof T>(field: K) => {
      setTouched((p) => ({ ...p, [field]: true }));
      setErrors((p: any) => ({
        ...p,
        [field]: validateField(field, values[field]),
      }));
    },
    [validateField, values]
  );

  const validateForm = useCallback(() => {
    const submitErrors = validateOnSubmit(values);
    setErrors(submitErrors);
    return submitErrors;
  }, [validateOnSubmit, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({} as any);
    setErrors({} as E);
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
