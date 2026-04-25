import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Prisma } from '@prisma/client';
import { PrismaExceptionFilter } from './prisma-exception.filter';
import { StandardErrorResponse, ValidationErrors, FieldError } from '../interfaces/standard-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly prismaFilter: PrismaExceptionFilter) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();
    const path = request.url;

    // Handle Prisma known errors via existing filter
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.prismaFilter.catch(exception, host);
    }

    // Handle Nest HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      const payload = typeof res === 'object' ? res : { message: res };

      // 422 (Validation) — estructura profesional con códigos de campo
      if (status === 422) {
        const rawErrors = (payload as { errors?: Record<string, string[]> }).errors ?? {};
        const formattedErrors: ValidationErrors = {};

        for (const [field, messages] of Object.entries(rawErrors)) {
          formattedErrors[field] = {
            message: messages[0] ?? 'Campo inválido',
            code: 'VALIDATION_ERROR',
          };
        }

        const body: StandardErrorResponse = {
          success: false,
          statusCode: 422,
          errorCode: 'VALIDATION_ERROR',
          message: (payload as { message?: string }).message ?? 'Error de validación',
          data: null,
          errors: Object.keys(formattedErrors).length > 0 ? formattedErrors : undefined,
          timestamp,
          path,
        };

        this.logger.debug(`HTTP Exception (422): ${JSON.stringify(body)}`);
        return response.status(422).json(body);
      }

      // Mensajes estándar en español por código HTTP
      const messages: Record<number, string> = {
        400: 'Solicitud inválida',
        401: 'No autenticado',
        403: 'Acceso denegado',
        404: 'Recurso no encontrado',
        409: 'Conflicto de datos',
        500: 'Error interno del servidor',
      };

      const message = (payload as { message?: string }).message ?? messages[status] ?? 'Error desconocido';
      const errorCode = (payload as { code?: string }).code ?? `HTTP_${status}`;

      const body: StandardErrorResponse = {
        success: false,
        statusCode: status,
        errorCode,
        message,
        data: null,
        timestamp,
        path,
      };

      // 409 puede incluir info adicional del conflicto en formato errors con códigos
      if (status === 409) {
        const p = payload as { field?: string; errors?: Record<string, string[]>; code?: string };
        if (p.errors) {
          const formattedErrors: ValidationErrors = {};
          for (const [field, msgs] of Object.entries(p.errors)) {
            formattedErrors[field] = {
              message: msgs[0] ?? message,
              code: p.code ?? 'CONFLICT',
            };
          }
          body.errors = formattedErrors;
          body.errorCode = p.code ?? errorCode;
        } else if (p.field) {
          body.errors = {
            [p.field]: {
              message,
              code: p.code ?? 'CONFLICT',
            },
          };
        }
      }

      // 404 incluye código específico
      if (status === 404) {
        body.errorCode = (payload as { code?: string }).code ?? 'RESOURCE_NOT_FOUND';
      }

      // 400 incluye código específico si existe
      if (status === 400) {
        body.errorCode = (payload as { code?: string }).code ?? 'BAD_REQUEST';
      }

      this.logger.debug(`HTTP Exception: ${status} ${JSON.stringify(body)}`);
      return response.status(status).json(body);
    }

    // Unknown errors -> 500
    this.logger.error('Unhandled exception', exception as Error);

    const body: StandardErrorResponse = {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno del servidor',
      data: null,
      timestamp,
      path,
    };

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}
