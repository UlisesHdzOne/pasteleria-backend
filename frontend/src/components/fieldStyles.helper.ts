export type FieldStatus = "idle" | "valid" | "error";

export type FieldValidationState = {
  value: string;
  isDirty: boolean;
  isValid: boolean;
  hasError: boolean;
  touched: boolean;
  status: FieldStatus;
  errorMessage: string | null;
  wasSanitized: boolean;
};

export interface FieldStyles {
  container: string;
  label: string;
  input: string;
  error: string;
  iconType: "spinner" | "check" | "alert" | null;
  helperText?: string;
}

const baseInputStyles =
  "w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm";

const stateStyles: Record<FieldStatus, string> = {
  idle: "border-border/70 focus:ring-ring focus:border-ring",
  valid: "border-green-500 focus:ring-green-500 focus:border-green-500",
  error:
    "border-destructive focus:ring-destructive focus:border-destructive pr-10 bg-red-50",
};

/**
 * Obtiene los estilos CSS según el estado del campo
 */
export const getFieldStyles = (
  state: Pick<
    FieldValidationState,
    "status" | "hasError" | "isValid" | "touched" | "errorMessage" | "wasSanitized"
  >,
): FieldStyles => {
  const { status, hasError, isValid, touched, errorMessage, wasSanitized } = state;
  const disabledStyles = false
    ? " bg-muted text-muted-foreground cursor-not-allowed opacity-60"
    : "";

  // Helper text: mostrar hint de sanitización solo si no hay error
  const helperText =
    wasSanitized && !hasError
      ? "Se ajustó el formato automáticamente"
      : errorMessage;

  return {
    container: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-foreground",
    input: `${baseInputStyles} ${stateStyles[status]}${disabledStyles}`,
    error: errorMessage || "Error de validación",
    iconType: hasError
      ? "alert"
      : isValid && touched
        ? "check"
        : null,
    helperText,
  };
};
