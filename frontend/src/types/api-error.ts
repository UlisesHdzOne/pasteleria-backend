export interface ApiError {
  status?: number;
  statusCode: number;
  errorCode: string;
  success: false;
  message: string;
  data: unknown;
  errors: Record<string, { message: string; code?: string }> | null;
  timestamp?: string;
  path?: string;
}