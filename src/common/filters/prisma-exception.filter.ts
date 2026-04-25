import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import {
  PrismaErrorHandler,
  UniqueViolationHandler,
  ForeignKeyHandler,
  NotFoundHandler,
} from './handlers';
import { StandardErrorResponse } from '../interfaces/standard-response.interface';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);
  private readonly handlers: PrismaErrorHandler[];

  constructor() {
    this.handlers = [
      new UniqueViolationHandler(),
      new ForeignKeyHandler(),
      new NotFoundHandler(),
    ];
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();
    const path = request.url;

    this.logger.debug(
      `Prisma Error: ${exception.code} - ${exception.message.substring(0, 100)}`,
    );

    const handler = this.handlers.find((h) => h.canHandle(exception.code));

    if (handler) {
      return handler.handle(exception, response, { timestamp, path });
    }

    return this.handleUnknownError(exception, response, timestamp, path);
  }

  private handleUnknownError(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
    timestamp: string,
    path: string,
  ): Response {
    this.logger.error(exception.message);

    const body: StandardErrorResponse = {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: `PRISMA_${exception.code}`,
      message: 'Error interno del servidor',
      data: null,
      timestamp,
      path,
    };

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}
