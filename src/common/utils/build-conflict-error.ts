import { ConflictException } from '@nestjs/common';
import { ValidationError } from '../types/validation-error.type';

export const buildConflictError = (errors: ValidationError[]): never => {
  throw new ConflictException({
    code: 'VALIDATION_ERRORS',
    message: 'Errores de validación',
    errors,
  });
};
