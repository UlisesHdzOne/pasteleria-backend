import { validateName } from "./driven.rules";

export function validateDrivenField(
  field: "name",
  value: string
): string[] {
  if (field === "name") return validateName(value);
  return [];
}
