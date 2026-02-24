export type CourseErrors = {
  name?: string[];
  description?: string[];
  durationHours?: string[];
};

export function validateName(value: string): string[] {
  if (!value.trim()) return ["El nombre es obligatorio"];
  if (value.length > 50) return ["Míximo 50 caracteres"];

  return [];
}

export function validateDescription(value?: string): string[] {
  if (!value) return [];
  if (value.length > 50) return ["Maximo 50 caracteres"];
  return [];
}

export function validateDuration(value?: string): string[] {
  if (!value) return [];
  const num = Number(value);
  if (isNaN(num)) return ["Debe ser un número"];
  if (num < 1) return ["Debe ser mayor a 0"];
  return [];
}

export function validateDescriptionEdit(value?: string): string[] {
  if (value === undefined || value.trim() === "") return [];
  if (value.length > 50) return ["Máximo 50 caracteres"];
  return [];
}

export function validateDurationEdit(value?: string): string[] {
  if (value === undefined || value.trim() === "") return [];
  const num = Number(value);
  if (isNaN(num)) return ["Debe ser un número"];
  if (num < 1) return ["Debe ser mayor a 0"];
  return [];
}

// 1️⃣ Mantén las reglas puras (NO UX)
// 👉 esto casi no cambia
// paso 1
