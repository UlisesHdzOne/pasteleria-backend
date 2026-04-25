import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { BasePrismaHandler } from './base-prisma.handler';
import { ErrorContext } from './prisma-error-handler.interface';
import {
  FOREIGN_KEYS,
  FOREIGN_PATTERNS,
  ConstraintConfig,
} from '../../config/prisma-constraints.config';
import { getDependencyMessage, getFieldMessage, getErrorMessage } from '../../config/error-codes.config';

export class ForeignKeyHandler extends BasePrismaHandler {
  canHandle(code: string): boolean {
    return code === 'P2003';
  }

  handle(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
    context: ErrorContext,
  ): Response {
    const meta = exception.meta;
    const constraint = this.extractConstraint(meta);

    const config = this.resolveConfig(constraint);
    const dependency = this.extractDependencyInfo(constraint, exception.message);

    if (dependency.hasDependencies) {
      return this.buildDependencyResponse(
        response,
        dependency.message,
        dependency.dependentTable,
        context,
        'DEPENDENCY_VIOLATION',
      );
    }

    // If related record doesn't exist, treat as conflict (DB/business rule)
    const field = config?.field ?? null;
    const msg = config?.message ?? getErrorMessage('FOREIGN_KEY_VIOLATION');
    const errorCode = config?.code ?? 'FOREIGN_KEY_VIOLATION';

    return this.buildConflictResponse(response, field ?? 'general', msg, context, errorCode);
  }

  private resolveConfig(constraint: string | null): ConstraintConfig | null {
    if (!constraint) return null;

    if (FOREIGN_KEYS[constraint]) {
      return FOREIGN_KEYS[constraint];
    }

    return this.inferFromPattern(constraint);
  }

  private inferFromPattern(constraint: string): ConstraintConfig | null {
    const lower = constraint.toLowerCase();
    const match = constraint.match(/_(.+)_(?:fkey)$/);
    const field = match?.[1];

    for (const { pattern, getConfig } of FOREIGN_PATTERNS) {
      if (pattern.test(lower)) {
        return getConfig(constraint);
      }
    }

    if (field) {
      return {
        field,
        message: getFieldMessage(field),
      };
    }

    return null;
  }

  private extractDependencyInfo(
    constraint: string | null,
    message: string,
  ): {
    hasDependencies: boolean;
    message: string;
    dependentTable: string | null;
  } {
    const lowerConstraint = constraint?.toLowerCase() ?? '';
    const lowerMessage = message.toLowerCase();

    const tables = ['address', 'order', 'product'];
    for (const table of tables) {
      if (lowerConstraint.includes(table)) {
        return {
          hasDependencies: true,
          message: getDependencyMessage(table),
          dependentTable: table,
        };
      }
    }

    if (
      lowerMessage.includes('foreign key') ||
      lowerMessage.includes('child record')
    ) {
      return {
        hasDependencies: true,
        message: getDependencyMessage('general'),
        dependentTable: null,
      };
    }

    return {
      hasDependencies: false,
      message: '',
      dependentTable: null,
    };
  }
}
