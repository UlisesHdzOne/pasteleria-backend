import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaErrorHandler } from './prisma-error-handler.interface';

export type DriverError = {
  cause?: {
    constraint?: {
      name?: string;
      fields?: string[];
    };
  };
};

export type PrismaMeta = Prisma.PrismaClientKnownRequestError['meta'];

export abstract class BasePrismaHandler implements PrismaErrorHandler {
  abstract canHandle(code: string): boolean;
  abstract handle(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response;

  protected extractConstraint(meta: PrismaMeta | undefined): string | null {
    const driverError = (meta as { driverAdapterError?: unknown })
      ?.driverAdapterError as DriverError | undefined;

    return (
      ((meta as { constraint?: unknown })?.constraint as string | undefined) ||
      driverError?.cause?.constraint?.name ||
      null
    );
  }

  protected extractFields(meta: PrismaMeta | undefined): string[] | null {
    const driverError = (meta as { driverAdapterError?: unknown })
      ?.driverAdapterError as DriverError | undefined;

    return driverError?.cause?.constraint?.fields ?? null;
  }

  protected extractModelName(meta: PrismaMeta | undefined): string | null {
    const constraint = this.extractConstraint(meta);
    const modelName = (meta as { modelName?: unknown })?.modelName as
      | string
      | undefined;

    return modelName ?? (constraint ? this.getModelFromConstraint(constraint) : null);
  }

  private getModelFromConstraint(constraint: string): string | null {
    const match = constraint.match(/^([A-Z][a-zA-Z0-9]+)_/);
    return match?.[1] ?? null;
  }

  protected buildConflictResponse(
    response: Response,
    field: string,
    message: string,
  ): Response {
    return response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: 'Conflict',
      errors: {
        [field]: [message],
      },
    });
  }

  protected buildBadRequestResponse(
    response: Response,
    field: string,
    message: string,
  ): Response {
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation error',
      errors: {
        [field]: [message],
      },
    });
  }

  protected buildNotFoundResponse(
    response: Response,
    message: string,
  ): Response {
    return response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message,
    });
  }

  protected buildDependencyResponse(
    response: Response,
    message: string,
    dependentTable: string | null,
  ): Response {
    return response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: 'Conflict',
      errors: {
        general: [message],
      },
      dependencyInfo: {
        hasDependencies: true,
        message,
        dependentTable,
        dependentCount: null,
      },
    });
  }
}
