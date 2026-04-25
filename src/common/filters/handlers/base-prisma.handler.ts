import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaErrorHandler, ErrorContext } from './prisma-error-handler.interface';
import { StandardErrorResponse, ValidationErrors, FieldError } from '../../interfaces/standard-response.interface';

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
    context: ErrorContext,
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
    context: ErrorContext,
    errorCode?: string,
  ): Response {
    const fieldErrors: ValidationErrors = field !== 'general'
      ? { [field]: { message, code: errorCode ?? 'CONFLICT' } }
      : { general: { message, code: errorCode ?? 'CONFLICT' } };

    const body: StandardErrorResponse = {
      success: false,
      statusCode: HttpStatus.CONFLICT,
      errorCode: errorCode ?? 'CONFLICT',
      message,
      data: null,
      errors: fieldErrors,
      timestamp: context.timestamp,
      path: context.path,
    };

    return response.status(HttpStatus.CONFLICT).json(body);
  }

  protected buildBadRequestResponse(
    response: Response,
    field: string,
    message: string,
    context: ErrorContext,
    errorCode?: string,
  ): Response {
    const fieldErrors: ValidationErrors = field !== 'general'
      ? { [field]: { message, code: errorCode ?? 'BAD_REQUEST' } }
      : { general: { message, code: errorCode ?? 'BAD_REQUEST' } };

    const body: StandardErrorResponse = {
      success: false,
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: errorCode ?? 'BAD_REQUEST',
      message,
      data: null,
      errors: fieldErrors,
      timestamp: context.timestamp,
      path: context.path,
    };

    return response.status(HttpStatus.BAD_REQUEST).json(body);
  }

  protected buildNotFoundResponse(
    response: Response,
    message: string,
    context: ErrorContext,
    errorCode?: string,
  ): Response {
    const body: StandardErrorResponse = {
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: errorCode ?? 'RESOURCE_NOT_FOUND',
      message,
      data: null,
      timestamp: context.timestamp,
      path: context.path,
    };

    return response.status(HttpStatus.NOT_FOUND).json(body);
  }

  protected buildDependencyResponse(
    response: Response,
    message: string,
    dependentTable: string | null,
    context: ErrorContext,
    errorCode?: string,
  ): Response {
    const fieldErrors: ValidationErrors = dependentTable
      ? { [dependentTable]: { message, code: errorCode ?? 'DEPENDENCY_VIOLATION' } }
      : { general: { message, code: errorCode ?? 'DEPENDENCY_VIOLATION' } };

    const body: StandardErrorResponse = {
      success: false,
      statusCode: HttpStatus.CONFLICT,
      errorCode: errorCode ?? 'DEPENDENCY_VIOLATION',
      message,
      data: null,
      errors: fieldErrors,
      timestamp: context.timestamp,
      path: context.path,
    };

    return response.status(HttpStatus.CONFLICT).json(body);
  }
}
