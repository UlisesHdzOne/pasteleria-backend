este paso es para crear un modelo nuevo
### Paso 1: Prisma schema

En `prisma/schema.prisma` agrega este modelo User:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  role      String   @default("user") // "user" o "admin"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Luego ejecuta:

```bash
npx prisma migrate dev --name init
```

y

```bash
npx prisma generate
```

Esto crea la tabla y genera cliente Prisma.



---



cuando ya se realizo una migración de un modelo ya que esta creado y necesitamos modificar
como user que solo tiene id y email pero queremos agregar mas campo o hacer una modificación se hace lo siguiente

este es el modelo actual
```ts
model User {
id Int @id @default(autoincrement())
email String @unique
}
```
``
se agrego mas campos
```ts
model User {
id Int @id @default(autoincrement())
email String @unique
password String
name String?
role String @default("user") // "user" o "admin"
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}
```
---

Sí, debes migrar los cambios. Pasos básicos con Docker:

1. Entra al contenedor donde tienes Prisma (o tu backend):
    

```bash
docker exec -it nombre_contenedor sh
en este caso le pusimos 
docker exec -it paradox-backend sh
```

2. Dentro, ejecuta:
    

```bash
npx prisma migrate dev --name update_user_model
```

Esto genera y aplica la migración.

