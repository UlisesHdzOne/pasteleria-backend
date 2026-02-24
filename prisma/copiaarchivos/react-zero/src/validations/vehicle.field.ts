import { validateName, validateDriven } from "./vehicle.rules";

export function validateVehicleField(
  field: "name" | "driven",
  value: string,
): string[] {
  if (field === "name") {
    return validateName(value);
  }

  if (field === "driven") {
    return validateDriven({ name: value });
  }

  return [];
}
// validacion por campo(onchange / onblur)
//esto es la validacion en tiempo real