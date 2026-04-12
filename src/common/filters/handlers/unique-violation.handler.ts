import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { BasePrismaHandler } from './base-prisma.handler';
import {
  UNIQUE_CONSTRAINTS,
  UNIQUE_PATTERNS,
  ConstraintConfig,
} from '../../config/prisma-constraints.config';

const FIELD_MESSAGES: Record<string, string> = {
  email: 'El email ya está registrado',
  phone: 'El teléfono ya está registrado',
};

export class UniqueViolationHandler extends BasePrismaHandler {
  canHandle(code: string): boolean {
    return code === 'P2002';
  }

  handle(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    const meta = exception.meta;
    const constraint = this.extractConstraint(meta);
    const modelName = this.extractModelName(meta);
    const fields = this.extractFields(meta);

    const config = this.resolveConfig(constraint, modelName, fields, exception.message);

    return this.buildConflictResponse(response, config.field, config.message);
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
      message: 'Ya existe un registro con estos datos',
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

    for (const [field, message] of Object.entries(FIELD_MESSAGES)) {
      if (fields.includes(field)) {
        return { field, message };
      }
    }

    return null;
  }

  private inferFromMessage(message: string): ConstraintConfig | null {
    const lower = message.toLowerCase();

    for (const [field, msg] of Object.entries(FIELD_MESSAGES)) {
      if (lower.includes(field)) {
        return { field, message: msg };
      }
    }

    return null;
  }
}
