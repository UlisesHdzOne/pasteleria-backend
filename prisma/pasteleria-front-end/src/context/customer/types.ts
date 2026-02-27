/* ======================================================
   1️⃣ Modelo del dominio (lo que devuelve el backend)
====================================================== */

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string; // mejor siempre string (el backend envía ISO)
  updatedAt: string;
}

/* ======================================================
   2️⃣ DTOs (lo que enviamos al backend)
====================================================== */

export interface CreateCustomerDTO {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UpdateCustomerDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

/* ======================================================
   3️⃣ Errores del backend
====================================================== */

export interface BackendError {
  code: string;
  message: string;
  field?: string;
}

/* ======================================================
   4️⃣ Resultados de operaciones
====================================================== */

export interface CreateCustomerResult {
  success: boolean;
  data?: Customer;
  error?: string;
  code?: string;
  field?: string;
}

/* ======================================================
   5️⃣ Estado del contexto
====================================================== */

export interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | null;
  loading: boolean;
  error: string | null;
  meta: CustomerMeta | null;
}

/* ======================================================
   6️⃣ Valor expuesto por el Context
====================================================== */

export interface CustomerContextValue extends CustomerState {
  createCustomer: (
    customerData: CreateCustomerDTO,
  ) => Promise<CreateCustomerResult>;

  fetchCustomers: (params?: FetchCustomersParams) => Promise<void>;
}

/* ======================================================
   7️⃣ Estado inicial
====================================================== */

// export const initialState: CustomerState = {
//   customers: [],
//   currentCustomer: null,
//   loading: false,
//   error: null,
// };
//---
//nuevos

export type FetchCustomersParams = {
  search?: string;
  page?: number;
  limit?: number;
  isActive?: boolean;
};

// Respuesta  paginada
export interface FetchCustomersResult {
  data: Customer[];
  meta: CustomerMeta;
}

// Información de paginación
export type CustomerMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};
