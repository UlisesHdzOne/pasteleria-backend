### ✅ 1. Instala Prisma Client (en prod)

instala en local no en docker
```bash
npm install @prisma/client
```

---

### ✅ 2. Crea `prisma.service.ts`

Ruta sugerida: `src/prisma/prisma.service.ts`

```ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

---

### ✅ 3. Crea `prisma.module.ts`

Ruta: `src/prisma/prisma.module.ts`

```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

### ✅ 4. Importa `PrismaModule` en `AppModule`

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

Con esto puedes **inyectar `PrismaService` en cualquier servicio**.

Perfecto, buena actitud. Te explico de forma clara y breve:

---

## 🧠 ¿Qué es `PrismaService`?

Prisma genera un **cliente de base de datos** (`PrismaClient`) que te permite hacer consultas como:

```ts
prisma.user.findMany()
```

Pero NestJS trabaja con **inyección de dependencias**. No puedes usar directamente `new PrismaClient()` en cualquier archivo sin romper la arquitectura.

Por eso creamos:

- **`PrismaService`**: una clase que hereda de `PrismaClient` y se adapta a Nest (conectando y desconectando bien).
    
- **`PrismaModule`**: un módulo que registra ese servicio para que puedas inyectarlo donde lo necesites.
    

---

## 🔧 ¿Por qué usamos `@Global()`?

Porque así no necesitas importar `PrismaModule` en cada módulo. Lo haces una vez en `AppModule` y queda disponible en todo tu proyecto.

---

## 💡 ¿Qué ventaja tiene esto?

- Usas Prisma **sin romper NestJS**.
    
- Puedes hacer servicios como:
    

```ts
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }
}
```

