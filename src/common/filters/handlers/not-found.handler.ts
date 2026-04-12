import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { BasePrismaHandler } from './base-prisma.handler';

export class NotFoundHandler extends BasePrismaHandler {
  canHandle(code: string): boolean {
    return code === 'P2025';
  }

  handle(
    _exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    return this.buildNotFoundResponse(response, 'Registro no encontrado');
  }
}
