type NameParts = { firstName: string; lastName: string };

export function buildFullName(obj: NameParts): string {
  return [obj.firstName, obj.lastName].filter(Boolean).join(' ');
}
