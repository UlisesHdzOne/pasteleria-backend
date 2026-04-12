import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import {
  PrismaErrorHandler,
  UniqueViolationHandler,
  ForeignKeyHandler,
  NotFoundHandler,
} from './handlers';

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

    this.logger.debug(
      `Prisma Error: ${exception.code} - ${exception.message.substring(0, 100)}`,
    );

    const handler = this.handlers.find((h) => h.canHandle(exception.code));

    if (handler) {
      return handler.handle(exception, response);
    }

    return this.handleUnknownError(exception, response);
  }

  private handleUnknownError(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    this.logger.error(exception.message);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error interno del servidor',
    });
  }
}
