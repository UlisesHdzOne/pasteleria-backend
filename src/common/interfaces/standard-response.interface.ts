export interface FieldError {
  message: string;
  code?: string;
}

export interface ValidationErrors {
  [field: string]: FieldError;
}

export interface StandardErrorResponse {
  success: false;
  statusCode: number;
  errorCode?: string;
  message: string;
  data: null;
  errors?: ValidationErrors;
  timestamp: string;
  path: string;
}

export interface StandardSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
  timestamp: string;
  path: string;
}

export type StandardResponse<T> = StandardSuccessResponse<T> | StandardErrorResponse;
