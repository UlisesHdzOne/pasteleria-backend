import ERROR_CODES from '../ERROR_CODES.json';

type ApiError = {
  statusCode?: number;
  error?: string;
  message?: string;
  code?: string;
  details?: any;
  errors?: Record<string, string[]>;
};

const ERROR_MAP: Record<string, string> = {
  CUSTOMER_ALREADY_DELETED: 'El cliente ya fue eliminado previamente.',
  VALIDATION_ERROR: 'Hay errores en el formulario.',
  CUSTOMER_NOT_FOUND: 'Cliente no encontrado.',
  INTERNAL_SERVER_ERROR: 'Ocurrió un error en el servidor.',
  // Puedes extender este mapa con más valores o cargar desde ERROR_CODES.json
};

export function mapErrorToToast(err: ApiError) {
  const code = err?.code as string | undefined;

  // Prefer mapping by code, then fallback to message
  const text = (code && ERROR_MAP[code]) || err?.message || 'Ocurrió un error';

  // In dev, log details for debugging
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('API error details:', err?.details ?? err);
  }

  return {
    title: 'Error',
    message: Array.isArray(text) ? text.join(', ') : text,
  };
}

export function getErrorCodes() {
  return ERROR_CODES as Record<string, any>;
}
