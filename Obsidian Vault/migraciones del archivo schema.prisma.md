```
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model User {
id Int @id @default(autoincrement())
name String
email String @unique
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}
```

en este caso se agrego el modelo User
Tu modelo `User` está bien definido y listo para migrarse.

Siguiente paso:

```bash
docker exec -it prime-back sh
npx prisma migrate dev --name init
```

Esto creará la tabla `User` en tu base de datos.


### 2. cuando agregamos un nuevo cambio ejemplo 

### 1. Agrega el modelo `User` en `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String  //nuevo campo
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Después ejecuta:

```bash
npx prisma migrate dev --name add_password_to_user
```
