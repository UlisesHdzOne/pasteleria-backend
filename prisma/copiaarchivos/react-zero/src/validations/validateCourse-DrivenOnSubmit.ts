import type { CourseDrivenInput } from "../hook/useCourseDrivenForm";
import type { NormalizedErrors } from "../normalizeError";
import { validateCourseDrivenField } from "./courses-drivens.field";

export function validateCourseDrivenOnSubmit(
  input: CourseDrivenInput,
): NormalizedErrors {
  const errors: NormalizedErrors = {};

  const courseErrors = validateCourseDrivenField("courseId", input.courseId);
  if (courseErrors.length) errors.courseId = courseErrors;

  const drivenErrors = validateCourseDrivenField("drivenId", input.drivenId);
  if (drivenErrors.length) errors.drivenId = drivenErrors;

  return errors;
}
