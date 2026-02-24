export type NormalizedErrors = Record<string, string[] | undefined>;

export function normalizeError(
  err: unknown,
  statusCode?: number,
): NormalizedErrors {
  const isDevelopment = import.meta.env.DEV;

  // 409 - Conflicto (reglas de negocio)
  if (statusCode === 409) {
    if (
      typeof err === "object" &&
      err !== null &&
      "field" in err &&
      "message" in err
    ) {
      const conflict = err as { field?: string; message?: string };

      if (conflict.field && conflict.message) {
        return { [conflict.field]: [conflict.message] };
      }
    }
  }

  // 400 - Validación inesperada desde backend
  if (statusCode === 400) {
    if (isDevelopment) {
      console.warn("Back 400 inesperado:", err);
    }

    return {
      general: ["Error inesperado. Revisa los datos."],
    };
  }

  // Otros errores
  if (isDevelopment) {
    console.error("Error no manejado:", err);
  }

  return {
    general: ["Error desconocido"],
  };
}
