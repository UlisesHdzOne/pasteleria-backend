import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

type ErrorResponse = {
  statusCode?: number;
  message?: string | string[];
  errors?: Record<string, string[]>;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // 👉 HTTP exceptions (Nest)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      let errors: Record<string, string[]> = {};

      if (
        typeof response === 'object' &&
        response !== null &&
        'statusCode' in response &&
        'errors' in response
      ) {
        return res.status(status).json(response as ErrorResponse);
      }

      if (typeof response === 'string') {
        errors = { message: [response] };
      } else if (
        typeof response === 'object' &&
        response !== null &&
        'message' in response
      ) {
        const msg = (response as { message?: unknown }).message;

        if (Array.isArray(msg)) {
          errors = this.mapArrayErrors(
            msg.filter((m): m is string => typeof m === 'string'),
          );
        } else if (typeof msg === 'string') {
          errors = { message: [msg] };
        }
      }

      return res.status(status).json({
        statusCode: status,
        errors,
      });
    }

    // 👉 fallback seguro
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errors: {
        message: ['Internal server error'],
      },
    });
  }

  private mapArrayErrors(messages: string[]): Record<string, string[]> {
    return {
      message: messages,
    };
  }
}
