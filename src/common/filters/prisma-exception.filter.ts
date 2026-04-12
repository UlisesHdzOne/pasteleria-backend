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
  UNIQUE_CONSTRAINTS,
  FOREIGN_KEYS,
  UNIQUE_PATTERNS,
  getModelNameFromConstraint,
  getFieldFromConstraint,
  type ConstraintConfig,
} from '../config/prisma-constraints.config';

type PrismaMeta = Prisma.PrismaClientKnownRequestError['meta'];

type DriverError = {
  cause?: {
    constraint?: {
      name?: string;
      fields?: string[];
    };
  };
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.debug(
      `Prisma Error: ${exception.code} - ${exception.message.substring(0, 100)}`,
    );

    switch (exception.code) {
      case 'P2002':
        return this.handleUniqueViolation(exception, response);
      case 'P2003':
        return this.handleForeignKeyViolation(exception, response);
      case 'P2025':
        return this.handleNotFound(response);
      default:
        return this.handleUnknownError(exception, response);
    }
  }

  // =========================
  // UNIQUE
  // =========================
  private handleUniqueViolation(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    const meta = exception.meta;
    const constraint = this.extractConstraint(meta);

    const modelName =
      ((meta as { modelName?: unknown })?.modelName as string | undefined) ??
      (constraint ? getModelNameFromConstraint(constraint) : undefined);

    const driverError = (meta as { driverAdapterError?: unknown })
      ?.driverAdapterError as DriverError | undefined;

    const fields = driverError?.cause?.constraint?.fields;

    let config: ConstraintConfig | null = null;

    if (constraint && UNIQUE_CONSTRAINTS[constraint]) {
      config = UNIQUE_CONSTRAINTS[constraint];
    }

    if (!config && constraint) {
      config = this.inferUniqueFromPattern(constraint, modelName ?? undefined);
    }

    if (!config && fields && Array.isArray(fields)) {
      config = this.inferUniqueFromFields(fields);
    }

    if (!config) {
      config = this.inferFromMessage(exception.message);
    }

    if (!config) {
      config = {
        field: 'general',
        message: 'Ya existe un registro con estos datos',
      };
    }

    return this.buildConflictResponse(response, config.field, config.message);
  }

  // =========================
  // FOREIGN KEY
  // =========================
  private handleForeignKeyViolation(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    const meta = exception.meta;
    const constraint = this.extractConstraint(meta);

    let config: ConstraintConfig | null = null;

    if (constraint && FOREIGN_KEYS[constraint]) {
      config = FOREIGN_KEYS[constraint];
    }

    if (!config && constraint) {
      config = this.inferForeignKeyFromPattern(constraint);
    }

    const dependentInfo = this.extractDependentInfo(
      constraint,
      exception.message,
    );

    let finalMessage = config?.message || 'El registro relacionado no existe';
    let finalField = config?.field || 'general';

    if (dependentInfo.hasDependencies) {
      finalMessage = dependentInfo.message;
      finalField = 'general';
    }

    const isDependencyError = dependentInfo.hasDependencies;

    const statusCode = isDependencyError
      ? HttpStatus.CONFLICT
      : HttpStatus.BAD_REQUEST;

    const messageTitle = isDependencyError ? 'Conflict' : 'Validation error';

    return response.status(statusCode).json({
      statusCode,
      message: messageTitle,
      errors: {
        [finalField]: [finalMessage],
      },
      ...(isDependencyError && {
        dependencyInfo: dependentInfo,
      }),
    });
  }

  // =========================
  // HELPERS
  // =========================
  private extractDependentInfo(
    constraint: string | null,
    errorMessage: string,
  ) {
    const lowerConstraint = constraint?.toLowerCase() || '';
    const lowerMessage = errorMessage.toLowerCase();

    const dependencyMap: Record<string, string> = {
      address: 'No se puede eliminar porque tiene direcciones asociadas',
      order: 'No se puede eliminar porque tiene pedidos asociados',
      product: 'No se puede eliminar porque tiene productos asociados',
    };

    for (const key of Object.keys(dependencyMap)) {
      if (lowerConstraint.includes(key)) {
        return {
          hasDependencies: true,
          message: dependencyMap[key],
          dependentTable: key,
          dependentCount: null,
        };
      }
    }

    if (
      lowerMessage.includes('foreign key') ||
      lowerMessage.includes('child record')
    ) {
      return {
        hasDependencies: true,
        message: 'No se puede eliminar porque tiene registros relacionados',
        dependentTable: null,
        dependentCount: null,
      };
    }

    return {
      hasDependencies: false,
      message: '',
      dependentTable: null,
      dependentCount: null,
    };
  }

  private extractConstraint(meta: PrismaMeta | undefined): string | null {
    const driverError = (meta as { driverAdapterError?: unknown })
      ?.driverAdapterError as DriverError | undefined;

    return (
      ((meta as { constraint?: unknown })?.constraint as string | undefined) ||
      driverError?.cause?.constraint?.name ||
      null
    );
  }

  private inferUniqueFromPattern(
    constraint: string,
    modelName?: string,
  ): ConstraintConfig | null {
    const lower = constraint.toLowerCase();

    for (const { pattern, getConfig } of UNIQUE_PATTERNS) {
      if (pattern.test(lower)) {
        return getConfig(constraint, modelName);
      }
    }

    return null;
  }

  private inferUniqueFromFields(fields: string[]): ConstraintConfig | null {
    if (fields.includes('email')) {
      return { field: 'email', message: 'El email ya está registrado' };
    }

    if (fields.includes('phone')) {
      return { field: 'phone', message: 'El teléfono ya está registrado' };
    }

    return null;
  }

  private inferForeignKeyFromPattern(
    constraint: string,
  ): ConstraintConfig | null {
    const field = getFieldFromConstraint(constraint);

    if (field) {
      return {
        field,
        message: `El registro relacionado no existe (${field})`,
      };
    }

    return null;
  }

  private inferFromMessage(message: string): ConstraintConfig | null {
    const lower = message.toLowerCase();

    if (lower.includes('email')) {
      return { field: 'email', message: 'El email ya está registrado' };
    }

    if (lower.includes('phone')) {
      return { field: 'phone', message: 'El teléfono ya está registrado' };
    }

    return null;
  }

  private handleNotFound(response: Response): Response {
    return response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Registro no encontrado',
    });
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

  private buildConflictResponse(
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
}
