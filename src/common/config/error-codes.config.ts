import * as errorCodes from '../../../ERROR_CODES.json';

export function getErrorMessage(code: string): string {
  const codes = errorCodes as unknown as Record<string, { message?: string }>;
  return codes[code]?.message ?? 'Error desconocido';
}

export function getFieldMessage(field: string): string {
  const fieldMessages = (errorCodes as unknown as { FIELD_MESSAGES?: Record<string, string> }).FIELD_MESSAGES;
  return fieldMessages?.[field] ?? `${field} no válido`;
}

export function getDependencyMessage(table: string): string {
  const depMessages = (errorCodes as unknown as { DEPENDENCY_MESSAGES?: Record<string, string> }).DEPENDENCY_MESSAGES;
  return depMessages?.[table] ?? depMessages?.['general'] ?? 'No se puede eliminar porque tiene registros relacionados';
}
