import { useCallback, useMemo, useState } from "react";
import type { VehicleInput } from "../types/vehicle";
import type { NormalizedErrors } from "../normalizeError";
import { validateVehicleField } from "../validations/vehicle.field";
import { validateVehicleOnSubmit } from "../validations/vehicle.submit";
import { useValidatedForm } from "./useValidatedForm";
import { useAsyncAction } from "./useAsyncAction";

export function useVehicleForm(
  onSave: (vehicle: VehicleInput) => Promise<boolean>,
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
  } = useValidatedForm(
    { name: "", driven: "" },
    (field, value) => validateVehicleField(field as any, value),
    (values) =>
      validateVehicleOnSubmit({
        name: values.name,
        driven: values.driven ? { name: values.driven } : undefined,
      }) as NormalizedErrors
  );

  const { loading: isSubmitting, run } = useAsyncAction();
  const [hasUserEdited, setHasUserEdited] = useState(false);

  const handleNameChange = useCallback(
    (value: string) => {
      handleChange("name", value);
      if (externalErrors?.name) setHasUserEdited(true);
    },
    [handleChange, externalErrors?.name]
  );

  const handleDrivenChange = useCallback(
    (value: string) => {
      handleChange("driven", value);
      if (externalErrors?.driven) setHasUserEdited(true);
    },
    [handleChange, externalErrors?.driven]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const submitErrors = validateForm();
      if (Object.keys(submitErrors).length) return;

      await run(async () => {
        const payload: VehicleInput = {
          name: values.name,
          driven: values.driven ? { name: values.driven } : undefined,
        };

        const success = await onSave(payload);
        if (success) onClose();
      });
    },
    [values, validateForm, run, onSave, onClose]
  );

  const effectiveErrors = useMemo(
    () => (hasUserEdited ? errors : { ...errors, ...externalErrors }),
    [errors, externalErrors, hasUserEdited]
  );

  const isFormValid = useMemo(
    () =>
      (!effectiveErrors.name || effectiveErrors.name.length === 0) &&
      (!effectiveErrors.driven || effectiveErrors.driven.length === 0) &&
      !isSubmitting,
    [effectiveErrors, isSubmitting]
  );

  const reset = useCallback(() => {
    resetForm();
    setHasUserEdited(false);
  }, [resetForm]);

  return {
    name: values.name,
    driven: values.driven,
    isSubmitting,
    effectiveErrors,
    isFormValid,
    handleNameChange,
    handleDrivenChange,
    handleNameBlur: () => handleBlur("name"),
    handleDrivenBlur: () => handleBlur("driven"),
    handleSubmit,
    reset,
  };
}
