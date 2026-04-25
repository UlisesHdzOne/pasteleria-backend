const ERROR_MESSAGES = {
  UNKNOWN: "Error desconocido",
  SERVER: "Error del servidor",
  UNEXPECTED: "Error inesperado",
} as const;

type BackendError = {
  message?: string;
  errors?: Record<string, { message?: string; code?: string } | null | undefined>;
};

function isBackendError(error: unknown): error is BackendError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("message" in error || "errors" in error)
  );
}

function extractFieldErrors(errors: BackendError["errors"]): string[] {
  if (!errors) return [];

  return Object.values(errors)
    .map((err) => err?.message)
    .filter((msg): msg is string => typeof msg === "string" && msg.length > 0);
}

export function mapBackendErrors(error: unknown): string[] {
  if (!error) return [ERROR_MESSAGES.UNKNOWN];

  if (typeof error === "string") return [error];

  if (error instanceof Error) return [error.message || ERROR_MESSAGES.SERVER];

  if (isBackendError(error)) {
    const fieldErrors = extractFieldErrors(error.errors);
    if (fieldErrors.length > 0) return fieldErrors;

    if (error.message) return [error.message];
  }

  return [ERROR_MESSAGES.UNEXPECTED];
}
