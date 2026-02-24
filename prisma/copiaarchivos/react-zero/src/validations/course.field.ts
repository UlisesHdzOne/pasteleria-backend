import {
  validateDescription,
  validateDescriptionEdit,
  validateDuration,
  validateDurationEdit,
  validateName,
} from "./course.rules";

export function validateCourseField(
  field: "name" | "description" | "durationHours",
  value: string,
  isEdit = false,
): string[] {
  if (field === "name") return validateName(value);
  if (field === "description")
    return isEdit ? validateDescriptionEdit(value) : validateDescription(value);
  if (field === "durationHours")
    return isEdit ? validateDurationEdit(value) : validateDuration(value);
  return [];
}

// validacion por campo(onchange / onblur)
//esto es la validacion en tiempo real
// paso 2
