import { useCallback, useMemo, useState } from "react";
import type { NormalizedErrors } from "../normalizeError";
import type { CourseInput } from "../types/course/course";
import { useValidatedForm } from "./useValidatedForm";
import { useAsyncAction } from "./useAsyncAction";
import { validateCourseField } from "../validations/course.field";
import { validateCourseOnSubmit } from "../validations/course.submit";

type CourseFormValues = {
  name: string;
  description: string;
  durationHours: string;
};

export function useCourseForm(
  onSave: (course: CourseInput) => Promise<boolean>,
  onClose: () => void,
  externalErrors?: NormalizedErrors,
) {
  /////////////////
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    reset: resetForm,
  } = useValidatedForm<CourseFormValues, NormalizedErrors>(
    { name: "", description: "", durationHours: "" },
    (field, value) => validateCourseField(field as any, value),
    (values) =>
      validateCourseOnSubmit({
        name: values.name,
        //description: values.description || undefined,
        description:
        values.description ===""
        ? undefined
        :values.description,
        durationHours:
          values.durationHours === ""
            ? undefined
            : Number(values.durationHours),
      }),
  );
//////////////////////////////////////////
  const { loading: isSubmitting, run } = useAsyncAction();
  const [hasUserEdited, setHasUserEdited] = useState(false);

  const handleFieldChange = useCallback(
    (field: keyof CourseFormValues, value: string) => {
      handleChange(field, value);
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
        const payload: CourseInput = {
          name: values.name,
          description: values.description || undefined,
          durationHours:
            values.durationHours === ""
              ? undefined
              : Number(values.durationHours),
        };

        const success = await onSave(payload);
        if (success) {
          resetForm();
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
    name: values.name,
    description: values.description,
    durationHours: values.durationHours,

    // estado
    isSubmitting,
    isFormValid,
    effectiveErrors,

    // handlers
    handleSubmit,
    reset,
    handleNameChange: (v: string) => handleFieldChange("name", v),
    handleDescriptionChange: (v: string) => handleFieldChange("description", v),
    handleDurationChange: (v: string) => handleFieldChange("durationHours", v),
    handleNameBlur: () => handleBlur("name"),
    handleDescriptionBlur: () => handleBlur("description"),
    handleDurationBlur: () => handleBlur("durationHours"),
  };
}
