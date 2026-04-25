import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { BasePrismaHandler } from './base-prisma.handler';
import { ErrorContext } from './prisma-error-handler.interface';
import {
  UNIQUE_CONSTRAINTS,
  UNIQUE_PATTERNS,
  ConstraintConfig,
} from '../../config/prisma-constraints.config';
import { getFieldMessage, getErrorMessage } from '../../config/error-codes.config';

export class UniqueViolationHandler extends BasePrismaHandler {
  canHandle(code: string): boolean {
    return code === 'P2002';
  }

  handle(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
    context: ErrorContext,
  ): Response {
    const meta = exception.meta;
    const constraint = this.extractConstraint(meta);
    const modelName = this.extractModelName(meta);
    const fields = this.extractFields(meta);

    const config = this.resolveConfig(constraint, modelName, fields, exception.message);

    const fieldKey = config.field ?? 'general';
    const message = config.message || getFieldMessage(fieldKey);
    const errorCode = config.code ?? 'UNIQUE_CONSTRAINT_VIOLATION';

    return this.buildConflictResponse(response, fieldKey, message, context, errorCode);
  }

  private resolveConfig(
    constraint: string | null,
    modelName: string | null,
    fields: string[] | null,
    message: string,
  ): ConstraintConfig {
    if (constraint && UNIQUE_CONSTRAINTS[constraint]) {
      return UNIQUE_CONSTRAINTS[constraint];
    }

    const fromPattern = this.inferFromPattern(constraint, modelName);
    if (fromPattern) return fromPattern;

    const fromFields = this.inferFromFields(fields);
    if (fromFields) return fromFields;

    const fromMessage = this.inferFromMessage(message);
    if (fromMessage) return fromMessage;

    return {
      field: 'general',
      message: getErrorMessage('UNIQUE_CONSTRAINT_VIOLATION'),
    };
  }

  private inferFromPattern(
    constraint: string | null,
    modelName: string | null,
  ): ConstraintConfig | null {
    if (!constraint) return null;
    const lower = constraint.toLowerCase();

    for (const { pattern, getConfig } of UNIQUE_PATTERNS) {
      if (pattern.test(lower)) {
        return getConfig(constraint, modelName ?? undefined);
      }
    }

    return null;
  }

  private inferFromFields(fields: string[] | null): ConstraintConfig | null {
    if (!fields) return null;

    for (const field of fields) {
      if (field) {
        return { field, message: getFieldMessage(field) };
      }
    }

    return null;
  }

  private inferFromMessage(message: string): ConstraintConfig | null {
    const lower = message.toLowerCase();
    const fields = ['email', 'phone', 'sku', 'slug', 'username', 'name'];

    for (const field of fields) {
      if (lower.includes(field)) {
        return { field, message: getFieldMessage(field) };
      }
    }

    return null;
  }
}
