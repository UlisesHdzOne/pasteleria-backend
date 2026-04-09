import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { StandardResponse } from '../interceptors/response.interceptor';
import { ErrorCode } from '../enums/error-code.enum';
import { ValidationMessageHelper } from '../utils/validation-message.helper';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const standardError = this.formatException(exception);
    
    response.status(this.getStatusCode(exception)).json({
      success: false,
      error: standardError,
    });
  }

  private formatException(exception: unknown): StandardResponse['error'] {
    // Errores de negocio personalizados (ConflictException, NotFoundException)
    if (exception instanceof ConflictException || exception instanceof NotFoundException) {
      const exceptionResponse = exception.getResponse();
      
      if (this.isCustomException(exceptionResponse)) {
        const errorResponse: StandardResponse['error'] = {
          type: 'BUSINESS_ERROR',
          code: exceptionResponse.code,
          message: exceptionResponse.message,
        };

        // Soporte para múltiples errores
        if (exceptionResponse.field) {
          errorResponse.field = exceptionResponse.field;
        }

        if (exceptionResponse.fields) {
          errorResponse.fields = exceptionResponse.fields;
        }

        return errorResponse;
      }
    }

    // Errores de validación de DTOs
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      
      if (this.isValidationErrorResponse(exceptionResponse)) {
        // Extraer errores por campo
        const fieldErrors: Record<string, string[]> = {};

        for (const message of exceptionResponse.message) {
          const parsed = ValidationMessageHelper.parseFieldAndMessage(message);
          if (parsed) {
            fieldErrors[parsed.field] ??= [];
            fieldErrors[parsed.field].push(parsed.message);
          }
        }

        // Convertir a formato de fields para consistencia
        const fields: Record<string, string> = {};
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          fields[field] = messages.join(', ');
        });

        return {
          type: 'VALIDATION_ERROR',
          code: 'VALIDATION_FAILED',
          message: 'Error de validación',
          fields, // Usar fields para consistencia con errores de negocio
          details: exceptionResponse, // Mantener detalles para debugging
        };
      }

      const message = typeof exceptionResponse === 'string' 
        ? exceptionResponse 
        : (exceptionResponse && typeof exceptionResponse === 'object' && 'message' in exceptionResponse 
            ? (exceptionResponse as any).message 
            : 'Solicitud inválida');

      return {
        type: 'VALIDATION_ERROR',
        code: 'BAD_REQUEST',
        message,
      };
    }

    // Errores HTTP estándar
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      return {
        type: 'SERVER_ERROR',
        code: `HTTP_${status}`,
        message: typeof response === 'string' ? response : 'Error del servidor',
      };
    }

    // Errores inesperados
    return {
      type: 'SERVER_ERROR',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? exception : undefined,
    };
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return 500;
  }

  private isCustomException(obj: any): obj is { code: string; message: string; field?: string; fields?: Record<string, string> } {
    return (
      obj &&
      typeof obj === 'object' &&
      'code' in obj &&
      'message' in obj &&
      Object.values(ErrorCode).includes(obj.code)
    );
  }

  private isValidationErrorResponse(response: any): response is { message: string[] } {
    return (
      response &&
      typeof response === 'object' &&
      'message' in response &&
      Array.isArray(response.message)
    );
  }
}
