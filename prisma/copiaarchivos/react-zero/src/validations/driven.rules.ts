export type DrivenErrors = {
  name?: string[];
};

export function validateName(value: string): string[] {
  if (!value.trim()) return ["El nombre es obligatorio"];
  if (value.length > 50) return ["Máximo 50 caracteres"];
  return [];
}
