import { Prisma } from '@prisma/client';
import { Response } from 'express';

export interface ErrorContext {
  timestamp: string;
  path: string;
}

export interface PrismaErrorHandler {
  canHandle(code: string): boolean;
  handle(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
    context: ErrorContext,
  ): Response;
}
