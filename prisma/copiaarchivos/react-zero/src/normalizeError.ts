export type NormalizedErrors = Record<string, string[] | undefined>;

const isDevelopment = window.location.hostname === "localhost";

export function normalizeError(
  err: unknown,
  statusCode?: number,
): NormalizedErrors {
  // 409 - Reglas de negocio
  if (statusCode === 409) {
    const conflict = err as { field?: string; message?: string };
    if (conflict.field && conflict.message) {
      return { [conflict.field]: [conflict.message] };
    }
  }

  // 400 - Validación (front ya valida)
  if (statusCode === 400) {
    if (isDevelopment) {
      console.warn("Back 400 inesperado:", err);
    }
    return { general: ["Error inesperado. Revisa los datos."] };
  }

  // Otros errores
  return { general: ["Error desconocido"] };
}
