import type { CourseInput } from "../types/course/course";
import type { CourseErrors } from "./course.rules";
import { validateName, validateDescription, validateDuration } from "./course.rules";

export function validateCourseOnSubmit(
  input: CourseInput
): CourseErrors {
  const errors: CourseErrors = {};

  const nameErrors = validateName(input.name);
  if (nameErrors.length) errors.name = nameErrors;

  const descErrors = validateDescription(input.description);
  if (descErrors.length) errors.description = descErrors;

  const durErrors = validateDuration(input.durationHours);
  if (durErrors.length) errors.durationHours = durErrors;

  return errors;
}
