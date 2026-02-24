import { useCallback, useMemo } from "react";
import { useAsyncAction } from "./useAsyncAction";
import type { NormalizedErrors } from "../normalizeError";
import { useValidatedForm } from "./useValidatedForm";
import { validateCourseDrivenField } from "../validations/courses-drivens.field";
import { validateCourseDrivenOnSubmit } from "../validations/validateCourse-DrivenOnSubmit";

export type CourseDrivenInput = {
  courseId: number | "";
  drivenId: number | "";
};

export function useCourseDrivenForm(
  onSave: (
    input: CourseDrivenInput,
  ) => Promise<{ success: boolean; message?: string }>,
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
  } = useValidatedForm<CourseDrivenInput, NormalizedErrors>(
    { courseId: "", drivenId: "" },
    validateCourseDrivenField,
    validateCourseDrivenOnSubmit,
  );

  const { loading: isSubmitting, run } = useAsyncAction();

  const handleFieldChange = useCallback(
    (field: keyof CourseDrivenInput, value: number | "") => {
      handleChange(field, value);
    },
    [handleChange],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const submitErrors = validateForm();
      if (Object.keys(submitErrors).length) return;

      await run(async () => {
        const result = await onSave({ ...values });

        if (result.success) {
          resetForm();
          onClose();
        }
      });
    },
    [values, validateForm, run, onSave, onClose, resetForm],
  );

  const effectiveErrors = useMemo(
    () => ({ ...errors, ...externalErrors }),
    [errors, externalErrors],
  );

  const isFormValid = useMemo(
    () =>
      !!values.courseId &&
      !!values.drivenId &&
      !effectiveErrors.courseId?.length &&
      !effectiveErrors.drivenId?.length &&
      !isSubmitting,
    [values, effectiveErrors, isSubmitting],
  );

  const reset = useCallback(() => {
    resetForm();
  }, [resetForm]);

  return {
    values,
    errors: effectiveErrors,
    isFormValid,
    isSubmitting,
    handleSubmit,
    reset,
    handleCourseChange: (v: number | "") => handleFieldChange("courseId", v),
    handleDrivenChange: (v: number | "") => handleFieldChange("drivenId", v),
    handleCourseBlur: () => handleBlur("courseId"),
    handleDrivenBlur: () => handleBlur("drivenId"),
  };
}
