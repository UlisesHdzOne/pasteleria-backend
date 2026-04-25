---

# 🐳 Dockerización 1 — Solo Base de Datos PostgreSQL

---

## 🎯 Objetivo

Levantar la base de datos PostgreSQL en un contenedor Docker, dejando el backend y Prisma ejecutándose localmente. Esto permite trabajar con una base aislada y persistente, sin tener que instalar Postgres directamente en el sistema.

---

## 🧱 Estructura

```
📁 backend/
  ├── prisma/
  │   └── schema.prisma
  ├── .env
  ├── docker-compose.yml
  └── ...
```

---

## 🧾 Paso a paso

---

### 1. Crear archivo `.env`

Este archivo contiene las variables de entorno para conectar Prisma a la base de datos en Docker.

```env
DATABASE_URL=postgresql://ulisesdb:ulises123@localhost:5434/nestdb
JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d
```

---

### 2. Crear archivo `docker-compose.yml`

Creamos el contenedor de PostgreSQL y exponemos el puerto 5434 (ya que el 5432 estaba ocupado).

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

volumes:
  pgdata:
```

---

### 3. Levantar el contenedor

```bash
docker compose up -d
```

Esto descarga la imagen de `postgres:15` y crea el contenedor llamado automáticamente.

---

### 4. Verificar que el contenedor esté corriendo

```bash
docker ps
```

Debes ver algo como:

```
CONTAINER ID   IMAGE         PORTS
...            postgres:15   5434->5432
```

---

### 5. Instalar Prisma (si aún no lo tenías)

```bash
npm install @prisma/client
npm install prisma --save-dev
```

---

### 6. Crear archivo `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

---

### 7. Ejecutar migración con Prisma

```bash
npx prisma migrate dev --name init
```

Esto crea las tablas en la base y genera el cliente Prisma en `generated/prisma`.

---

### 8. Generar cliente Prisma manualmente (opcional)

```bash
npx prisma generate
```

---

### 9. Verifica conexión y datos

Puedes conectarte al contenedor con:

```bash
docker exec -it <nombre_contenedor> psql -U ulisesdb -d nestdb
```

---

## 📌 Notas importantes

- `localhost:5434` se usa en vez de 5432 porque ya estaba ocupado.
    
- Prisma funciona desde el host, pero se conecta al contenedor a través del puerto publicado.
    
- La configuración en `.env` debe coincidir con los valores definidos en `docker-compose.yml`.
    

---

## ✅ Resultado

- Base de datos corriendo en contenedor Docker.
    
- Backend sigue en local.
    
- Prisma configurado para conectarse a la DB de Docker.
    
- Migraciones aplicadas correctamente.
    
