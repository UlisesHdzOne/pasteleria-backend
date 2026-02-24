import { useCallback, useMemo, useState } from "react";
import type { NormalizedErrors } from "../normalizeError";
import type { DrivenInput } from "../components/CreateDrivenModal";
import { useValidatedForm } from "./useValidatedForm";
import { useAsyncAction } from "./useAsyncAction";
import { validateDrivenField } from "../validations/driven.field";
import { validateDrivenOnSubmit } from "../validations/driven.submit";


export function useDrivenForm(
  onSave: (driven: DrivenInput) => Promise<boolean>,
  onClose: () => void,
  externalErrors?: NormalizedErrors
) {

  
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    reset: resetForm,
  } = useValidatedForm<DrivenInput, NormalizedErrors>(
    { name: "" },
    validateDrivenField,
    validateDrivenOnSubmit
  );

  const { loading: isSubmitting, run } = useAsyncAction();
  const [hasUserEdited, setHasUserEdited] = useState(false);

  const handleFieldChange = useCallback(
    (field: keyof DrivenInput, value: string) => {
      handleChange(field, value);
      if (externalErrors?.[field]) setHasUserEdited(true);
    },
    [handleChange, externalErrors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const submitErrors = validateForm();
      if (Object.keys(submitErrors).length) return;

      await run(async () => {
        const success = await onSave({ ...values });
        if (success) {
          resetForm();
          onClose();
        }
      });
    },
    [values, validateForm, run, onSave, onClose, resetForm]
  );

  const effectiveErrors = useMemo(
    () => (hasUserEdited ? errors : { ...errors, ...externalErrors }),
    [errors, externalErrors, hasUserEdited]
  );

  const isFormValid = useMemo(
    () => !effectiveErrors.name?.length && !isSubmitting,
    [effectiveErrors, isSubmitting]
  );

  const reset = useCallback(() => {
    resetForm();
    setHasUserEdited(false);
  }, [resetForm]);

  return {
    // valores
    name: values.name,

    // estado
    isSubmitting,
    isFormValid,
    effectiveErrors,

    // handlers
    handleSubmit,
    reset,
    handleNameChange: (v: string) => handleFieldChange("name", v),
    handleNameBlur: () => handleBlur("name"),
  };
}
