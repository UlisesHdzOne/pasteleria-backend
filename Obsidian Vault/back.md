.env
```# Database

DATABASE_URL="postgresql://postgres:password123@localhost:5434/pasteleria_db"

  

# Docker variables

POSTGRES_USER=postgres

POSTGRES_PASSWORD=password123

POSTGRES_DB=pasteleria_db

POSTGRES_PORT=5434

  

# Otras variables que puedas necesitar (App, JWT, etc)

PORT=3000

NODE_ENV=development
```

.gitignore
```
# compiled output

/dist

/node_modules

/build

  

# Logs

logs

*.log

npm-debug.log*

pnpm-debug.log*

yarn-debug.log*

yarn-error.log*

lerna-debug.log*

  

# OS

.DS_Store

  

# Tests

/coverage

/.nyc_output

  

# IDEs and editors

/.idea

.project

.classpath

.c9/

*.launch

.settings/

*.sublime-workspace

  

# Environment variables

.env

.env.local

.env.development.local

.env.test.local

.env.production.local

  

# Prisma

/generated

/prisma/migrations

  

# Temporary files

*.swp

*.swo

*~

.tmp

  

# Build files

*.tsbuildinfo

/generated/prisma
```


.prettierrc
```
{

"singleQuote": true,

"semi": true,

"trailingComma": "all"

}
```

docker-compose.yml
```
services:

db:

image: postgres:15-alpine

container_name: postgres_db_dev-pasteleria

ports:

- '${POSTGRES_PORT:-5434}:5432'

environment:

POSTGRES_USER: ${POSTGRES_USER:-postgres}

POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-password123}

POSTGRES_DB: ${POSTGRES_DB:-pasteleria_db}

env_file:

- .env

restart: unless-stopped # ← MEJOR que 'always'

volumes:

- postgres_data:/var/lib/postgresql/data # ← PERSISTENCIA

networks:

- app-network # ← RED AISLADA

healthcheck: # ← HEALTH CHECK

test: ['CMD-SHELL', 'pg_isready -U ${POSTGRES_USER:-postgres}']

interval: 10s

timeout: 5s

retries: 5

start_period: 30s

  

volumes:

postgres_data: # ← VOLUME DEFINIDO

name: pasteleria_postgres_data

  

networks:

app-network: # ← NETWORK DEFINIDO

driver: bridge

name: carwash_network
```


prisma.config.ts
```import 'dotenv/config';

import { defineConfig } from 'prisma/config';

  

export default defineConfig({

schema: 'prisma/schema.prisma',

migrations: {

path: 'prisma/migrations',

},

datasource: {

url: process.env.DATABASE_URL,

},

});
```


## Aquí tienes la implementación completa y profesional.

---

## Estructura de archivos

```
src/
├── common/
│   ├── filters/
│   │   └── prisma-exception.filter.ts
│   └── config/
│       └── prisma-constraints.config.ts
└── main.ts
```

---

## Archivo 1: `prisma-constraints.config.ts`

```typescript
// src/common/config/prisma-constraints.config.ts

/**
 * Configuración centralizada de constraints de Prisma
 * 
 * Agrega aquí todos los constraints de unicidad y llaves foráneas
 * para mantener el filtro limpio y mantenible.
 */

export interface ConstraintConfig {
  field: string;      // Nombre del campo en la respuesta
  message: string;    // Mensaje de error para el usuario
}

export interface ModelConstraintConfig {
  [constraintName: string]: ConstraintConfig;
}

// =========================
// UNIQUE CONSTRAINTS (P2002)
// =========================

export const UNIQUE_CONSTRAINTS: ModelConstraintConfig = {
  // Customer
  Customer_phone_key: {
    field: 'phone',
    message: 'El teléfono ya está registrado',
  },
  Customer_email_key: {
    field: 'email',
    message: 'El email ya está registrado',
  },

  // Future models (ejemplos)
  // Product_name_key: {
  //   field: 'name',
  //   message: 'Ya existe un producto con este nombre',
  // },
  // Product_sku_key: {
  //   field: 'sku',
  //   message: 'El SKU ya está registrado',
  // },
  // Category_slug_key: {
  //   field: 'slug',
  //   message: 'Ya existe una categoría con esta URL',
  // },
  // User_username_key: {
  //   field: 'username',
  //   message: 'El nombre de usuario ya está en uso',
  // },
};

// =========================
// FOREIGN KEY CONSTRAINTS (P2003)
// =========================

export const FOREIGN_KEYS: ModelConstraintConfig = {
  // Address
  Address_customerId_fkey: {
    field: 'customerId',
    message: 'El cliente no existe',
  },

  // Future models (ejemplos)
  // Order_customerId_fkey: {
  //   field: 'customerId',
  //   message: 'El cliente no existe',
  // },
  // Product_categoryId_fkey: {
  //   field: 'categoryId',
  //   message: 'La categoría no existe',
  // },
  // Order_productId_fkey: {
  //   field: 'productId',
  //   message: 'El producto no existe',
  // },
};

// =========================
// PATRONES DE INFERENCIA
// =========================

export const UNIQUE_PATTERNS: Array<{
  pattern: RegExp;
  getConfig: (constraint: string, modelName?: string) => ConstraintConfig;
}> = [
  {
    pattern: /email/i,
    getConfig: () => ({ field: 'email', message: 'El email ya está registrado' }),
  },
  {
    pattern: /phone/i,
    getConfig: () => ({ field: 'phone', message: 'El teléfono ya está registrado' }),
  },
  {
    pattern: /sku/i,
    getConfig: () => ({ field: 'sku', message: 'El SKU ya está registrado' }),
  },
  {
    pattern: /slug/i,
    getConfig: () => ({ field: 'slug', message: 'Esta URL ya está en uso' }),
  },
  {
    pattern: /name/i,
    getConfig: (constraint, modelName) => ({
      field: 'name',
      message: `${modelName || 'El registro'} ya existe`,
    }),
  },
  {
    pattern: /username/i,
    getConfig: () => ({ field: 'username', message: 'El nombre de usuario ya está en uso' }),
  },
];

export const FOREIGN_PATTERNS: Array<{
  pattern: RegExp;
  getConfig: (constraint: string) => ConstraintConfig;
}> = [
  {
    pattern: /customer/i,
    getConfig: () => ({ field: 'customerId', message: 'El cliente no existe' }),
  },
  {
    pattern: /address/i,
    getConfig: () => ({ field: 'addressId', message: 'La dirección no existe' }),
  },
  {
    pattern: /product/i,
    getConfig: () => ({ field: 'productId', message: 'El producto no existe' }),
  },
  {
    pattern: /category/i,
    getConfig: () => ({ field: 'categoryId', message: 'La categoría no existe' }),
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

// =========================
// HELPERS
// =========================

export function getModelNameFromConstraint(constraint: string): string | null {
  const match = constraint.match(/^([A-Z][a-zA-Z0-9]+)_/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export function getFieldFromConstraint(constraint: string): string | null {
  const match = constraint.match(/_(.+)_(?:key|fkey)$/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}
```

