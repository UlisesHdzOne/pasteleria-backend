import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { BasePrismaHandler } from './base-prisma.handler';
import {
  FOREIGN_KEYS,
  FOREIGN_PATTERNS,
  ConstraintConfig,
} from '../../config/prisma-constraints.config';

const DEPENDENCY_MESSAGES: Record<string, string> = {
  address: 'No se puede eliminar porque tiene direcciones asociadas',
  order: 'No se puede eliminar porque tiene pedidos asociados',
  product: 'No se puede eliminar porque tiene productos asociados',
};

export class ForeignKeyHandler extends BasePrismaHandler {
  canHandle(code: string): boolean {
    return code === 'P2003';
  }

  handle(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
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
      );
    }

    return this.buildBadRequestResponse(
      response,
      config?.field ?? 'general',
      config?.message ?? 'El registro relacionado no existe',
    );
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
        message: `El registro relacionado no existe (${field})`,
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

    for (const [table, msg] of Object.entries(DEPENDENCY_MESSAGES)) {
      if (lowerConstraint.includes(table)) {
        return {
          hasDependencies: true,
          message: msg,
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
        message: 'No se puede eliminar porque tiene registros relacionados',
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
