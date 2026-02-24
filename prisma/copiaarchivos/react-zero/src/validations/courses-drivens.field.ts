import type { CourseDrivenInput } from "../hook/useCourseDrivenForm";

export function validateCourseDrivenField(
  field: keyof CourseDrivenInput,
  value: number | "",
): string[] {
  if (field === "courseId") {
    if (!value) return ["Debe seleccionar un curso"];
  }

  if (field === "drivenId") {
    if (!value) return ["Debe seleccionar un driven"];
  }

  return [];
}
