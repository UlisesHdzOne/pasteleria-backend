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
  FOREIGN_PATTERNS,
  getModelNameFromConstraint,
  getFieldFromConstraint,
  type ConstraintConfig,
} from '../config/prisma-constraints.config';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Log para debugging (opcional, comentar en producción)
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
  // HANDLERS
  // =========================

  private handleUniqueViolation(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    const meta = exception.meta as any;
    const constraint = this.extractConstraint(meta);
    const modelName =
      meta?.modelName || getModelNameFromConstraint(constraint || '');
    const fields = meta?.driverAdapterError?.cause?.constraint?.fields;

    // 1. Buscar en el mapa de constraints
    let config: ConstraintConfig | null = null;

    if (constraint && UNIQUE_CONSTRAINTS[constraint]) {
      config = UNIQUE_CONSTRAINTS[constraint];
    }

    // 2. Intentar inferir por patrón de nombre
    if (!config && constraint) {
      config = this.inferUniqueFromPattern(constraint, modelName);
    }

    // 3. Intentar inferir por campos
    if (!config && fields && Array.isArray(fields) && fields.length > 0) {
      config = this.inferUniqueFromFields(fields);
    }

    // 4. Intentar inferir del mensaje
    if (!config) {
      config = this.inferFromMessage(exception.message);
    }

    // 5. Fallback genérico
    if (!config) {
      config = {
        field: 'general',
        message: 'Ya existe un registro con estos datos',
      };
    }

    return this.buildConflictResponse(response, config.field, config.message);
  }

  // private handleForeignKeyViolation(
  //   exception: Prisma.PrismaClientKnownRequestError,
  //   response: Response,
  // ): Response {
  //   const meta = exception.meta as any;
  //   const constraint = this.extractConstraint(meta);

  //   // 1. Buscar en el mapa de foreign keys
  //   let config: ConstraintConfig | null = null;

  //   if (constraint && FOREIGN_KEYS[constraint]) {
  //     config = FOREIGN_KEYS[constraint];
  //   }

  //   // 2. Intentar inferir por patrón
  //   if (!config && constraint) {
  //     config = this.inferForeignKeyFromPattern(constraint);
  //   }

  //   // 3. Fallback genérico
  //   if (!config) {
  //     config = {
  //       field: 'general',
  //       message: 'El registro relacionado no existe',
  //     };
  //   }

  //   return this.buildValidationResponse(response, config.field, config.message);
  // }

  // prisma-exception.filter.ts - handleForeignKeyViolation completo

  private handleForeignKeyViolation(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    const meta = exception.meta as any;
    const constraint = this.extractConstraint(meta);
    const modelName =
      meta?.modelName || getModelNameFromConstraint(constraint || '');

    // 1. Buscar en el mapa de foreign keys
    let config: ConstraintConfig | null = null;

    if (constraint && FOREIGN_KEYS[constraint]) {
      config = FOREIGN_KEYS[constraint];
    }

    // 2. Intentar inferir por patrón
    if (!config && constraint) {
      config = this.inferForeignKeyFromPattern(constraint);
    }

    // 3. Intentar extraer información más específica para DELETE con dependencias
    const dependentInfo = this.extractDependentInfo(
      constraint,
      exception.message,
      modelName,
    );

    // 4. Mensaje específico para dependencias (cuando se intenta eliminar algo con relaciones)
    let finalMessage = config?.message || 'El registro relacionado no existe';
    let finalField = config?.field || 'general';

    if (dependentInfo.hasDependencies) {
      finalMessage = dependentInfo.message;
      finalField = 'general'; // Los errores de dependencia son generales, no de un campo específico
    }

    // 5. Determinar el status code apropiado
    // Para DELETE con dependencias -> 409 Conflict es más apropiado que 400
    const isDependencyError = dependentInfo.hasDependencies;
    const statusCode = isDependencyError
      ? HttpStatus.CONFLICT
      : HttpStatus.BAD_REQUEST;
    const messageTitle = isDependencyError ? 'Conflict' : 'Validation error';

    // Log para debugging
    if (isDependencyError) {
      this.logger.debug(`Dependency error: ${dependentInfo.message}`);
    }

    return response.status(statusCode).json({
      statusCode: statusCode,
      message: messageTitle,
      errors: {
        [finalField]: [finalMessage],
      },
      // Opcional: incluir metadata para el frontend
      ...(isDependencyError && {
        dependencyInfo: {
          hasDependencies: true,
          dependentTable: dependentInfo.dependentTable,
          dependentCount: dependentInfo.dependentCount,
        },
      }),
    });
  }

  // =========================
  // MÉTODO AUXILIAR PARA EXTRAER INFORMACIÓN DE DEPENDENCIAS
  // =========================

  private extractDependentInfo(
    constraint: string | null,
    errorMessage: string,
    modelName: string | null,
  ): {
    hasDependencies: boolean;
    message: string;
    dependentTable: string | null;
    dependentCount: number | null;
  } {
    const lowerConstraint = constraint?.toLowerCase() || '';
    const lowerMessage = errorMessage.toLowerCase();

    // Mapeo de tablas dependientes a mensajes amigables
    const dependencyMap: Record<string, { message: string; table: string }> = {
      address: {
        message: 'No se puede eliminar porque tiene direcciones asociadas',
        table: 'direcciones',
      },
      order: {
        message: 'No se puede eliminar porque tiene pedidos asociados',
        table: 'pedidos',
      },
      product: {
        message: 'No se puede eliminar porque tiene productos asociados',
        table: 'productos',
      },
      category: {
        message: 'No se puede eliminar porque tiene categorías asociadas',
        table: 'categorías',
      },
      user: {
        message: 'No se puede eliminar porque tiene usuarios asociados',
        table: 'usuarios',
      },
      review: {
        message: 'No se puede eliminar porque tiene reseñas asociadas',
        table: 'reseñas',
      },
      payment: {
        message: 'No se puede eliminar porque tiene pagos asociados',
        table: 'pagos',
      },
      invoice: {
        message: 'No se puede eliminar porque tiene facturas asociadas',
        table: 'facturas',
      },
    };

    // Buscar por constraint name
    for (const [key, value] of Object.entries(dependencyMap)) {
      if (lowerConstraint.includes(key)) {
        return {
          hasDependencies: true,
          message: value.message,
          dependentTable: value.table,
          dependentCount: null,
        };
      }
    }

    // Buscar por mensaje de error de Prisma
    if (
      lowerMessage.includes('foreign key constraint') ||
      lowerMessage.includes('child record')
    ) {
      // Intentar extraer el nombre de la tabla dependiente del mensaje
      let dependentTable = null;
      let message = 'No se puede eliminar porque tiene registros relacionados';

      if (lowerMessage.includes('address')) {
        dependentTable = 'direcciones';
        message = 'No se puede eliminar porque tiene direcciones asociadas';
      } else if (lowerMessage.includes('order')) {
        dependentTable = 'pedidos';
        message = 'No se puede eliminar porque tiene pedidos asociados';
      } else if (lowerMessage.includes('product')) {
        dependentTable = 'productos';
        message = 'No se puede eliminar porque tiene productos asociados';
      }

      // Intentar extraer el conteo de dependencias si está disponible
      let dependentCount = null;
      const countMatch = errorMessage.match(/\((\d+)\)/);
      if (countMatch) {
        dependentCount = parseInt(countMatch[1], 10);
      }

      return {
        hasDependencies: true,
        message,
        dependentTable,
        dependentCount,
      };
    }

    return {
      hasDependencies: false,
      message: '',
      dependentTable: null,
      dependentCount: null,
    };
  }

  private handleNotFound(response: Response): Response {
    return response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Registro no encontrado',
      error: 'Not Found',
    });
  }

  private handleUnknownError(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    this.logger.error(`Unhandled Prisma error: ${exception.code}`);
    this.logger.error(exception.message);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error interno del servidor',
      error: 'Internal Server Error',
    });
  }

  // =========================
  // INFERENCIA
  // =========================

  private extractConstraint(meta: any): string | null {
    return (
      meta?.constraint ||
      meta?.driverAdapterError?.cause?.constraint?.name ||
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
    if (fields.includes('sku')) {
      return { field: 'sku', message: 'El SKU ya está registrado' };
    }
    if (fields.includes('slug')) {
      return { field: 'slug', message: 'Esta URL ya está en uso' };
    }
    if (fields.includes('username')) {
      return {
        field: 'username',
        message: 'El nombre de usuario ya está en uso',
      };
    }
    if (fields.includes('name')) {
      return { field: 'name', message: 'Este nombre ya está en uso' };
    }

    return null;
  }

  private inferForeignKeyFromPattern(
    constraint: string,
  ): ConstraintConfig | null {
    const lower = constraint.toLowerCase();

    // Mapeo de constraints a configuraciones
    const inferenceMap: Array<{
      pattern: RegExp;
      getConfig: () => ConstraintConfig;
      isDependency?: boolean;
    }> = [
      {
        pattern: /customer/i,
        getConfig: () => ({
          field: 'customerId',
          message: 'El cliente no existe',
        }),
      },
      {
        pattern: /address/i,
        getConfig: () => ({
          field: 'addressId',
          message: 'La dirección no existe',
        }),
      },
      {
        pattern: /product/i,
        getConfig: () => ({
          field: 'productId',
          message: 'El producto no existe',
        }),
      },
      {
        pattern: /category/i,
        getConfig: () => ({
          field: 'categoryId',
          message: 'La categoría no existe',
        }),
      },
      {
        pattern: /user/i,
        getConfig: () => ({ field: 'userId', message: 'El usuario no existe' }),
      },
      {
        pattern: /order/i,
        getConfig: () => ({ field: 'orderId', message: 'La orden no existe' }),
      },
    ];

    for (const { pattern, getConfig } of inferenceMap) {
      if (pattern.test(lower)) {
        return getConfig();
      }
    }

    // Si no hay patrón específico, intentar extraer el campo del constraint
    const field = getFieldFromConstraint(constraint);
    if (field) {
      return {
        field: field,
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
    if (lower.includes('sku')) {
      return { field: 'sku', message: 'El SKU ya está registrado' };
    }
    if (lower.includes('slug')) {
      return { field: 'slug', message: 'Esta URL ya está en uso' };
    }
    if (lower.includes('username')) {
      return {
        field: 'username',
        message: 'El nombre de usuario ya está en uso',
      };
    }

    return null;
  }

  // =========================
  // RESPONSE BUILDERS
  // =========================

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

  private buildValidationResponse(
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
}
