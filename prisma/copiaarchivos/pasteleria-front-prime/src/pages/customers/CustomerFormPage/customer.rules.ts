import { InputSanitizer } from "./helpers/inputSanitizer.helper";

export type CustomerErrors = {
  firstName?: string[];
  lastName?: string[];
  phone?: string[];
};

export function validateFirstName(value: string): string[] {
  return InputSanitizer.validate(value, "text");
}

export function validateLastName(value: string): string[] {
  return InputSanitizer.validate(value, "text");
}

export function validatePhone(value: string): string[] {
  return InputSanitizer.validate(value, "phone");
}
