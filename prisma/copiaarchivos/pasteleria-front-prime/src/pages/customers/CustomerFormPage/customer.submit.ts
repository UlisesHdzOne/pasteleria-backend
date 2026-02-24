import type { CreateCustomerDTO } from "../../../context/customer/types";
import {
  validateFirstName,
  validateLastName,
  validatePhone,
  type CustomerErrors,
} from "./customer.rules";

export function validateCustomerSubmit(
  values: CreateCustomerDTO,
): CustomerErrors {
  const errors: CustomerErrors = {};

  const firstNameErrors = validateFirstName(values.firstName);
  if (firstNameErrors.length) errors.firstName = firstNameErrors;

  const lastNameErrors = validateLastName(values.lastName);
  if (lastNameErrors.length) errors.lastName = lastNameErrors;

  const phoneErrors = validatePhone(values.phone);
  if (phoneErrors.length) errors.phone = phoneErrors;

  return errors;
}