---

## Archivo 2: `prisma-exception.filter.ts`

```typescript
// src/common/filters/prisma-exception.filter.ts

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
    this.logger.debug(`Prisma Error: ${exception.code} - ${exception.message.substring(0, 100)}`);

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
    const modelName = meta?.modelName || getModelNameFromConstraint(constraint || '');
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

  private handleForeignKeyViolation(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ): Response {
    const meta = exception.meta as any;
    const constraint = this.extractConstraint(meta);

    // 1. Buscar en el mapa de foreign keys
    let config: ConstraintConfig | null = null;
    
    if (constraint && FOREIGN_KEYS[constraint]) {
      config = FOREIGN_KEYS[constraint];
    }

    // 2. Intentar inferir por patrón
    if (!config && constraint) {
      config = this.inferForeignKeyFromPattern(constraint);
    }

    // 3. Fallback genérico
    if (!config) {
      config = {
        field: 'general',
        message: 'El registro relacionado no existe',
      };
    }

    return this.buildValidationResponse(response, config.field, config.message);
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
    return meta?.constraint || 
           meta?.driverAdapterError?.cause?.constraint?.name || 
           null;
  }

  private inferUniqueFromPattern(constraint: string, modelName?: string): ConstraintConfig | null {
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
      return { field: 'username', message: 'El nombre de usuario ya está en uso' };
    }
    if (fields.includes('name')) {
      return { field: 'name', message: 'Este nombre ya está en uso' };
    }
    
    return null;
  }

  private inferForeignKeyFromPattern(constraint: string): ConstraintConfig | null {
    const lower = constraint.toLowerCase();
    
    for (const { pattern, getConfig } of FOREIGN_PATTERNS) {
      if (pattern.test(lower)) {
        return getConfig(constraint);
      }
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
      return { field: 'username', message: 'El nombre de usuario ya está en uso' };
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
```

---

## Archivo 3: `main.ts` (registro del filtro)

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes
  app.useGlobalPipes(new CustomValidationPipe());

  // Global filters
  app.useGlobalFilters(new PrismaExceptionFilter());

  // CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running on: ${await app.getUrl()}`);
}

void bootstrap();
```

---

## Cómo agregar un nuevo modelo (ejemplo: Product)

### Paso 1: Agregar constraints al archivo de configuración

```typescript
// prisma-constraints.config.ts

export const UNIQUE_CONSTRAINTS: ModelConstraintConfig = {
  // Existing...
  Customer_phone_key: { ... },
  Customer_email_key: { ... },

  // ✅ Nuevo: Product
  Product_name_key: {
    field: 'name',
    message: 'Ya existe un producto con este nombre',
  },
  Product_sku_key: {
    field: 'sku',
    message: 'El SKU ya está registrado',
  },
};

export const FOREIGN_KEYS: ModelConstraintConfig = {
  // Existing...
  Address_customerId_fkey: { ... },

  // ✅ Nuevo: Product
  Product_categoryId_fkey: {
    field: 'categoryId',
    message: 'La categoría no existe',
  },
};
```

### Paso 2: Nada más. El filtro ya funciona.

---

## Resumen de archivos

| Archivo | Líneas | Propósito |
|---------|--------|-----------|
| `prisma-constraints.config.ts` | ~200 | Configuración centralizada |
| `prisma-exception.filter.ts` | ~200 | Filtro que usa la configuración |
| `main.ts` | ~15 | Registro del filtro |

**Total: ~415 líneas de código limpio, mantenible y escalable.**