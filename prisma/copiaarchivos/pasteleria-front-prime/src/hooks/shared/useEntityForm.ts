import { useCallback, useMemo, useState } from "react";
import type { NormalizedErrors } from "../../utils/normalizeError";
import { useValidatedForm } from "./Form/useValidatedForm";
import { useAsyncAction } from "./Form/useAsyncAction";

interface UseEntityFormProps<T> {
  initialValues: T;
  validateField: <K extends keyof T>(
    field: K,
    value: T[K],
  ) => string[] | undefined;

  validateOnSubmit: (values: T) => NormalizedErrors;
  onSave: (values: T) => Promise<boolean>;
  externalErrors?: NormalizedErrors;
}
export function useEntityForm<T extends object>({
  initialValues,
  validateField,
  validateOnSubmit,
  onSave,
  externalErrors,
}: UseEntityFormProps<T>) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    reset: resetForm,
  } = useValidatedForm<T, NormalizedErrors>(
    initialValues,
    validateField,
    validateOnSubmit,
  );

  const { loading: isSubmitting, run } = useAsyncAction();
  const [hasUserEdited, setHasUserEdited] = useState(false);

  const handleFieldChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      handleChange(field, value);

      if (externalErrors?.[field as string]) {
        setHasUserEdited(true);
      }
    },
    [handleChange, externalErrors],
  );

const handleSubmit = useCallback(
  async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();

    const submitErrors = validateForm();
    if (Object.keys(submitErrors).length > 0) return false;

    let result = false;

    await run(async () => {
      result = await onSave({ ...values });
      if (result) {
        resetForm();
      }
    });

    return result;
  },
  [values, validateForm, run, onSave, resetForm]
);



  const effectiveErrors = useMemo(
    () => (hasUserEdited ? errors : { ...errors, ...externalErrors }),
    [errors, externalErrors, hasUserEdited],
  );

const isFormValid = useMemo(
  () =>
    !Object.values(effectiveErrors).some(
      (val) => val && val.length > 0
    ) && !isSubmitting,
  [effectiveErrors, isSubmitting]
);


  const reset = useCallback(() => {
    resetForm();
    setHasUserEdited(false);
  }, [resetForm]);

  return {
    values,
    errors: effectiveErrors,
    touched,
    isSubmitting,
    isFormValid,
    handleFieldChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
