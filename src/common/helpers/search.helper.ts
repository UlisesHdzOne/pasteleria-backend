import { Prisma } from '@prisma/client';

export class SearchHelper {
  static normalizePhone(search: string): string {
    return search.replace(/\D/g, '');
  }

  static buildTextSearchFields(
    search: string,
    fields: string[],
    phoneField?: string,
  ): any[] {
    const conditions: any[] = [];

    // Búsqueda en campos de texto
    for (const field of fields) {
      conditions.push({
        [field]: {
          contains: search,
          mode: 'insensitive' as const,
        },
      });
    }

    // Búsqueda en campo de teléfono (si existe y contiene números)
    if (phoneField && /\d/.test(search)) {
      const normalizedPhone = this.normalizePhone(search);
      conditions.push({
        [phoneField]: { contains: normalizedPhone },
      });
    }

    return conditions;
  }

  static buildWhereClause(
    search: string | undefined,
    textFields: string[],
    phoneField?: string,
    additionalFilters?: any,
  ): any {
    if (!search?.trim()) {
      return additionalFilters || { deletedAt: null };
    }

    const cleanSearch = search.trim();
    const searchConditions = this.buildTextSearchFields(cleanSearch, textFields, phoneField);

    return {
      deletedAt: null,
      OR: searchConditions,
      ...additionalFilters,
    };
  }
}
