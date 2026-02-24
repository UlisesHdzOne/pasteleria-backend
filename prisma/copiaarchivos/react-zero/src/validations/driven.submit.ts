import type { DrivenInput } from "../components/CreateDrivenModal";
import { validateName } from "./driven.rules";
import type { DrivenErrors } from "./driven.rules";

export function validateDrivenOnSubmit(input: DrivenInput): DrivenErrors {
  const errors: DrivenErrors = {};

  const nameErrors = validateName(input.name);
  if (nameErrors.length) errors.name = nameErrors;

  return errors;
}
