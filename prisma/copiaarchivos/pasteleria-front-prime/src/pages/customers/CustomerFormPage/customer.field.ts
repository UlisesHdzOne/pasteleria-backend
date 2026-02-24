import {
  validateFirstName,
  validateLastName,
  validatePhone,
} from "./customer.rules";

export function validateCustomerField(
  field: "firstName" | "lastName" | "phone",
  value: string,
): string[] {
  if (field === "firstName") return validateFirstName(value);
  if (field === "lastName") return validateLastName(value);
  if (field === "phone") return validatePhone(value);
  return [];
}
