import { ConflictException, BadRequestException } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

export class BusinessErrorHelper {
  static throwMultipleErrors(errors: Record<string, string>): never {
    throw new ConflictException({
      code: ErrorCode.MULTIPLE_BUSINESS_ERRORS,
      message: 'Se encontraron múltiples errores de validación',
      fields: errors,
    });
  }

  static throwFieldError(field: string, message: string, code: string): never {
    throw new ConflictException({
      code,
      message,
      field,
    });
  }

  static collectErrors(errors: Array<{ field: string; message: string; code?: string }>): Record<string, string> {
    const errorMap: Record<string, string> = {};
    
    for (const error of errors) {
      errorMap[error.field] = error.message;
    }
    
    return errorMap;
  }
}
