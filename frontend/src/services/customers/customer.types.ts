// ─── Domain (modelo real de la app) ─────────────────────────

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// ─── Requests (lo que envías al backend) ────────────────────

export interface CustomerCreateRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  avatar?: string;
}

export interface CustomerUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  avatar?: string;
}