// src/common/config/prisma-constraints.config.ts

/**
 * Configuración centralizada de constraints de Prisma
 *
 * Agrega aquí todos los constraints de unicidad y llaves foráneas
 * para mantener el filtro limpio y mantenible.
 */

export interface ConstraintConfig {
  field: string; // Nombre del campo en la respuesta
  message: string; // Mensaje de error para el usuario
  code?: string; // Código de error máquina (opcional)
}

export interface ModelConstraintConfig {
  [constraintName: string]: ConstraintConfig;
}

// =========================
// UNIQUE CONSTRAINTS (P2002)
// =========================

export const UNIQUE_CONSTRAINTS: ModelConstraintConfig = {
  // Customer
  Customer_phone_key: {
    field: 'phone',
    message: 'El teléfono ya está registrado',
  },
  Customer_email_key: {
    field: 'email',
    message: 'El email ya está registrado',
  },

  // Future models (ejemplos)
  // Product_name_key: {
  //   field: 'name',
  //   message: 'Ya existe un producto con este nombre',
  // },
  // Product_sku_key: {
  //   field: 'sku',
  //   message: 'El SKU ya está registrado',
  // },
  // Category_slug_key: {
  //   field: 'slug',
  //   message: 'Ya existe una categoría con esta URL',
  // },
  // User_username_key: {
  //   field: 'username',
  //   message: 'El nombre de usuario ya está en uso',
  // },
};

// =========================
// FOREIGN KEY CONSTRAINTS (P2003)
// =========================

export const FOREIGN_KEYS: ModelConstraintConfig = {
  // Address
  Address_customerId_fkey: {
    field: 'customerId',
    message: 'El cliente no existe',
  },

  // Future models (ejemplos)
  // Order_customerId_fkey: {
  //   field: 'customerId',
  //   message: 'El cliente no existe',
  // },
  // Product_categoryId_fkey: {
  //   field: 'categoryId',
  //   message: 'La categoría no existe',
  // },
  // Order_productId_fkey: {
  //   field: 'productId',
  //   message: 'El producto no existe',
  // },
};

// =========================
// PATRONES DE INFERENCIA
// =========================

export const UNIQUE_PATTERNS: Array<{
  pattern: RegExp;
  getConfig: (constraint: string, modelName?: string) => ConstraintConfig;
}> = [
  {
    pattern: /email/i,
    getConfig: () => ({
      field: 'email',
      message: 'El email ya está registrado',
    }),
  },
  {
    pattern: /phone/i,
    getConfig: () => ({
      field: 'phone',
      message: 'El teléfono ya está registrado',
    }),
  },
  {
    pattern: /sku/i,
    getConfig: () => ({ field: 'sku', message: 'El SKU ya está registrado' }),
  },
  {
    pattern: /slug/i,
    getConfig: () => ({ field: 'slug', message: 'Esta URL ya está en uso' }),
  },
  {
    pattern: /name/i,
    getConfig: () => ({
      field: 'name',
      message: 'Ya existe un registro con este nombre',
    }),
  },
  {
    pattern: /username/i,
    getConfig: () => ({
      field: 'username',
      message: 'El nombre de usuario ya está en uso',
    }),
  },
];

export const FOREIGN_PATTERNS: Array<{
  pattern: RegExp;
  getConfig: (constraint: string) => ConstraintConfig;
}> = [
  {
    pattern: /customer/i,
    getConfig: () => ({ field: 'customerId', message: 'El cliente no existe' }),
  },
  {
    pattern: /address/i,
    getConfig: () => ({
      field: 'addressId',
      message: 'La dirección no existe',
    }),
  },
  {
    pattern: /product/i,
    getConfig: () => ({ field: 'productId', message: 'El producto no existe' }),
  },
  {
    pattern: /category/i,
    getConfig: () => ({
      field: 'categoryId',
      message: 'La categoría no existe',
    }),
  },
  {
    pattern: /user/i,
    getConfig: () => ({ field: 'userId', message: 'El usuario no existe' }),
  },
  {
    pattern: /order/i,
    getConfig: () => ({ field: 'orderId', message: 'La orden no existe' }),
  },
];

// =========================
// HELPERS
// =========================

export function getModelNameFromConstraint(constraint: string): string | null {
  const match = constraint.match(/^([A-Z][a-zA-Z0-9]+)_/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export function getFieldFromConstraint(constraint: string): string | null {
  const match = constraint.match(/_(.+)_(?:key|fkey)$/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}
