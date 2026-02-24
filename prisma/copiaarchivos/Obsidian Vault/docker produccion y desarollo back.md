Claro, aquí tienes una guía detallada paso a paso para contenerizar un backend NestJS con PostgreSQL usando Docker y Prisma, separando claramente **entorno de desarrollo** y **producción**.

---

# 🐳 Contenerización Backend NestJS + PostgreSQL con Prisma

---

## 🎯 Objetivo

- Correr backend (NestJS) y base de datos (PostgreSQL) en contenedores.
    
- Usar Prisma como ORM.
    
- Separar claramente configuración para **desarrollo** y **producción**.
    

---

## 📁 Estructura del proyecto

```
back-end-atomo/
├── backend/
│   ├── src/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── .env
```

---

## 🔧 .env (compartido)

Archivo en `backend/.env`:

```env
DATABASE_URL=postgresql://ulisesdb:ulises123@db:5432/nestdb
JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d
```

---

## 🔨 Entorno de Desarrollo

### 1. `Dockerfile.dev`

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY prisma ./prisma

RUN npm install

# Instala Prisma CLI de forma global opcional
# RUN npm install -g prisma

EXPOSE 3000

CMD npx prisma generate && npx prisma migrate dev --name init && npm run start:dev
```

### 2. `docker-compose.dev.yml`

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: ulisesdb
      POSTGRES_PASSWORD: ulises123
      POSTGRES_DB: nestdb
    ports:
      - "5434:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: backend_dev
    ports:
      - "3000:3000"
    depends_on:
      - db
    volumes:
      - ./backend:/app
    env_file:
      - ./backend/.env

volumes:
  pgdata:
```

### 3. Comandos para desarrollo

```bash
docker compose -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.yml up --build -d
```

Para entrar al contenedor y ejecutar comandos manuales:

```bash
docker compose -f docker-compose.dev.yml exec backend sh
```

Una vez que ejecutas:

```bash
docker compose -f docker-compose.dev.yml exec backend sh
```

Estás **dentro del contenedor** del backend. Desde ahí puedes hacer varias cosas útiles:

---

### 📦 1. Ejecutar migraciones Prisma

```bash
npx prisma migrate dev --name init
```

O para futuras migraciones:

```bash
npx prisma migrate dev --name nombre_migracion
```

---

### 🧬 2. Regenerar Prisma Client

```bash
npx prisma generate
```

---

### 📂 3. Navegar y revisar archivos

```bash
ls
cd src/
```

---

### 🛠️ 4. Instalar paquetes adicionales (temporal)

```bash
npm install libreria
```

> Pero **esto no se guarda** fuera del contenedor si no montaste volumen o reconstruiste la imagen.

---

### 🧪 5. Probar scripts de Nest

```bash
npm run build
npm run start
```

---

### 🔚 6. Salir del contenedor

```bash
exit
```

---


---

## 🚀 Entorno de Producción

### 1. `Dockerfile.prod`

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY prisma ./prisma
COPY . .

RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE 3000

CMD npm run start:prod
```

> ⚠️ **No ejecutar `migrate dev` automáticamente en producción.**  
> En producción, se deben aplicar las migraciones con `npx prisma migrate deploy`.

### 2. `docker-compose.prod.yml`

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: ulisesdb
      POSTGRES_PASSWORD: ulises123
      POSTGRES_DB: nestdb
    ports:
      - "5432:5432"  # No necesitas exponerlo en internet, puede quedarse solo interno
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    container_name: backend_prod
    ports:
      - "3000:3000"
    depends_on:
      - db
    env_file:
      - ./backend/.env
    # ❌ No montar código en producción
    # volumes:
    #   - ./backend:/app

volumes:
  pgdata:
```

### 3. Comandos para producción

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Para aplicar migraciones:

```bash
docker compose -f docker-compose.prod.yml exec backend sh
npx prisma migrate deploy
```

---

## 🔁 Migraciones manuales (en ambos entornos)

1. Modifica `prisma/schema.prisma` (nuevo modelo o campo).
    
2. Crea la migración:
    

```bash
npx prisma migrate dev --name create-model
```

3. Para producción, ejecuta:
    

```bash
npx prisma migrate deploy
```

---

## ✅ Resultado esperado

|Entorno|Backend corre en|DB corre en|Migraciones|Código montado|Modo de ejecución|
|---|---|---|---|---|---|
|Desarrollo|Contenedor|Contenedor|Automáticas|✅|`start:dev`|
|Producción|Contenedor|Contenedor|Manual (`deploy`)|❌|`start:prod`|


----
Si creas una nueva tabla en `schema.prisma`, haz lo siguiente paso a paso:

---

### ✅ 1. Edita `prisma/schema.prisma`

Agrega el modelo, por ejemplo:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

---

### 🧱 2. Entra al contenedor

```bash
docker compose -f docker-compose.dev.yml exec backend sh
```

---

### 🧪 3. Ejecuta la migración dentro del contenedor

```bash
npx prisma migrate dev --name create-user-table
```

> Esto creará la tabla en la base de datos y actualizará el cliente Prisma.

---

### 🧬 4. (Opcional) Verifica que se generó el cliente

```bash
npx prisma generate
```

---

### 🚪 5. Sal del contenedor

```bash
exit
```

---

Para actualizar tu esquema anterior al nuevo, sigue estos pasos:

---

### ✅ 1. Cambia el `enum Role` por un modelo:

```prisma
// ❌ Borra este enum
// enum Role {
//   USER
//   ADMIN
// }

// ✅ Agrega este modelo
model Role {
  id        String  @id @default(uuid())
  name      String  @unique
  users     User[]
  createdAt DateTime @default(now())
}
```

---

### ✅ 2. Modifica `User`:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  roleId    String
  role      Role     @relation(fields: [roleId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

### ✅ 3. Ejecuta migración

```bash
npx prisma migrate dev --name update-role-model
```

---

¿Quieres que inicialicemos los roles (`USER`, `ADMIN`) automáticamente en la base con un seeder?