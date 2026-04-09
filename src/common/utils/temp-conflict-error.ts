import { ConflictException } from '@nestjs/common';

// Temporal mientras se actualizan los módulos
export const buildConflictError = (errors: any[]): never => {
  const error = Array.isArray(errors) ? errors[0] : errors;
  throw new ConflictException({
    code: error.code,
    message: error.message,
    field: error.field,
  });
};
