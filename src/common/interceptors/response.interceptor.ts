import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StandardResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    type: 'SERVER_ERROR' | 'VALIDATION_ERROR' | 'BUSINESS_ERROR';
    code: string;
    message: string;
    field?: string;
    fields?: Record<string, string>; // Para múltiples errores
    details?: any;
  };
  meta?: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse> {
    return next.handle().pipe(
      map((response) => this.standardizeResponse(response)),
    );
  }

  private standardizeResponse(response: any): StandardResponse {
    // Si ya tiene formato estándar, retornarlo
    if (this.isStandardResponse(response)) {
      return response;
    }

    // Si es un error, el ExceptionFilter se encargará
    if (response instanceof Error) {
      throw response; // Lanzar para que lo maneje el ExceptionFilter
    }

    // Respuestas exitosas
    if (response.data !== undefined) {
      return {
        success: true,
        data: response.data,
      };
    }

    // Respuestas paginadas
    if (response.data && response.meta) {
      return {
        success: true,
        data: response.data,
        meta: response.meta,
      };
    }

    // Respuesta simple
    return {
      success: true,
      data: response,
    };
  }

  private isStandardResponse(obj: any): obj is StandardResponse {
    return (
      obj &&
      typeof obj === 'object' &&
      'success' in obj &&
      typeof obj.success === 'boolean'
    );
  }
}
