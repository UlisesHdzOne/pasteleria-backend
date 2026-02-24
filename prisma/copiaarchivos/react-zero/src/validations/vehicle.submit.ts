import type { VehicleInput } from "../types/vehicle";
import {
  validateName,
  validateDriven,
  type VehicleErrors,
} from "./vehicle.rules";

export function validateVehicleOnSubmit(
  input: VehicleInput,
): VehicleErrors {
  const errors: VehicleErrors = {};

  const nameErrors = validateName(input.name);
  if (nameErrors.length > 0) {
    errors.name = nameErrors;
  }

  const drivenErrors = validateDriven(input.driven);
  if (drivenErrors.length > 0) {
    errors.driven = drivenErrors;
  }

  return errors;
}
//ultima barrera antes de enviar