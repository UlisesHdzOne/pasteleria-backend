import { useCallback, useMemo, useState } from "react";
import type { NormalizedErrors } from "../normalizeError";
import type {
  CourseLifecycleStatus,
  CourseUpdateInput,
} from "../types/course/course";
import { useValidatedForm } from "./useValidatedForm";
import { useAsyncAction } from "./useAsyncAction";
import { validateCourseField } from "../validations/course.field";

export type EditCourseFormValues = {
  name: string;
  description?: string;
  isActive: boolean;
  durationHours: string; // siempre string para el input
  status?: CourseLifecycleStatus;
};

export function useEditCourseForm(
  initial: EditCourseFormValues,
  onSave: (data: CourseUpdateInput) => Promise<boolean>,
  onClose: () => void,
  externalErrors?: NormalizedErrors,
) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    reset: resetForm,
  } = useValidatedForm<EditCourseFormValues, NormalizedErrors>(
    initial,
    (field: keyof EditCourseFormValues, value: string | boolean) => {
      if (
        field === "name" ||
        field === "description" ||
        field === "durationHours"
      ) {
        return validateCourseField(field, value as string, true); // ✅ aquí pones isEdit = true
      }
      return undefined;
    },
    () => ({}),
  );

  const { loading: isSubmitting, run } = useAsyncAction();
  const [hasUserEdited, setHasUserEdited] = useState(false);

  const handleFieldChange = useCallback(
    (field: keyof EditCourseFormValues, value: string | boolean) => {
      if (
        field === "name" ||
        field === "description" ||
        field === "durationHours"
      ) {
        handleChange(field, value as string);
      } else if (field === "isActive") {
        handleChange(field, value as boolean);
      } else if (field === "status") {
        handleChange(field, value as CourseLifecycleStatus);
      }

      if (externalErrors?.[field]) setHasUserEdited(true);
    },
    [handleChange, externalErrors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const submitErrors = validateForm();
      if (Object.keys(submitErrors).length) return;

      await run(async () => {
        const payload: CourseUpdateInput = {};

        if (values.name !== initial.name) {
          payload.name = values.name.trim();
        }

        if (values.description !== initial.description) {
          payload.description =
            values.description?.trim() === "" ? "" : values.description;
        }

        if (values.isActive !== initial.isActive) {
          payload.isActive = values.isActive;
        }

        if (values.durationHours !== initial.durationHours) {
          payload.durationHours =
            values.durationHours.trim() === ""
              ? undefined
              : Number(values.durationHours);
        }

        if (values.status !== initial.status) {
          payload.status = values.status;
        }

        const ok = await onSave(payload);
        if (ok) {
          resetForm();
          setHasUserEdited(false);
          onClose();
        }
      });
    },
    [values, validateForm, run, onSave, onClose, resetForm],
  );

  const effectiveErrors = useMemo(
    () => (hasUserEdited ? errors : { ...errors, ...externalErrors }),
    [errors, externalErrors, hasUserEdited],
  );

  const isFormValid = useMemo(
    () =>
      !effectiveErrors.name?.length &&
      !effectiveErrors.description?.length &&
      !effectiveErrors.durationHours?.length &&
      !isSubmitting,
    [effectiveErrors, isSubmitting],
  );

  const reset = useCallback(() => {
    resetForm();
    setHasUserEdited(false);
  }, [resetForm]);

  return {
    // valores
    ...values,

    // estado
    isSubmitting,
    isFormValid,
    effectiveErrors,

    // handlers
    handleSubmit,
    reset,
    handleNameChange: (v: string) => handleFieldChange("name", v),
    handleNameBlur: () => handleBlur("name"),
    handleDescriptionChange: (v: string) => handleFieldChange("description", v),
    handleDescriptionBlur: () => handleBlur("description"),
    handleDurationHoursChange: (v: string) =>
      handleFieldChange("durationHours", v),
    handleDurationHoursBlur: () => handleBlur("durationHours"),
    handleStatusChange: (v: CourseLifecycleStatus) =>
      handleFieldChange("status", v),
    handleActiveChange: (v: boolean) => handleFieldChange("isActive", v),
  };
}
