# 📘 PrismaService — Documentación (Obsidian)

## 🧩 ¿Qué es PrismaService?

Es un servicio que extiende `PrismaClient` y centraliza **la conexión a la base de datos** dentro de NestJS.

Te permite:

- Controlar conexión y desconexión
    
- Manejar logs
    
- Reutilizar una única instancia en toda la app
    
- Agregar utilidades personalizadas (ej: limpiar DB en tests)
    

---

## 🎯 ¿Para qué sirve?

👉 Facilita que **cualquier módulo** pueda acceder a la base de datos usando Prisma sin repetir código.  
👉 Mantiene la conexión limpia y controlada por NestJS.  
👉 Permite agregar helpers globales (ej: limpiar base en tests, logging adicional).

---

## 📦 ¿En qué módulos lo vas a usar?

En **todos** los módulos que necesiten acceder a la base.

Ejemplos:

- `UserModule`
    
- `AuthModule`
    
- `SalaModule`
    
- `StudentModule`
    
- `CursoModule`
    
- etc.
    

Solo haces:

```ts
constructor(private prisma: PrismaService) {}
```

y ya puedes consultar la base.

---

## 🧪 ¿Para qué sirve `cleanDatabase()`?

Solo en **test E2E o unitarios**.

Te permite limpiar todas las tablas rápido:

```ts
await prisma.cleanDatabase();
```

Esto evita datos sucios entre pruebas.

No se ejecuta en producción.

---

## 🔧 ¿Qué hace PrismaService internamente?

- Conecta a la base al iniciar el módulo (`onModuleInit`)
    
- Cierra la conexión al apagar NestJS (`onModuleDestroy`)
    
- Activa logs útiles en desarrollo (`query`, `warn`, `info`, `error`)
    
- Agrega helpers personalizados (ejemplo: limpiar DB)
    

---

## 🧊 Mini ejemplo simulado de uso

### 📁 user.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  create(data) {
    return this.prisma.user.create({ data });
  }
}
```

### 📁 user.module.ts

```ts
@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
```

### Resultado:

- Tu módulo tiene acceso a Prisma sin inicializar nada.
    
- Todo usa la misma instancia.
    
- Todo queda limpio y ordenado.
    
