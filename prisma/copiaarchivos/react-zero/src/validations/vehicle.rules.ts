import type { VehicleInput } from "../types/vehicle";

export type VehicleErrors = {
  name?: string[];
  driven?: string[];
};

export function validateName(name?: string): string[] {
  if (name === undefined) return [];

  const value = name.trim();
  if (!value) return ["El nombre es obligatorio"];
  if (value.length < 5) return ["Mínimo 5 caracteres"];

  return [];
}

export function validateDriven(driven?: VehicleInput["driven"]): string[] {
  if (!driven || driven.name === undefined) return [];

  const value = driven.name.trim();
  if (value === "") return [];

  const errors: string[] = [];

  if (value.length < 3) {
    errors.push("Mínimo 3 caracteres");
  }

  if (/^\d+$/.test(value)) {
    errors.push("No puede contener solo números");
  }

  if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/.test(value)) {
    errors.push("No se permiten caracteres especiales");
  }

  if (!/^[a-zA-ZÁÉÍÓÚáéíóú]/.test(value)) {
    errors.push("Debe empezar con una letra");
  }

  return errors;
}


// 1️⃣ Mantén las reglas puras (NO UX)
// 👉 esto casi no cambia