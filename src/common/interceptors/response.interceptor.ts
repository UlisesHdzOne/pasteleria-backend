import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { StandardSuccessResponse } from '../interfaces/standard-response.interface';

interface StandardResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
  timestamp?: string;
  path?: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse<unknown>> {
    const request = context.switchToHttp().getRequest<Request>();
    const timestamp = new Date().toISOString();
    const path = request.url;

    return next.handle().pipe(
      map((data) => {
        // Si ya tiene la estructura estandarizada completa, devolverlo
        if (data && typeof data === 'object' && 'success' in data && 'timestamp' in data) {
          return data as StandardResponse<unknown>;
        }

        // Si es respuesta paginada { data, meta }
        if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
          return {
            success: true,
            message: 'Listado obtenido correctamente',
            data: (data as { data: unknown }).data ?? null,
            meta: (data as { meta: Record<string, unknown> }).meta,
            timestamp,
            path,
          };
        }

        // Respuesta simple exitosa
        return {
          success: true,
          message: 'Proceso completado correctamente',
          data: data ?? null,
          timestamp,
          path,
        };
      }),
    );
  }
}
