import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { BasePrismaHandler } from './base-prisma.handler';
import { ErrorContext } from './prisma-error-handler.interface';

export class NotFoundHandler extends BasePrismaHandler {
  private readonly modelNames: Record<string, string> = {
    Customer: 'Cliente',
    Product: 'Producto',
    Order: 'Pedido',
    User: 'Usuario',
    Category: 'Categoría',
  };

  canHandle(code: string): boolean {
    return code === 'P2025';
  }

  handle(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
    context: ErrorContext,
  ): Response {
    const modelName = this.extractModelName(exception.meta);
    const displayName = modelName ? this.modelNames[modelName] : undefined;
    const message = displayName
      ? `${displayName} no encontrado`
      : 'Recurso no encontrado';
    const errorCode = displayName ? `${modelName?.toUpperCase()}_NOT_FOUND` : 'RESOURCE_NOT_FOUND';

    return this.buildNotFoundResponse(response, message, context, errorCode);
  }
}
